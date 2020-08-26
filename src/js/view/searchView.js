import { elements, limitTitle } from "../model/base"

const renderRecipe = recipe => {
    //results__link--active
    const html = `
        <li>
            <a class="results__link results__link" href="#${recipe.recipe_id}">
                <figure class="results__fig">
                    <img src="${recipe.image_url}" alt="${recipe.title}">
                </figure>
                <div class="results__data">
                    <h4 class="results__name">${limitTitle(recipe.title)}</h4>
                    <p class="results__author">${recipe.publisher}</p>
                </div>
            </a>
        </li>
    `;

    elements.resultList.insertAdjacentHTML('beforeend', html)
}

export const renderRecipes = (recipes, page = 1, limit = 10) => {
    //pagination , page, direction, limit

    const pages = Math.ceil(recipes.length / limit)
    const start = (page - 1) * limit
    const end = limit + start
    
    recipes.slice(start, end).forEach(el => renderRecipe(el))
    paginate(page, pages)
}



const paginate = (page, pages) => {

    if (pages > 1) {
        if (page > 1 && page < pages) {

            showPaginationBtn(page + 1, 'next')
            showPaginationBtn(page - 1, 'prev')
        
        } else if (page == 1) {
        
            showPaginationBtn(page + 1, 'next')
        
        } else if (page == pages) {
        
            showPaginationBtn(page - 1, 'prev')
        
        }
    } 
}

const showPaginationBtn = (page, type) => {
    const html = `
        <button class="btn-inline results__btn--${type}" data-goto="${page}">
            <span>Page ${page}</span>
            <svg class="search__icon">
                <use href="img/icons.svg#icon-triangle-${ type == 'prev' ? 'left' : 'right'}"></use>
            </svg>
        </button>
    `
    elements.resultPage.insertAdjacentHTML('afterbegin', html)
}

export const clearResult = () => {
    elements.resultList.innerHTML = ''
    elements.resultPage.innerHTML = ''
}