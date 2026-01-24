const api_url = import.meta.env.VITE_APP_API_URL;
const login = async (formData) => {
    // console.log(formData);
  const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
    };
    const response = await fetch(`${api_url}/api/employee/login`, requestOptions);
    // console.log(response);
  return response;

  
}
const logOut = ()=>
{
  localStorage.removeItem('employee');
  localStorage.removeItem('logLvel')
}
const LoginServices = {login, logOut};
export default LoginServices