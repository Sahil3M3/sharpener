const { error } = require("console");

function handleLogin(event)
{
    event.preventDefault();

    const email=document.getElementById('email').value;
    const password=document.getElementById('password').value;

    const user={
        email:email,
        password:password,
    }
    axios.post('http://localhost:5000/login',user)
    .then(r=>{
        console.log(r.data.msg);
       
        const div=document.getElementById('mydiv');
        div.innerText=r.data.msg;
        alert(r.data.msg);
    })
    .catch(error=>{
       
        if (error.response) {
          
            const div = document.getElementById('mydiv');
            if (error.response.status === 404) {
                console.log(error.response.data.msg);
                div.innerText = error.response.data.msg; 
            } else if (error.response.status === 401) {
                console.log(error.response.data.msg);
                div.innerText = error.response.data.msg; 
            } else {
                console.log(error.response.data.msg);
                div.innerText = 'An error occurred';
            }
        } else if (error.request) {
       
            console.log(error.request);
            const div = document.getElementById('mydiv');
            div.innerText = 'No response received from server';
        } else {

            console.log('Error', error.message);
            const div = document.getElementById('mydiv');
            div.innerText = 'An error occurred: ' + error.message;
        }

    });

}
