function handleSubmit(event)
{
    event.preventDefault();
    
    const expenseId = event.target.expenseId.value;
    const expenseAmount=event.target.expenseAmount.value;
    const Description=event.target.Description.value;
    const type=event.target.type.value;

    const expense={
      expenseId:expenseId,
      expenseAmount:expenseAmount,
  Description:Description,
  type:type,
  }

if(expenseId)
{
  axios.put(`http://localhost:5000/expenseroute/${expenseId}`,expense)


}
else
{

  console.log(expense);

  axios.post('http://localhost:5000/expenseroute',expense)
  .then(r=>{
    id=r.data.id;
    console.log(expenseAmount+"-"+Description+"-"+type+"-"+id);
addExpense(expenseAmount,Description,type,id)
  })
  .catch(e=>console.log(e))
}
clearForm();
}

function addExpense(expenseAmount,Description,type,id)
{
  const newTr = document.createElement('tr');
    newTr.id = id;
    newTr.innerHTML = `
        <td>${expenseAmount}</td>
        <td>${Description}</td>
        <td>${type}</td>
        <td><button onclick="handleDelete(${id})">Delete</button></td>
        <td><button onclick="handleEdit('${expenseAmount}', '${Description}', '${type}', ${id})">Edit</button></td>
    `;
    const ui = document.getElementById('ui');
    ui.appendChild(newTr);

}


window.addEventListener('DOMContentLoaded',()=>{
  axios.get('http://localhost:5000/expenseroute')
  .then(r=>{
    console.log(r.data);
for( i=0;i<r.data.length;i++)
{
  const {expenseAmount,Description,type,id}=r.data[i];
  addExpense(expenseAmount,Description,type,id)
}
  })
  .catch(e=>console.log(e))
})

function handleDelete(id)
{
  console.log(id);
axios.delete(`http://localhost:5000/expenseroute/${id}`)
.then(r=>{
  console.log(r);
})
.catch(e=>console.log(e))
}

function handleEdit(expenseAmount,Description,type,id)
{

  const fexpenseAmount = document.getElementById('expenseAmount');
  const fDescription = document.getElementById('Description');
  const ftype = document.getElementById('type');
  const fexpenseId = document.getElementById('expenseId');

  fexpenseAmount.value = expenseAmount;
  fDescription.value = Description;
  ftype.value = type;
  fexpenseId.value = id;
}
function clearForm()
{
  document.getElementById('myForm').reset();
  document.getElementById('expenseId').value = '';

}