// const { default: Axios } = require("axios");

const addButton = document.getElementById('addButton');
const itemInput = document.getElementById('item');
const itemList = document.getElementById('itemList');
let id = 1;

itemInput.focus();


addButton.addEventListener('click', addItem);
getList();

async function getList() {
    const {data} = await axios.get('http://localhost:3000/products');
    if (data.length > 0) {
        let maxId = 0;
        for (let i = 0; i < data.length; i++) {
            if (parseInt(data[i].id) > maxId) {
                maxId = parseInt(data[i].id);
            }
        }
        id = maxId + 1;
    data.forEach((value) => {
        // add item from server to list
        const newItem = document.createElement('li');
        newItem.innerHTML = value.name;
        newItem.id = value.id;
        itemList.appendChild(newItem);
        // add delete button
        const deleteButton = document.createElement('button');
        deleteButton.className = 'delete';
        deleteButton.innerHTML = 'delete';
        newItem.appendChild(deleteButton);
        // delete button function
        deleteButton.addEventListener('click', deleteItem)
        async function deleteItem() {
            const {data} = await axios.delete(`http://localhost:3000/products/${newItem.id}`)
            if (data === 'DELETED') {
                itemList.removeChild(newItem);
                console.log('item deleted');
            }
        }
    });
};
};

//what happens when button is clicked
async function addItem() {
    const newItem = {
        "id": `${id}`,
        "name": itemInput.value
    };
    console.log(newItem);
    // post new item to server
    const {data} = await axios.post('http://localhost:3000/products', newItem);
    id++;
    // insert new item to list
    const newListItem = document.createElement('li');
    newListItem.innerHTML = data.name;
    newListItem.id = data.id;
    itemList.appendChild(newListItem);

    // add delete item button
    const deleteButton = document.createElement('button');
    deleteButton.className = 'delete';
    deleteButton.innerHTML = 'delete';
    newListItem.appendChild(deleteButton);
    itemList.appendChild(newListItem);
    // what delete button does
    deleteButton.addEventListener('click', deleteItem)
    async function deleteItem() {
        const {data} = await axios.delete(`http://localhost:3000/products/${newListItem.id}`)
        if (data === 'DELETED') {
            itemList.removeChild(newListItem);
            console.log('item deleted');
        }
    }

    itemInput.value = '';
    itemInput.focus();
    
}
    // enter is "send"
    const enterIsSend = document.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            addItem();
        }
    });