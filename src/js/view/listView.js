import { elements, elementStrings, fomratNumber } from "../model/base"

export const clearList = () => {
    elements.shoppingList.innerHTML = ''
}

export const renderList = ingrediants => {
    let html = ''
    ingrediants.forEach(item => {

        html += `
            <li class="shopping__item" data-itemid=${item.id}>
                <div class="shopping__count">
                    <input type="number" value="${item.count}" step="${item.count}" min=0.25>
                    <p>${item.unit}</p>
                </div>
                
                <p class="shopping__description">${item.ingrediant}</p>
                
                <button class="shopping__delete btn-tiny">
                <svg>
                    <use href="img/icons.svg#icon-circle-with-cross"></use>
                </svg>
                </button>
            </li>
        `;
    })

    elements.shoppingList.insertAdjacentHTML('beforeend', html)
}


export const removeItem = id => {
    const item = document.querySelector(`[data-itemid="${id}"]`)
    item.parentElement.removeChild(item)
}

export const deleteAllBtn = () => {
    const btn = `
            <button class="btn-small delete-all__btn" style="margin-top:30px">
                <svg>
                    <use href="img/icons.svg#icon-squared-cross"></use>
                </svg>
                <span>DELETE ALL</span>
            </button>
        `
    elements.shoppingList.insertAdjacentHTML('afterend', btn)
}
