export class Like {

    constructor(){
        this.like = []
    }

    addItem(recipe){
        this.like.push({
            id: recipe.id,
            title: recipe.title,
            publisher: recipe.publisher,
            img: recipe.img
        })
        
        this.presistLocalStorage()
    }

    removeItem(recipe){
        const index = this.like.findIndex( el => el.id === recipe.id)
        index !== -1 ? this.like.splice(index,1) : ''
        this.presistLocalStorage();
    }

    isLiked(recipe){
        const index = this.like.findIndex( el => el.id === recipe.id)
        return index !== -1
    }

    // toggleLike(rid){
    //     this.isLiked(rid) ? this.unlikeRecipe(rid) : this.likeRecipe(rid)
    // }

    presistLocalStorage(){
        localStorage.setItem('likes', JSON.stringify(this.like))
    }

    restoreLikes(){
        //restore likes from local storage
        if(localStorage.getItem('likes'))
            this.like = JSON.parse(localStorage.getItem('likes'))
    }

    getNumLikes(){
        return this.like.length;
    }
}