export class List {

    constructor(){
        this.list = []
    }

    addItem(ingrediant){
        this.list.push(ingrediant)
        this.presistLocal()
    }

    removeItem(id){
        const index = this.list.findIndex( el => el.id === id)
        if (index !== -1){
            this.list.splice(index,1)
            this.presistLocal()
        } 
    }

    updateItem(id, count){
        const index = this.list.findIndex( el => el.id === id)
        if(index !== -1){
            this.list[index].count = count
            this.presistLocal()
        }
    }

    presistLocal(){
        localStorage.setItem('list', JSON.stringify(this.list))
    }

    restoreList(){
        if(localStorage.getItem('list')){
            this.list = JSON.parse(localStorage.getItem('list'))
        }
    }

    getNumListItem(){
        return this.list.length;
    }

    resetList(){
        this.list = []
        localStorage.setItem('list', '')
    }
}