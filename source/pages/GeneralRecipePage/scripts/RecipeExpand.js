// RecipeExpand.js

class RecipeExpand extends HTMLElement {
    constructor() {
        super()
        this.attachShadow({ mode: 'open' });

        // create elements for style and an article to hold html
        const styles = document.createElement('style');
        const article = document.createElement('article');

        // style for article
        // same as recipepage.css, so should we even use a shadow DOM?
        styles.innerHTML = `
            .photo {
                margin: 1em 0 0 1em;
            }
            .recipe-info-container {
                display: grid;
                grid-template-columns: 1fr 10fr 1fr;
                margin: 1em 1em 0 0 ;
                text-align: center;
            }
            .recipe-info {
                padding: 1em;
                margin: 1em;
            }
            .name {
                margin-bottom: .5em;
            }
            .recipe-info > div {
                padding: .5em;
            }
            .time-info {
                justify-content: center;
            }
            .recipe-tags span {
                padding: .5em;
                margin-top: .5em;
                background-color: #c4c4c4;
                border-radius: 1em;
            }
            .recipe-info-container > div > button {
                font-size: medium;
                height: 3rem;
                width: 7rem;
                border-radius: 1rem;
                margin-top: 1rem;
            }
            .back-to-search {
                margin-left: 1em;
            }
            .add-to-myrecipes {
                margin-right: 1em;
            }

            .ingredients {
                margin-left: 1em;
            }
            .ingredients > * {
                margin-left: 1em;
            }
            .ingredients > h3 {
                display: inline-block;
                margin-top: 1em;
                margin-right: 1em;
                padding-bottom: .5em;
            }
            .serving-size {
                display: inline-block;
                margin-left: 0;
            }
            .ingredients > div > button {
                font-size: medium;
                height: 1.5rem;
                width: 1.5rem;
                border-radius: .5rem;
                /* margin-top: 1rem; */
            }
            ul {
                margin-bottom: 1em;
            }
            li {
                padding: .5em;
                list-style-position: inside;
            }
            
            ol li {
                list-style-type: decimal; 
                padding-left: 2em;
            }
            .directions {
                margin-right: 1em;
            }
            .directions > * {
                margin-left: 1em;
            }
            .directions > h3 {
                display: inline-block;
                margin-top: 1em;
                margin-right: 1em;
                padding-bottom: .5em;
            }
            .equipment {
                display: inline-block;
                margin-left: 0;
            }
            ol {
                margin-bottom: 1em;
            }
            
            img {
                border-radius: 30;
            }
            textarea {
                margin: 2rem;
                font-size: 1.5rem;
            }
            .hide{
            display:none;
            }
        `;

        // skeleton code for recipe that will be filled in
        article.innerHTML = `
            <div class="photo" style=""> 
                <div class="recipe-notes">
                    <button class="notes-button">Recipe Notes</button>
                </div>
            </div>
            <div class="notes hide">
                <textarea name="comments" id="additional_comments" cols="30" rows="10"></textarea>
                <div class="recipe-notes">
                    <button class="image-button">Close</button>
                </div>
            </div>
            <div class="recipe-info-container">
                <div class="back-to-search">
                    <button>Back to Search</button>
                </div>
                <div class="recipe-info">
                    <h3 class="name"></h3>
                    <div class="time-info">
                        <span>Total Time: </span> 
                        <span><b id="time"></b></span>
                    </div>              
                    <div class="calories">
                        <span>Calories Per Serving:</span> 
                        <span><b id="cals"></b></span>
                    </div>
                    <div class="recipe-tags">               
                    </div>
                    <div class="description">
                        <p id="summary"></p>
                    </div>
                </div>
                <div class="add-to-myrecipes">
                    <button>Add to MyRecipes</button>
                </div>
            </div>
            <div class="ingredients">
                <h3>Ingredients</h3>
                <div class="serving-size">
                    <span>Servings:</span>
                    <button class="minus-button">-</button>
                    <span class="num-servings"><b id="servings"></b></span>
                    <button class="plus-button">+</button>
                </div>
                <ul class="ingredients">               
                </ul>
            </div>
            <div class="directions">
                <h3>Directions</h3>
                <div class="equipment">
                    <span>Equipment:</span>
                    <span><b id="equipment-list"></b></span>
                </div>
                <ol>      
                </ol>
            </div>
        `;

        // append style and article to shadow root 
        this.shadowRoot.append(styles, article);
    }

