import { elements , renderLoader , removeLoader} from './model/base'
import { Search } from './model/Search'
import * as searchUI from './view/searchView'

//create datastructure
const state = {}

/**************************************** CONTROL SECTION ********************************/

/*********************
 * SEARCH CONTROLLER *
 *********************/

const controlSearch = async () => {
    
    //TESTING
    const query = 'pizza';
    
    // 1- get query
    //const query = elements.searchField.value;

    if(query){

        // 2- search query
        state.search = new Search(query)
        
        // render loader
        renderLoader(elements.resultContainer)
        
        try {
            await state.search.getResult()
            
            // remove loader
            removeLoader()

            console.log(state.search.search);
            
            // 3- display search resuelt in UI
            if(state.search.search.count){
                // clear old result
                searchUI.clearResult()

                searchUI.renderRecipes(state.search.search.recipes)    
        
            }
            
            
        } catch (error) {
            console.log("Search controlling error",error)
        }   
    }
}

/*********************
 * RECIPE CONTROLLER *
 *********************/

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
window.addEventListener('load', controlSearch);

//listen pagination btn (event delegation)
elements.resultPage.addEventListener('click', e => {
    if (e.target.matches('.btn-inline, .btn-inline *')){
        
        const goto = parseInt(e.target.closest('.btn-inline').dataset.goto);
        searchUI.clearResult()
        searchUI.renderRecipes(state.search.search.recipes ,goto)
    }
})