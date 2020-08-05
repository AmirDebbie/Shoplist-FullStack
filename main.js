// const { default: Axios } = require("axios");

const addButton = document.getElementById('addButton');
const itemInput = document.getElementById('item');
const itemList = document.getElementById('itemList');
let id = 1;

addButton.addEventListener('click', addItem);
//what happens when button is clicked
async function addItem() {
    const newItem = {
        "id": id,
        "name": itemInput.value
    };
    console.log(newItem);
    const {data} = await axios.post('http://localhost:3000/products', newItem);
    id++;
    // insert new item to list
    const newListItem = document.createElement('li');
    newListItem.innerHTML = data.name;
    itemList.appendChild(newListItem);
}