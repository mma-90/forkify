import { elements, renderLoader, removeLoader } from './model/base'
import { Search } from './model/Search'
import { Recipe } from './model/Recipe'
import * as searchUI from './view/searchView'
import * as recipeUI from './view/recipeView'

//create datastructure
const state = {}
//TESTING
window.s = state
/**************************************** CONTROL SECTION ********************************/

/*********************
 * SEARCH CONTROLLER *
 *********************/

const controlSearch = async () => {

    //TESTING
    //const query = 'pizza';

    // 1- get query
    const query = elements.searchField.value;

    if (query) {

        // 2- search query
        state.search = new Search(query)

        // render loader
        renderLoader(elements.resultContainer)

        try {
            await state.search.getResult()

            // remove loader
            removeLoader()

            // clear old result
            searchUI.clearResult()
            console.log(state.search.search);

            // 3- display search resuelt in UI
            if (state.search.search.count)
                searchUI.renderRecipes(state.search.search.recipes)

        } catch (error) {
            console.log("Search controlling error", error)
            alert("Search controlling error")
        }
    }
}

/*********************
 * RECIPE CONTROLLER *
 *********************/
const contorlRecipe = async rID => {
    if (rID) {
        state.recipe = new Recipe(rID)
        try {
            recipeUI.clearResult()

            renderLoader(elements.recipeContainer)

            await state.recipe.fetchRecipe()

            state.recipe.getRecipe()

            removeLoader()

            recipeUI.renderRecipe(state.recipe)

        } catch (error) {
            console.log("Recipe controlling error", error)
            alert("Recipe controlling error")
        }
    }
}

/*******************
 * LIKE CONTROLLER *
 *******************/

/****************************
 * SHOPPING LIST CONTROLLER *
 ****************************/


/**************************************** EVENTLISTENER SECTION ********************************/

elements.searchForm.addEventListener('submit', e => {
    e.preventDefault();
    controlSearch();
})

//TESTING
window.addEventListener('load', () => {

    controlSearch()
    const recipeID = location.hash.replace('#', '')

    if (recipeID) contorlRecipe(recipeID)

});

//listen pagination btn (event delegation)
elements.resultPage.addEventListener('click', e => {

    if (e.target.matches('.btn-inline, .btn-inline *')) {
        const goto = parseInt(e.target.closest('.btn-inline').dataset.goto);
        searchUI.clearResult()
        searchUI.renderRecipes(state.search.search.recipes, goto)
    }

})

//listen hashchange
window.addEventListener('hashchange', e => {
    const recipeID = location.hash.replace('#', '')
    contorlRecipe(recipeID)
})

//listen updateserving btns
elements.recipeContainer.addEventListener('click', e => {

    if (e.target.matches('.btn-min, .btn-min *')) {
        if (state.recipe.servings > 1) {
            state.recipe.updateServing('min')
            recipeUI.updateRecipeServins(state.recipe)
            //recipeUI.renderRecipe(state.recipe)
        }
    }

    else if (e.target.matches('.btn-plus, .btn-plus *')) {
        state.recipe.updateServing('plus')
        recipeUI.updateRecipeServins(state.recipe)
        //recipeUI.renderRecipe(state.recipe)
    }
})

