import { elements, elementStrings, fomratNumber } from "../model/base"

export const clearResult = () => {
    elements.recipeContainer.innerHTML = ''
}

export const renderRecipe = (recipe,isLiked) => {
    createFigure(recipe)
    createRecipeDetails(recipe,isLiked)
    createRecipeIngredients(recipe)
    createRecipeDirections(recipe)

}

const createFigure = recipe => {

    const html = `
        <figure class="recipe__fig">
            <img src="${recipe.img}" alt="${recipe.title}" class="recipe__img">
            <h1 class="recipe__title">
                <span>${recipe.title}</span>
            </h1>
        </figure>
    `;

    elements.recipeContainer.insertAdjacentHTML('beforeend', html)
}

const createRecipeDetails = (recipe,isLiked) => {

    const html = `
        <div class="recipe__details" data-rid=${recipe.id}>
            <div class="recipe__info">
                <svg class="recipe__info-icon">
                    <use href="img/icons.svg#icon-stopwatch"></use>
                </svg>
                <span class="recipe__info-data recipe__info-data--minutes">${recipe.time}</span>
                <span class="recipe__info-text"> minutes</span>
            </div>
            
            <div class="recipe__info">
                <svg class="recipe__info-icon">
                    <use href="img/icons.svg#icon-man"></use>
                </svg>
                <span class="recipe__info-data recipe__info-data--people">${recipe.servings}</span>
                <span class="recipe__info-text"> servings</span>

                <div class="recipe__info-buttons">
                    <button class="btn-tiny btn-min">
                        <svg>
                            <use href="img/icons.svg#icon-circle-with-minus"></use>
                        </svg>
                    </button>
                    <button class="btn-tiny btn-plus">
                        <svg>
                            <use href="img/icons.svg#icon-circle-with-plus"></use>
                        </svg>
                    </button>
                </div>
            </div>
            <button class="recipe__love">
                <svg class="header__likes">
                    <use href="img/icons.svg#icon-heart${isLiked ? '' : '-outlined'}" data-likeItem=${recipe.id}></use>
                </svg>
            </button>
        </div>
    `;

    elements.recipeContainer.insertAdjacentHTML('beforeend', html)
}

const createRecipeIngredients = recipe => {
    let ingHTML = ``

    recipe.ingredients.forEach(el => {
        ingHTML += `
        <li class="recipe__item">
            <svg class="recipe__icon">
                <use href="img/icons.svg#icon-check"></use>
            </svg>
            <div class="recipe__count">${fomratNumber(el.count)}</div>
            <div class="recipe__ingredient">
                <span class="recipe__unit">${el.unit}</span>
                ${el.ingrediant}
            </div>
        </li>
        `
    })

    const mainMarkup = `
    <div class="recipe__ingredients">
        <ul class="recipe__ingredient-list">
            ${ingHTML}
        </ul>

        <button class="btn-small recipe__btn recipe__add-btn">
            <svg class="search__icon">
                <use href="img/icons.svg#icon-shopping-cart"></use>
            </svg>
            <span>Add to shopping list</span>
        </button>
    </div>
    `;

    elements.recipeContainer.insertAdjacentHTML('beforeend', mainMarkup)

}

const createRecipeDirections = recipe => {

    const html = `

    <div class="recipe__directions">
        <h2 class="heading-2">How to cook it</h2>
        <p class="recipe__directions-text">
            This recipe was carefully designed and tested by
            <span class="recipe__by">${recipe.publisher}</span>. Please check out directions at their website.
        </p>
        <a class="btn-small recipe__btn" href="${recipe.url}" target="_blank">
            <span>Directions</span>
            <svg class="search__icon">
                <use href="img/icons.svg#icon-triangle-right"></use>
            </svg>

        </a>
    </div>
    `;

    elements.recipeContainer.insertAdjacentHTML('beforeend', html)
}

export const updateRecipeServins = recipe => {
    //update recipe serving
    document.querySelector(`.${elementStrings.rPeople}`).textContent = recipe.servings
    
    //update serving time
    document.querySelector(`.${elementStrings.rMinute}`).textContent = recipe.time

    //update ingrediants counts
    Array.from(document.querySelectorAll(`.${elementStrings.rCount}`)).forEach((el,i) => {
        el.textContent = fomratNumber(recipe.ingredients[i].count)
    })

}