// Write the code as shown in the video below:

const fruits=document.querySelector('.fruits');
fruits.style.backgroundColor='grey';
fruits.style.padding='30px';
fruits.style.margin='30px';
fruits.style.width='50%';
fruits.style.borderRadius='5px';
fruits.style.listStyleType='none';

document.querySelector('h2').style.color='brown';

const fruitList=document.querySelectorAll(".fruit");

fruitList.forEach((e)=>{
e.style.backgroundColor='white';
e.style.padding='10px';
e.style.margin='10px';
e.style.borderRadius='5px';
})

const oddfruitList=document.querySelectorAll(".fruit:nth-child(even)");

oddfruitList.forEach((e)=>
{
e.style.backgroundColor='brown';
  e.style.color='white';
})
// Write answer to the questions asked below:
