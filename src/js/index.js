import { elements, renderLoader, removeLoader } from './model/base'
import { Search } from './model/Search'
import { Recipe } from './model/Recipe'
import { List } from './model/List'
import { Like } from './model/Like'
import * as searchUI from './view/searchView'
import * as recipeUI from './view/recipeView'
import * as listUI from './view/listView'
import * as likeUI from './view/likeView'

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

            const flag = state.like.like ? state.like.isLiked(state.recipe) : false
            recipeUI.renderRecipe(state.recipe, flag)

        } catch (error) {
            console.log("Recipe controlling error", error)
            alert("Recipe controlling error")
        }
    }
}

/****************************
 * SHOPPING LIST CONTROLLER *
 ****************************/
const controlList = ingredinats => {
    if(!state.list) state.list = new List()

    //
    ingredinats.forEach(el => {
        state.list.addItem(el)
    })

    listUI.clearList()
    listUI.renderList(ingredinats)

}



/*******************
 * LIKE CONTROLLER *
 *******************/
const controlLike = recipe => {
    if(!state.like) state.like = new Like()

    if(recipe){
        if(state.like.isLiked(recipe)){       
            state.like.removeItem(recipe)
            likeUI.removeLike(recipe)
        }else{
            state.like.addItem(recipe)
            likeUI.renderLike(recipe)
        }

        //toggle recipe like btn
        likeUI.toggleLikeBtn(state.recipe, state.like.isLiked(recipe))

        //Toggle Like Menu 
        likeUI.toggleLikeMenu(state.like.getNumLikes())
    }
}

/**************************************** EVENTLISTENER SECTION ********************************/

elements.searchForm.addEventListener('submit', e => {
    e.preventDefault();
    controlSearch();
})

//TESTING
window.addEventListener('load', () => {

    controlSearch()
    const recipeID = location.hash.replace('#', '')

    
    if(!state.like)
    {
        state.like = new Like()
        state.like.restoreLikes()
        state.like.like.forEach(el => likeUI.renderLike(el))
        likeUI.toggleLikeMenu(state.like.getNumLikes() > 0)
        
    }
    
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

    else if (e.target.matches('.recipe__add-btn, .recipe__add-btn *')) {
        controlList(state.recipe.ingredients)
    }

    else if (e.target.matches('.recipe__love, .recipe__love *')) {
        //const rid = e.target.closest('button').parentElement.dataset.rid
        //likeUI.liketoggleLike(rid);
        controlLike(state.recipe)
    }
})


//SHOPPING LIST LISTENER
elements.shoppingList.addEventListener('click', e => {
    const itemID = e.target.closest('li').dataset.itemid;
    
    if(e.target.matches('.shopping__delete, .shopping__delete *')){
        //del datastructure
        //const itemID = e.target.closest('li').dataset.itemid;
        state.list.removeItem(itemID)

        //remove from ui
        listUI.removeItem(itemID)
    }
    
    else if(e.target.matches('.shopping__count input')){
        state.list.updateItem(itemID, parseFloat(e.target.value))
    }
    
})
