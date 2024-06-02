const subhead=document.createElement('h3');

const headTest=document.createTextNode("Buy high quality organic fruits online");

subhead.appendChild(headTest);
subhead.style.fontStyle='italic';
const div=document.getElementsByTagName('div');
div[0 ].appendChild(subhead);

const ul=document.querySelector('.fruits');
console.log(ul.parentElement);

const para=document.createElement('p');
const paraText=document.createTextNode('Total fruits: 4');
para.appendChild(paraText);

div[1].insertBefore(para,ul);
para.setAttribute('id','fruits-total');