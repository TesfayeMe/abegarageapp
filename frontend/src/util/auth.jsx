//functions to read the data from user's local storage
const getAuth = async() => {
    const employee = await JSON.parse(localStorage.getItem("employee"));
    // console.log(employee);
    if(employee && employee.employee_token)
        {
            // console.log(employee.employee_token);
            const decodedToken = decodeTokenPayload(employee.employee_token);
employee.employee_role = decodedToken.employee_role;
        employee.employee_id = decodedToken.employee_id;
        employee.employee_name = decodedToken.employee_first_name;
        // console.log(employee);
        return employee;
        }
        else
    return null;      
}
export default getAuth;

 const decodeTokenPayload = (token)=>{
        const base64Url = token.split('.')[1];
        const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
        const jsonPayload = decodeURIComponent(
            atob(base64)
            .split('')
            .map((c) => `%${`00${c.charCodeAt(0).toString(16)}`.slice(-2)}`)
            .join(''));
        return JSON.parse(jsonPayload);
    }