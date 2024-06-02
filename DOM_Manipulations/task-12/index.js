const form=document.querySelector('form');

form.addEventListener('submit',(e)=>{
    e.preventDefault();
    const userName=document.getElementById('username').value;
    const email=document.getElementById('email').value;
    const phone=document.getElementById('phone').value;
localStorage.setItem('Username',userName);
localStorage.setItem('Email',email);
localStorage.setItem('Phone',phone);

})


const form=document.querySelector('form');

function handleFormSubmit(event)
{
    event.preventDefault();
  
    const userName=document.getElementById('username').value;
    const email=document.getElementById('email').value;
    const phone=document.getElementById('phone').value;
localStorage.setItem('Username',userName);
localStorage.setItem('Email',email);
localStorage.setItem('Phone',phone);
}

