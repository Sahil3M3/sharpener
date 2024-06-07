const url="https://crudcrud.com/api/eb2f0cbfa44f46afa206e0c1c4be873c/Notes"

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
    }).catch((err)=>console.log(err))

}

function refreshTotal()
{
    const p1=  document.getElementById("p1");
    axios.get(url).
    then((res)=>{
console.log(res);
p1.textContent=res.data.length;
    }).catch((err)=>console.log(err))

}
window.addEventListener("DOMContentLoaded",()=>{
    refreshTotal();
})