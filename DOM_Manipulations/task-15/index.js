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
const button=document.createElement("button");

const button1=document.createElement("button");


button1.setAttribute('id','button1')
button1.setAttribute('onclick','handleOnClickEdit(event)');
button1.type='button';
button1.textContent="Edit";

button.setAttribute('id','button')
button.setAttribute('onclick','handleOnClick(event)');
button.type='button';
button.textContent="Delete";

  newli.innerHTML='<p>'+user+' - '+email+' - '+phone    + '</p>';
  newli.appendChild(button);
  newli.appendChild(button1)
  ul.appendChild(newli);
  console.log(JSON.stringify(obj));
  localStorage.setItem(email,JSON.stringify(obj));
  event.target.username.value='';
event.target.email.value='';
event.target.phone.value='';

  }

  function handleOnClick(event)
  {
    event.preventDefault();
  
    const  s1=event.target.parentElement.children[0].textContent.split('-')[1];
localStorage.removeItem(s1);
    console.log(event.target.parentElement.remove());
  }

  function handleOnClickEdit(event)
  {
    const  s1=event.target.parentElement.children[0].textContent.split('-')[1];
    console.log(s1);
  }


//module.exports = handleFormSubmit;