    /*
     * populates the article child of <recipe-expand> with selected recipe data
     */
    set data(data) {
        this.json = data;

        // reset article to be empty so we can populate it 
        // fill in with same html as in constructor
        this.shadowRoot.querySelector('article').innerHTML = `
            <div class="photo" style=""> 
                <div class="recipe-notes">
                    <button class="notes-button">Recipe Notes</button>
                </div>
            </div>
            <div class="notes hide">
                <textarea name="comments" id="additional_comments" cols="30" rows="10"></textarea>
                <div class="recipe-notes">
                    <button class="image-button">Close</button>
                </div>
            </div>
            <div class="recipe-info-container">
                <div class="back-to-search">
                    <button>Back to Search</button>
                </div>
                <div class="recipe-info">
                    <h3 class="name"></h3>
                    <div class="time-info">                   
                        <span>Total Time: </span> 
                        <span><b id="time"></b></span>   
                    </div>              
                    <div class="calories">
                        <span>Calories Per Serving:</span> 
                        <span><b id="cals"></b></span>
                    </div>
                    <div class="recipe-tags">               
                    </div>
                    <div class="description">
                        <p id="summary"></p>
                    </div>
                </div>
                <div class="add-to-myrecipes">
                    <button>Add to MyRecipes</button>
                </div>
            </div>
            <div class="ingredients">
                <h3>Ingredients</h3>
                <div class="serving-size">
                    <span>Servings:</span>
                    <button class="minus-button">-</button>
                    <span class="num-servings"><b id="servings"></b></span>
                    <button class="plus-button">+</button>
                </div>
                <ul class="ingredients">               
                </ul>
            </div>
            <div class="directions">
                <h3>Directions</h3>
                <div class="equipment">
                    <span>Equipment:</span>
                    <span><b id="equipment-list"></b></span>
                </div>
                <ol>      
                </ol>
            </div>
        `;

        // TODO: set all data

        // set image 
        const recipeImage = data['image'];
        this.shadowRoot.querySelector('.photo').style = `background-image: url(${recipeImage})`;

        // set recipe title
        const recipeTitle = data['title'];
        this.shadowRoot.querySelector('.name').innerHTML = recipeTitle;

        // set total time
        const totalTime = data['readyInMinutes'];
        this.shadowRoot.getElementById('time').innerHTML = totalTime + ' min';

        // set calories
        const calories = data[''] // need to find this
        this.shadowRoot.getElementById('cals').innerHTML = calories;

        // set racipe tags
        

        // set description
        const description = data['summary'] // need to find this
        this.shadowRoot.getElementById('summary').innerHTML = description;

        //set serving size
        const servings = data['servings'];
        this.shadowRoot.getElementById('servings').innerHTML = servings;

        // set ingredient list
        const ingredients = data[''];


        // set necessary equipment
        const equipmentSet = new Set();
        const recipeSteps = data['analyzedInstructions'][0].steps;
        for (let i = 0; i < recipeSteps.length; i++) {
            const equipmentArr = recipeSteps[i].equipment;
            for (let j = 0; j < equipmentArr.length; j++) {
                equipmentSet.add(equipmentArr[j].name);
            }
        }
        let count = 1;
        let equipmentList = this.shadowRoot.getElementById('equipment-list');
        for (const item of equipmentSet) {
            if (count == equipmentSet.size) {
                equipmentList.innerHTML += item;
            } else {
                equipmentList.innerHTML = equipmentList.innerHTML + item + ', ';
            }
            count++;
        }

        // set directions list
        const directions = data['analyzedInstructions'][0].steps;
        let directionsList = this.shadowRoot.querySelector('ol');
        for (let i = 0; i < directions.length; i++) {
            const dir = document.createElement('li');
            dir.innerHTML = directions[i].step;
            directionsList.appendChild(dir);
        }
    }
}

customElements.define('recipe-expand', RecipeExpand);

