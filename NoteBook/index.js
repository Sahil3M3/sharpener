const url="https://crudcrud.com/api/564b47be7e444183975e5585067eedef/Notes"

function handleFormSubmit()
{
    event.preventDefault()

 const inputNoteTitle=document.getElementById("inputNoteTitle").value;
 const inputNoteDesc=document.getElementById("inputNoteDesc").value;

 const myob={
    inputNoteTitle,
    inputNoteDesc
 }
 console.log(myob)
    axios.post(url,myob).
    then((res)=>{
console.log(res);
showAllNotes()
    }).catch((err)=>console.log(err))

}

function refreshTotal()
{
    const p1=  document.getElementById("p1");
   
    axios.get(url).
    then((res)=>{
console.log(res);
p1.textContent=res.data.length;
showTotal()
    }).catch((err)=>console.log(err))

}
window.addEventListener("DOMContentLoaded",()=>{
showAllNotes();

 refreshTotal();
})

function showAllNotes()
{
    const ui=document.getElementById("ui");
    ui.innerHTML="<p></p>"




axios.get(url).then((res)=>{
    for(let i=0;i<res.data.length;i++)
        {
            const li=document.createElement("li");
            li.style="background-color: Yellow;"
            li.innerHTML=`<h3>${res.data[i].inputNoteTitle}<h3> <br><br>${res.data[i].inputNoteDesc} `;
            ui.appendChild(li);
        }
        showTotal()
         
}).catch((err)=>console.log(err))

}

function showTotal()
{
    const p2=document.getElementById("p2");
    p2.textContent=document.querySelectorAll("li").length
}

function handleSearch(){
    const ui=document.getElementById("ui");
    ui.innerHTML="<p></p>"
    const value=event.target.value;
    axios.get(url).then((res)=>{
        for(let i=0;i<res.data.length;i++)
            {
                if(res.data[i].inputNoteTitle.includes(value))
                    {
                const li=document.createElement("li");
                li.style="background-color: Yellow;"
                li.innerHTML=`<h3>${res.data[i].inputNoteTitle}<h3> <br><br>${res.data[i].inputNoteDesc} `;
                ui.appendChild(li);
                    }
                    showTotal()
            }
             
    }).catch((err)=>console.log(err))


}

