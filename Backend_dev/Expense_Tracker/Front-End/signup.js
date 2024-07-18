function handleSignUp(e)
{
    e.preventDefault();
    const email=document.getElementById('email').value;
    const phone=document.getElementById('phone').value;
    const password=document.getElementById('password').value;

    //console.log(email+phone+password);
    const user={
        email:email,
        phone:phone,
        password:password
    }
    
    axios.post('http://localhost:5000/signup',user)
    .then(r=>{
       // console.log(r.data);
        const p=document.getElementById('p');
        p.innerText=r.data.msg;
    })
    .catch(e=>{
        const p=document.getElementById('p');
      //  console.log(e.data);
        p.innerText=e.data.msg;
    })
}

