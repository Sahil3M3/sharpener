



function handleFormSubmit(event){
    event.preventDefault();
    const user=event.target.username.value;
    const email=event.target.email.value;
    const phone=event.target.phone.value;
    
let obj={
    username:user,
    email:email,
    phone:phone
}

console.log(obj);
localStorage.setItem('User Details',JSON.stringify(obj))
    
}
