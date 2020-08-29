import { elements, elementStrings, fomratNumber } from "../model/base"

// export const clearList = () => {
//     elements.shoppingList.innerHTML = ''
// }

export const renderLike = recipe => {
    let html =`
        <li>
            <a class="likes__link" href="#${recipe.id}">
                <figure class="likes__fig">
                    <img src="${recipe.img}" alt="${recipe.title}">
                </figure>
                <div class="likes__data">
                    <h4 class="likes__name">${recipe.title}</h4>
                    <p class="likes__author">${recipe.publisher}</p>
                </div>
            </a>
        </li>
    `;

    elements.likeList.insertAdjacentHTML('beforeend', html)
}


export const removeLike = rid => {
    const el = document.querySelector(`a[href="#${rid}"]`)
    console.log(el);
    el.parentElement.removeChild(el)
}
