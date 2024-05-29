// Add input element inside form, before button, to take fruit description


const input=document.createElement('input');
input.setAttribute('type','text');
input.setAttribute('id','description');
input.setAttribute('value','Here is some descr');
input.setAttribute('style', 'font-style: italic;');


const form1=document.getElementsByTagName('form');
form1[0].insertBefore(input,form1[0].children[2]);



const form=document.querySelector('form');

form.addEventListener('submit',(e)=>{
    e.preventDefault();
    const input1=document.getElementById('fruit-to-add').value;

  
if(document.getElementById('description').value.length==0)
    {
        document.getElementById('description').value="Here is some descri";
    }
    const input2 =document.getElementById('description').value;
    console.log("Value is"+document.getElementById('description').value);
        const newli=document.createElement('li');
        newli.className='fruit';
     newli.innerHTML=input1+"<p style='font-style:italic'>"+input2+'</p><button class="delete-btn">x</button>';             const ul=document.querySelector('.fruits');
        ul.appendChild(newli);
        console.log(newli);

    
})

// Show the fruit description in italics on the next line


// Create a filter that shows only those fruits whose either name or description or both matches the entered text

const filter=document.getElementById('filter');


filter.addEventListener('keyup',(e)=>{
    const fruit=document.querySelectorAll(".fruit");

    fruit.forEach((e1)=>{
        const fruitValue=filter.value.toLowerCase()
      
      
        if(e1.firstChild.textContent.toLowerCase().indexOf(fruitValue)>-1 || e1.childNodes[1].textContent.toLowerCase().indexOf(fruitValue)>-1)
       {
        e1.style.display='flex';
       }
       else
       e1.style.display='none';
          
    })

})