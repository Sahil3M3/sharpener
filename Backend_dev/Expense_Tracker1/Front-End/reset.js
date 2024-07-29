

function handleReset(e){
    e.preventDefault();
  
const email=document.getElementById("email").value;

    axios.post('http://localhost:5000/password/forgotpassword',  {email:email})
    .then(r=>{
window.location.href="http://127.0.0.1:5500/Front-End/login.html?"
    })
    .catch(e=>{
        document.getElementById("mydiv").innerHTML=`<h5>${e.response.data.message}</h5>`;
    });

   
}