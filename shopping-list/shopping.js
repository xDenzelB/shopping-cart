import { checkAuth, logout, createItem } from '../fetch-utils.js';

const form = document.querySelector('.item-form');
const deleteButton = document.querySelector('.delete');
const shopList = document.querySelector('.list');

checkAuth();

const logoutButton = document.getElementById('logout');

logoutButton.addEventListener('click', () => {
    logout();
});

form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const data = new FormData(form);

    const item = data.get('item');
    const quantity = data.get('quantity');

    // send a new item to the supabase row 

    await createItem(item, quantity);
    // clear out the old list 
    form.reset();
})

window.addEventListener('load' async() => {
    
})
