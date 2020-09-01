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


export const removeLike = recipe => {
    const el = document.querySelector(`a[href="#${recipe.id}"]`)
    el.parentElement.removeChild(el)
}

export const toggleLikeMenu = flag => {
    const el = elements.likeMenu
    el.style.visibility = flag ? 'visible' : 'hidden'
}

export const toggleLikeBtn = (recipe, isLiked) => {
    const btn = document.querySelector(`[data-likeItem="${recipe.id}"]`)
    btn.href.baseVal = `img/icons.svg#icon-heart${ isLiked ? '' : '-outlined'}`
}

