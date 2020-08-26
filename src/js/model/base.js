export const elements = {
    searchForm : document.querySelector('.search'),
    searchField : document.querySelector('.search__field'),
    resultContainer: document.querySelector('.results'),
    resultList: document.querySelector('.results__list'),
    resultPage: document.querySelector('.results__pages'),

}

export const elementStrings = {
    loader : 'loader'
}

//show loader
export const renderLoader = parent => {
    const html = `
        <div class="${elementStrings.loader}">
            <svg>
                <use href="img/icons.svg#icon-cw""></use>
            </svg>
        </div>
    `
    parent.insertAdjacentHTML('afterbegin', html)
}

//remove loader
export const removeLoader = () => {
    const el = document.querySelector(`.${elementStrings.loader}`)
    el.parentElement.removeChild(el)
}


//formate title
export const limitTitle = (title, limit = 17) => {
    if(title.length > limit) {
        const words = title.split(' ')
        let newTitle=[]
        words.reduce( (acc, cur) => {  
        	if((acc + cur.length) < limit) {0
            	newTitle.push(cur)         
          	}
          	return acc += cur.length
        }, 0)
        
        return `${newTitle.join(' ')} ...`
    }
    return title;
}