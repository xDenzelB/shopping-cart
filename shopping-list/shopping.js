import { checkAuth, logout, createItem, getItem, buyItem, deleteAllItems, } from '../fetch-utils.js';
import { renderShoppingList } from '../render-utils.js';

const form = document.querySelector('.item-form');
const deleteButton = document.querySelector('.delete');
const shopList = document.querySelector('.list');

checkAuth();

const logoutButton = document.getElementById('logout');

logoutButton.addEventListener('click', () => {
    logout();
});

form.addEventListener('submit', async(e) => {
    e.preventDefault();

    const data = new FormData(form);

    const item = data.get('item');
    const quantity = data.get('quantity');

    // send a new item to the supabase row 

    await createItem(item, quantity);
    // clear out the old list 
    form.reset();
    displayShoppingListItems();
});

window.addEventListener('load', async() => {
    displayShoppingListItems();
    // load up the new/old shopping list 
});


export async function displayShoppingListItems() {
    const items = await getItem();

    shopList.textContent = '';

    for (let item of items) {
        const itemEl = renderShoppingList(item);

        itemEl.addEventListener('click', async() => {
            await buyItem(item.id);
            

        
            

            displayShoppingListItems();
        });

        shopList.append(itemEl);
    }
}

deleteButton.addEventListener('click', async() => {
    await deleteAllItems();
    await displayShoppingListItems();

});

