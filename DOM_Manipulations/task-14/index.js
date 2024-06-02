function handleFormSubmit(event)
{
event.preventDefault();

const user=event.target.username.value;
const email=event.target.email.value;
const phone=event.target.phone.value;

let obj={

email:email,
phone:phone,
  username:user
}
const newli=document.createElement("li");
const ul=document.getElementById("list");
newli.innerHTML='<p>'+user+' - '+email+' - '+phone    + '</p>'
ul.appendChild(newli);
console.log(JSON.stringify(obj));
localStorage.setItem(email,JSON.stringify(obj));

}

module.exports = handleFormSubmit;