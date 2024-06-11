const url = "https://crudcrud.com/api/919d08a977734d54b7f69ecb104b8282/appointmentData";

window.addEventListener("DOMContentLoaded", () => {
    axios.get(url)
        .then((response) => {
            response.data.forEach((item) => {
                const { username, email, phone, _id } = item;
                addOnDisplay(username, email, phone, _id);
                console.log(username + email + phone + _id);
            });
        }).catch((err) => console.log('Error fetching data:', err));
});

function addOnDisplay(username, email, phone, _id) {
    const ul = document.getElementById("ui");
    const newLi = document.createElement("li");
    newLi.id = _id;

    const editButton = document.createElement("button");
    editButton.textContent = "Edit";
    editButton.type = "button";
    editButton.onclick = handleEdit;

    const deleteButton = document.createElement("button");
    deleteButton.textContent = "Delete";
    deleteButton.type = "button";
    deleteButton.onclick = handleDelete;

    newLi.textContent = `${username}-${email}-${phone}-`;
    newLi.appendChild(editButton);
    newLi.appendChild(deleteButton);
    ul.appendChild(newLi);
}

function handleFormSubmit(event) {
    event.preventDefault();

    const email = event.target.email.value;
    const phone = event.target.phone.value;
    const username = event.target.username.value;
    const _id = event.target._id.value;

    const userDetails = { username, email, phone };

    if (_id) {
        console.log(url+_id);
        axios.put(`${url}/${_id}`, userDetails)
            .then((response) => {
                document.getElementById(_id).remove();
                addOnDisplay(username, email, phone, _id);
                clearForm();
            })
            .catch((error) => console.log('Error updating data:', error));
    } else {
        axios.post(url, userDetails)
            .then((response) => {
                addOnDisplay(username, email, phone, response.data._id);
                clearForm();
            })
            .catch((error) => console.log('Error adding data:', error));
    }
}

function handleEdit(event) {
    const fullString = event.target.parentNode.textContent;
    const [username, email, phone, _id] = fullString.split("-");

    document.getElementById("username").value = username;
    document.getElementById("email").value = email;
    document.getElementById("phone").value = phone;
    document.getElementById("_id").value = _id.trim(); // trim to remove any extra spaces
}

function handleDelete(event) {
    const _id = event.target.parentNode.id;

    axios.delete(`${url}/${_id}`)
        .then(() => {
            event.target.parentNode.remove();
        })
        .catch((error) => console.log('Error deleting data:', error));
}

function clearForm() {
    document.getElementById('form').reset();
    document.getElementById('_id').value = '';
}

document.getElementById('form').addEventListener('submit', handleFormSubmit);
