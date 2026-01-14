//import api_url from vite env  
const api_url = import.meta.env.VITE_API_URL;
const login = async (formData) => {
    console.log(formData);
    // Here you would typically make an API call to your backend server for authentication
    const response = await fetch(`${api_url}/login`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
    });
    const data = await response.json();
    console.log(data);
    return data;
}
const LoginServices = {
    login
}
export default LoginServices