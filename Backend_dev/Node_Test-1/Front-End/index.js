function handleSubmit(e)
{
    e.preventDefault();

    const productName=e.target.productName.value;
    const description=e.target.description.value;
    const price=e.target.price.value;
    const quantity=e.target.quantity.value;

  const product={
    productName:productName,
    description:description,
    price:price,
    quantity
  }
  axios.post("http://localhost:5000/",product);
}


window.addEventListener('DOMContentLoaded',()=>{

axios.get("http://localhost:5000/")
    
})