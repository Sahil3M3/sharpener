window.addEventListener('DOMContentLoaded',()=>{

    console.log('in dom loader');
   axios.get('http://localhost:5000/user')
   .then(r=>{
    for(let i=0;i<r.data.length;i++)
    {
        const {userName,phone,email,id}=r.data[i];
    //console.log(r.data[i].userName);
onDisplay(userName,email,phone,id);
    }
   })
   .catch()


})

function handleFormSubmit(event)
{
    event.preventDefault();

    const userName=event.target.userName.value;
    const email=event.target.email.value;
    const phone=event.target.phone.value;

const user={
    userName:userName,email:email,phone:phone
}
    console.log(user);

  axios.post('http://localhost:5000/user',user)
  .then((r)=>{
    const id=r.data.id;
    console.log(id);
  })
  .catch(e=>console.log(e))
  

}

function onDisplay(userName,email,phone,id)
{
    console.log(userName+"-"+email+"-"+phone+"-"+id);
const ui=document.getElementById('ui');
ui.innerHTML+=`<li id=${id}>${userName}-${email}-${phone}</li> <br> <button onclick="handleEdit(${id},'${userName}', '${email}', '${phone}')"> Edit</button>
<button onclick="handleDelete(${id},event)"> Delete</button>`

}

function handleDelete(id,e)
{

    console.log(id);
    axios.delete(`http://localhost:5000/user/${id}`)
    .then(r=>console.log(r)) 
    .catch(e=>console.log(e))
}

function handleEdit(userName,email,phone,id)
{
    document.getElementById('userId').value = id;
    document.getElementById('userName').value = userName;
    document.getElementById('email').value = email;
    document.getElementById('phone').value = phone;
}