export class List {

    constructor(){
        this.list = []
    }

    addItem(ingrediant){
        this.list.push(ingrediant)
    }

    removeItem(id){
        const index = this.list.findIndex( el => el.id === id)
        index !== -1 ? this.list.splice(index,1) : ''
    }

    updateItem(id, count){
        const index = this.list.findIndex( el => el.id === id)
        index !== -1 ? this.list[index].count = count : ''
    }
}