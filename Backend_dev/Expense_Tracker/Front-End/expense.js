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
  axios.put(`http://localhost:5000/expense/${expenseId}`,expense)
  .then(r=>{
    window.location.reload();
  })
  .catch(e=>console.log(e))
}
else
{
  const token=localStorage.getItem("jwt")
  axios.post('http://localhost:5000/expense',expense,{headers:{"Authorization":token}})
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

  const token=localStorage.getItem("jwt")

  axios.get("http://localhost:5000/premium/check",{headers:{"Authorization":token}})
  .then(r=>{
   
    fetchData();

  }).catch(e=>{
    console.log(e.response);
  })



})

function fetchData()
{
  const token=localStorage.getItem("jwt")
  axios.get('http://localhost:5000/expense',{headers:{"Authorization":token}})
  .then(r=>{

      document.getElementById('addbtn').style.display = 'unset';
      document.getElementById('purchase').style.display='unset';
      document.getElementById('rzp-button').style.display = 'none';
      document.getElementById('leaderboard').style.display = 'unset';
for( i=0;i<r.data.length;i++)
{
  const {expenseAmount,Description,type,id}=r.data[i];
  addExpense(expenseAmount,Description,type,id)
}   
  })
  .catch(e=>console.log(e))

}


function handleDelete(id)
{
  console.log(id);
axios.delete(`http://localhost:5000/expense/${id}`)
.then(r=>{
  console.log(r);
})
.catch(e=>console.log(e))
window.location.reload();
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


function handlePurchase()
{

  const token=localStorage.getItem('jwt');
  if (!token) {
    alert('You need to be logged in to make a purchase');
    return;
}
axios.get('http://localhost:5000/premium/premiummembership',{headers:{Authorization:token}})
.then(r=>{

  const orderid = r.data.order.id;
        const key_id = r.data.key_id;

        var options = {
          "key": key_id,
          "order_id": orderid,
          "handler": function(response) {
            const payment = {
              msg:"sucessfull",
              paymentId: response.razorpay_payment_id,
              orderId: response.razorpay_order_id
            };
      
            axios.post('http://localhost:5000/premium/premiummembership', payment, { headers: { Authorization: token } })
            .then(res => {
              alert("Payment successful!");
              window.location.reload();
            })
            .catch(err => {
              console.error(err);

              payment.msg='failed'
              axios.post('http://localhost:5000/premium/premiummembership', payment, { headers: { Authorization: token } })
              .then(res => {
                alert("Payment was cancelled. Please try again.");
              })
              .catch(err => {
                console.error(err);
                alert("Payment verification failed, please contact support.");
              });

             
            });
          },
          "modal": {
            "ondismiss": function(response) {
              const payment = {
                msg:"cancel",
             
                orderId: orderid
              };
              axios.post('http://localhost:5000/premium/premiummembership', payment, { headers: { Authorization: token } })
              .then(res => {
                alert("Payment was cancelled. Please try again.");
              })
              .catch(err => {
                console.error(err);
                alert("Payment verification failed, please contact support.");
              });
             
              // Additional logic for payment cancellation if needed
            }
          }
        };

var rzp1=new Razorpay(options);
rzp1.open();

})
.catch(e=>console.log(e));


}

function showLeaderboard(event)
{
  event.preventDefault();
 
  const token=localStorage.getItem("jwt")
 
  axios.get('http://localhost:5000/expense/board',{headers:{"Authorization":token}})
  .then(r=>{

      document.getElementById('leaderboard').style.display = 'unset';

for( i=0;i<r.data.length;i++)
{
  const {total_cost,name}=r.data[i];
  addBoard(name,total_cost)
} 


  })
  .catch(e=>console.log(e))

}


function addBoard(name,expenseAmount)
{
  const newTr = document.createElement('tr');
 
    newTr.innerHTML = `
    <td>${name}</td>
        <td>${expenseAmount}</td>
 
    `;
    const ui = document.getElementById('ui1');
    ui.appendChild(newTr);

}