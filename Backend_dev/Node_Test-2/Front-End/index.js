
let stars = document.getElementsByClassName("star");
let output = document.getElementById("output");
let currentRating = 0;


function gfg(n) {
    remove();
    for (let i = 0; i < n; i++) {
        let cls = "";
        if (n == 1) cls = "one";
        else if (n == 2) cls = "two";
        else if (n == 3) cls = "three";
        else if (n == 4) cls = "four";
        else if (n == 5) cls = "five";
        stars[i].className = "star " + cls;
    }
    currentRating = n;
    output.innerText = "Rating is: " + n + "/5";
}


function remove() {
    for (let i = 0; i < 5; i++) {
        stars[i].className = "star";
    }
}

document.getElementById("reviewForm").addEventListener("submit", function(e) {
    e.preventDefault();
    
    const name = document.getElementById("name").value;
    const pros = document.getElementById("pros").value;
    const cons = document.getElementById("cons").value;
    const rating = currentRating;

const review={
    name:name,
    pros:pros,
    cons:cons,
    rating:rating
}


 axios.post('http://localhost:5000/',review)
 .then(r=>{
window.location.reload();
 })
 .catch(e=>console.log(e));
});

function handleSearch(e) {
    e.preventDefault();
    const search = document.getElementById('search').value;
    console.log(search);
    axios.get(`http://localhost:5000/${search}`)
    .then(r=>{
        console.log(r.data);
const div=document.getElementById('div');

const com=`<h1 style="color: orange;">Comoany name : ${r.data[0].name}</h1>
    <h1 style="color: green;">Comany Rating :${r.data[0].rating}</h1>
    <h2>Pros:-</h2>
    <h2>${r.data[0].pros}</h2>
    <h2>Cons:-</h2>
    <h2>${r.data[0].cons}</h2>
    <hr>`

    div.innerHTML+=com;
    })
    .catch(e=>console.log(e))
}