const url = "https://crudcrud.com/api/ce50a385978144529befdcd42f5775bf/appointmentData";

window.addEventListener("DOMContentLoaded", () => {
    axios.get(url)
        .then((response) => {
            response.data.forEach((item) => {
                const { username, email, phone,_id } = item;
                addOnDisplay(username, email, phone,_id);
                console.log(username + email + phone+_id);
            });
        }).catch((err) => console.log(err));
});

function addOnDisplay(username, email, phone,_id) {
    const ul = document.getElementById("ui");
    const newLi = document.createElement("li");

    const editButton = document.createElement("button");
    editButton.textContent = "Edit";

    const deleteButton = document.createElement("button");
    deleteButton.textContent = "Delete";
    deleteButton.type = "button";
    deleteButton.onclick = handleDelete;

    newLi.textContent = `${username}-${email}-${phone}-${_id}-`;
    newLi.appendChild(editButton);
    newLi.appendChild(deleteButton);
    ul.appendChild(newLi);
}

function handleFormSubmit(event) {
    event.preventDefault();

    const email = event.target.email.value;
    const phone = event.target.phone.value;
    const username = event.target.username.value;

    addOnDisplay(username, email, phone);

    const userDetails = { username, email, phone };

    axios.post(url, userDetails)
        .then((response) => console.log(response.data))
        .catch((error) => console.log(error));
}

function handleDelete(event) {
    const fullString = event.target.parentNode.textContent;
    const [username, email, phone,_id] = fullString.split("-");

    console.log(username + email + phone+_id);

    
    axios.delete(`${url}/${_id}`)
        .then(() => {
            event.target.parentNode.remove();
        })
        .catch((error) => console.log(error));
}

// Assuming the form has an ID of 'form' and there is a UL with ID 'ui'
document.getElementById('form').addEventListener('submit', handleFormSubmit);
