import Axios from "axios"
import { config } from "../config"

export class Recipe {

    constructor(id) {
        this.id = id
    }

    async fetchRecipe() {
        try {
            const res = await Axios.get(`${config.apiHOST.get}${this.id}`)
            this.img = res.data.recipe.image_url
            this.ingredients = res.data.recipe.ingredients
            this.publisher = res.data.recipe.publisher
            this.rank = res.data.recipe.social_rank
            this.url = res.data.recipe.source_url
            this.title = res.data.recipe.title

        } catch (error) {
            console.log("Recipe Processing error", error)
        }
    }

    calcServings() {
        //TODO
        this.servings = 1;
    }

    calcTime() {
        // servings * 15 min
        this.time = this.servings * 15;
    }

    parseIngrediants() {
        /**
         * 1- lowercase
         * 2- remove ()
         * 3- replace ul with us
         * 4- create ingrediant object {price, unit, ingrediant}
         */

        const unitsLong = config.unit.long;
        const unitsShort = config.unit.short;
        const newIngrediants = []

        this.ingredients.forEach(el => {
            let ing = {}

            el = el.toLowerCase().trim();
            el = el.replace(/ *\([^)]*\) */g, ' ')
            el = el.replace('-', '')

            const words = el.split(' ');
            let unitIndex;

            //replace ul with us and get the unit index
            words.forEach((word, wIndex) => {
                unitsLong.forEach((ul, ulIndex) => {
                    if (word === ul) {
                        unitIndex = wIndex
                        words[wIndex] = unitsShort[ulIndex]
                    }
                })
            })

            //console.log(unitIndex, el)

            if (unitIndex) {
                if (unitIndex === 0) {
                    //teaspoons salt
                    ing = {
                        count: 1,
                        unit: words[unitIndex],
                        ingrediant: words.slice(unitIndex + 1).join(' ')
                    }
                } else {
                    //1 3/4 teaspoons salt
                    ing = {
                        count: parseFloat(eval(words.slice(0, unitIndex).join('+').replace('-', '+').replace(/((\+)+)/g, '+'))),
                        unit: words[unitIndex],
                        ingrediant: words.slice(unitIndex + 1).join(' ')
                    }
                }
            } else {
                //2 ears corn
                if (words[0] > 0) {
                    ing = {
                        count: parseFloat(words[0]),
                        unit: '',
                        ingrediant: words.splice(1).join(' ')
                    }
                } else {
                    //semolina flour or cornmeal for dusting
                    ing = {
                        count: 1,
                        unit: '',
                        ingrediant: words.join(' ')
                    }
                }
            }
            //console.log(ing);
            newIngrediants.push(ing)
        })
        //EOF main ingrediants loop

        this.ingredients = newIngrediants;
    }

    getRecipe() {
        this.parseIngrediants()
        this.calcServings()
        this.calcTime()
    }

    updateServing(type) {
        if (this.servings > 0) {
            this.ingredients.forEach(el => {
                const countPerPerson = el.count / this.servings

                if (type === 'plus')
                    el.count += countPerPerson
                else
                    el.count -= countPerPerson
            })

            if (type === 'plus')
                this.servings++
            else
                this.servings > 1 ? this.servings-- : ''

            this.calcTime()
        }
    }
}