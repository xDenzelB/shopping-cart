export function renderShoppingList(item) {
    const itemDiv = document.createElement('div');
    const itemP = document.createElement('p');

    // Added in class lists for the Div and P tags for complete/incomplete 

    itemDiv.classList.add(item.complete ? 'complete' : 'incomplete');

    itemDiv.classList.add('item');

    itemP.textContent = item.item;

    itemDiv.append(itemP);

    return itemDiv;
}