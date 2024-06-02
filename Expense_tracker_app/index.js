function handleSubmit(event)
{
    event.preventDefault();
    
    const expenseAmount=event.target.expenseAmount.value;
    const Description=event.target.Description.value;
    const type=event.target.type.value;

    const newTr=document.createElement('tr');
    newTr.innerHTML=`    <tr>
        
    <td>${expenseAmount}</td>
    <td>${Description}</td>
    <td>${type}</td>
  </tr>`;

  const ui=document.getElementById('ui');
  ui.appendChild(newTr);

const obj={
    expenseAmount:expenseAmount,
Description:Description,
type:type,

}
localStorage.setItem("expense",JSON.stringify(obj));
  console.log(obj);

}