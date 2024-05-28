const form=document.querySelector('form');
const fruits=document.querySelector('.fruits');


form.addEventListener('submit',(e)=>{
    e.preventDefault();
    const fruitToAdd=document.getElementById('fruit-to-add');

    const newLi=document.createElement('li');
    newLi.innerHTML=fruitToAdd.value+'<button class="delete-btn">x</button><button class="edit-btn">Edit</button>'
newLi.className='fruit';
    fruits.appendChild(newLi);

})

fruits.addEventListener('click',(e)=>{
    if(e.target.classList.contains('delete-btn'))
    {
        const fruitToDel=e.target.parentElement;
      fruits.removeChild(fruitToDel);
    }
})