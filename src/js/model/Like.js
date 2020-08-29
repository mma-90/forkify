export class Like {

    constructor(){
        this.like = []
    }

    likeRecipe(rid){
        console.log('like',rid);
        this.like.push(rid)
    }

    unlikeRecipe(rid){
        const index = this.like.findIndex( el => el === rid)
        index !== -1 ? this.like.splice(index,1) : ''
        console.log('unlike',rid);
    }

    isLiked(rid){
        const index = this.like.findIndex( el => el === rid)
        console.log(index);
        return index !== -1 
    }

    // toggleLike(rid){
    //     this.isLiked(rid) ? this.unlikeRecipe(rid) : this.likeRecipe(rid)
    // }
}