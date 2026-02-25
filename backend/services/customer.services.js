const conn = require('../config/db.config');
const bcrypt = require('bcrypt');
const createCustomer = async (customerData) => {
    // console.log('customerData in service:', customerData);
    //hash the customer email and customer phone by bcrypt
    const saltRounds = 10;
    const customer_hash = await bcrypt.hash(customerData.customer_email + customerData.customer_phone, saltRounds);
    //dcrypt the hash to get the original email and phone number
    const decryptedHash = await bcrypt.compare(customerData.customer_email + customerData.customer_phone, customer_hash);
    console.log('Decrypted hash:', decryptedHash);
    //how to decode the hash to get the original email and phone number
    //decode the hash to get the original email and phone number


    let Inserted_customer_id = 0;

    try {
        const sql = 'INSERT INTO customer_identifier (customer_email, customer_phone_number, customer_hash) VALUES (?, ?, ?)';
        const result = await conn.query(
            sql,
            [customerData.customer_email, customerData.customer_phone, customer_hash]
        );
        // console.log('Result from first insert:', result[0].affectedRows);
        if (!result[0].affectedRows) {
            return null;
        }
        else {
            Inserted_customer_id = result[0].insertId;
            const id = 29
            const sql2 = 'INSERT INTO customer_info (customer_id, customer_first_name, customer_last_name) VALUES (?, ?, ?)';
            const result2 = await conn.query(
                sql2,
                [Inserted_customer_id, customerData.customer_first_name, customerData.customer_last_name]
            );
            if (!result2[0].affectedRows) {
                // console.error('Failed to create customer info after creating customer identifier');
                return null;



            }
            else {
                // console.log('Customer created successfully with affectedRows:', result2[0].affectedRows);
                return result2[0].affectedRows;
            }
        }
    }
    catch (error) {
        //    console.error('Error creating customer:', error);
        // const customer_idr = result[0].insertId;
        // console.log(Inserted_customer_id);
        const deleteSql = 'DELETE FROM customer_identifier WHERE customer_id = ?';
        const deleteResult = await conn.query(deleteSql, [Inserted_customer_id]);
        if (!deleteResult[0].affectedRows) {
            // console.error('Failed to delete customer identifier after customer creation failure');
        }
        else {
            // console.log(`customer registration with id ${Inserted_customer_id} was not successfully registered and was deleted back from the database`);
            return null;
        }
        // throw new Error('Failed to create customer');
        return null;
    }
}

const allCustomers = async () => {
    const sqlCustomers = `select * from customer_identifier cid 
                          INNER JOIN customer_info cin ON  cid.customer_id = cin.customer_id`
    const [customers] = await conn.query(sqlCustomers);
    // console.log(customers)
    return customers.length > 0 ? customers : null
}
const getCustomerById = async (customerid) => {
    const getCustSql = `select * from customer_identifier cid 
                          INNER JOIN customer_info cin ON  cid.customer_id = cin.customer_id where cid.customer_id = ?`;
    const [selectedCust] = await conn.query(getCustSql, [customerid]);
    // console.log(selectedCust)
    return selectedCust.length > 0 ? selectedCust[0] : null;
}

const editCustomer = async (custinfo) => {
    const { fistname, lastname, phonenumber, custstatus, customerid } = custinfo;
    const sqlupdate = `update  customer_identifier cid
                       INNER JOIN customer_info cin ON cid.customer_id=cin.customer_id
                        set 
                        cid.customer_phone_number =?, 
                        cin.customer_first_name =?,
                        cin.customer_last_name =?,
                        cin.active_customer_status =?
                        where cid.customer_id = ?`;
    const editedCust = await conn.query(sqlupdate, [phonenumber, fistname, lastname, custstatus, customerid]);
    // console.log(editedCust)
    return editedCust.affectedRows > 0 ? editedCust.affectedRows : null


}

const deleteCustomer = async (customerid) => {
    const sqldeletecin = `delete from customer_info where customer_id = ?`;
    const deletedCustInfo = await conn.query(sqldeletecin, [customerid]);
    if(deletedCustInfo[0].affectedRows === 0)
    {
        return null;
    }
    else if(deletedCustInfo[0].affectedRows > 0)
    {
        const sqldeletecid = `delete from customer_identifier where customer_id = ?`;
        const deletedCustId = await conn.query(sqldeletecid, [customerid]);
        if(!deletedCustId[0].affectedRows)        {
            return null;
        }
        else if(deletedCustId[0].affectedRows > 0)
        {
            return deletedCustInfo[0].affectedRows;
        }
    }
}

const addServiceOrder = async (serviceData) => {
    const { 
        employee_id, customer_id, vehicle_id, active_order, 
        order_total_price, additional_request, active_additional_request, 
        service_ids 
    } = serviceData;
    try {
        // 1. Start a Transaction
        await conn.query('START TRANSACTION');

        // 2. Insert into orders
        const sqlOrder = 'INSERT INTO orders (employee_id, customer_id, vehicle_id, active_order) VALUES (?,?,?,?)';
        const [orderResult] = await conn.query(sqlOrder, [employee_id, customer_id, vehicle_id, active_order]);
        const orderId = orderResult.insertId;

        // 3. Insert into order_info
        const sqlInfo = 'INSERT INTO order_info (order_id, order_total_price, additional_request, active_additional_request) VALUES (?,?,?,?)';
        const [orderInfoResult] = await conn.query(sqlInfo, [orderId, order_total_price, additional_request, active_additional_request]);
        const orderInfoId = orderInfoResult.insertId

        // 4. Insert into order_services (BULK INSERT - No loop needed!)
        if (service_ids && service_ids.length > 0) {
            const sqlServices = 'INSERT INTO order_services (order_id, service_id, order_info_id) VALUES ?';
            // Transform [1, 2, 3] into [[orderId, 1], [orderId, 2], [orderId, 3]]
            const serviceValues = service_ids.map(s_id => [orderId, s_id, orderInfoId]);
            await conn.query(sqlServices, [serviceValues]);
        }

        // 5. Insert into order_status
        const sqlStatus = 'INSERT INTO order_status (order_id) VALUES (?)';
        await conn.query(sqlStatus, [orderId]);

        // 6. If everything worked, COMMIT the changes
        await conn.query('COMMIT');
        
        return { orderId, ...serviceData };

    } catch (error) {
        // 7. If ANY step fails, ROLLBACK everything automatically
        await conn.query('ROLLBACK');
        console.error("Transaction failed, rolled back:", error);
        return null;
    }
};


module.exports = {
    createCustomer,
    allCustomers,
    getCustomerById,
    editCustomer,
    deleteCustomer,
    addServiceOrder
}