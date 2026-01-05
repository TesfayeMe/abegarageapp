const conn = require('../config/db.config.js');
const fs = require('fs');

const install = async () => {
const sqlFilePath = __dirname + '/sql/initial-queries.sql';
console.log(sqlFilePath);
let quiries = [];
let finalMessage = {};
let templine = '';
const lines = await fs.readFileSync(sqlFilePath, 'utf-8').split('\n');
const executedQueries =  await new Promise((resolve, reject) => {
    lines.forEach((line) => {
        if(line.trim().startsWith('--') || line.trim() === '') {
            return;
        }
        templine += line;
        if(line.trim().endsWith(';')) {
            const sqlQuery = templine.trim();
            quiries.push(sqlQuery);
            templine = '';
        }
    });
    resolve('Queries are added to the list');
});


for(let i = 0; i < quiries.length; i++) {
    try {
        const result  =  await  conn.query(quiries[i]);
        console.log('Table created');
    } catch (error) {
        console.log('Error occurred while creating table: ', error);
        finalMessage.message = "Not able to create all tables";
        break;
    }
}
if(!finalMessage.message) {
    finalMessage.status = 200;
    finalMessage.message = "All tables created successfully";
}
else {
    finalMessage.status = 500;
}
return finalMessage;

}

module.exports = { install };