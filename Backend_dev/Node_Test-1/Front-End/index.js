function handleSubmit(e)
{
    e.preventDefault();

    const id=e.target.id.value;
    const productName=e.target.productName.value;
    const description=e.target.description.value;
    const price=e.target.price.value;
    const quantity=e.target.quantity.value;
    
    const product={
      productName:productName,
      description:description,
      price:price,
      quantity:quantity
    }

if(id)
{
updateRow(id,productName,description,price,quantity);
}

else{
  
  axios.post("http://localhost:5000/",product)
  .then(r=>{
  console.log(r.data.id);
  window.location.reload();
  
  })
  .catch(e=>console.log(e))
}

}

function addRow(productName,description,price,quantity,id)
{

  let table=document.getElementById('body');
  const newtr = `<tr id="row-${id}">    
  <td>${productName}</td>
  <td>${description}</td>
  <td>${price}</td>
  <td>${quantity}</td>
  <td><button type="button" onclick="decrementQuantity(${id}, '${productName}', '${description}', ${price}, ${quantity})">Buy One</button></td>
  <td><button onclick="editRow(${id}, '${productName}', '${description}', ${price}, ${quantity})">Edit</button></td>
  <td><button onclick="deleteRow(${id})">Delete</button></td>
</tr>`;

            table.innerHTML+=newtr;

}

window.addEventListener('DOMContentLoaded',()=>{
axios.get("http://localhost:5000/")
.then(r=>{

  for(let i=0;i<r.data.length;i++)
    {
      const {productName,description,price,quantity,id }=r.data[i];
       addRow(productName,description,price,quantity,id);
    }

})
.catch(e=>console.log(e))
    
})

function deleteRow(id)
{
  console.log(id);

axios.delete(`http://localhost:5000/${id}`)
.then(r=>{
  console.log(r)
  window.location.reload();
  
})
  .catch(e=>console.log(e))

}

function editRow(id,productName,description,price,quantity)
{
document.getElementById('id').value=id;
document.getElementById('productName').value=productName;
document.getElementById('description').value=description
document.getElementById('price').value=price
document.getElementById('quantity').value=quantity
  
}

function updateRow(id,productName,description,price,quantity)
{
  const product={
    productName:productName,
    description:description,
    price:price,
    quantity:quantity
  }
  axios.put(`http://localhost:5000/${id}`,product)
  .then(r=>{console.log(r)
    window.location.reload();
  }
)
  .catch(e=>console.log(e))

}

function decrementQuantity(id,productName,description,price,quantity)
{
  console.log(id);

  updateRow(id,productName,description,price,(quantity-1));
}