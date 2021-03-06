export function renderShoppingList(item) {
    const itemDiv = document.createElement('div');
    const itemP = document.createElement('p');

    // Added in class lists for the Div and P tags for complete/incomplete 

    itemDiv.classList.add(item.bought ? 'complete' : 'incomplete');
    

    itemDiv.classList.add('item');
    itemDiv.classList.add('quantity');
   

    itemP.textContent = `${item.item} ${item.quantity}`;
    


    itemDiv.append(itemP);

    return itemDiv;
}