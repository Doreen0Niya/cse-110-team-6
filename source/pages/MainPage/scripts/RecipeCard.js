const template = document.createElement('template');
template.innerHTML=`
<style>
* {
  margin: 0;
  padding: 0;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen,
    Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
}

.recipe-card {
    position: relative;
    width: 200px;
    height: 200px;
    background-size: contain;
    background-size: cover;
    border-radius: 30px;
    
  }
  .grey{
    filter: grayscale(100%);
  }
  
  .recipe-card > span {
    background-color: #c4c4c4;
    position: absolute;
    bottom: 0; 
    left: 0; 
    width: 200px; 
    height: 30px;
    border-radius: 0px 0px 30px 30px;
    text-align: center;
    vertical-align: middle;
    line-height: 30px; 
  }
</style>

<div class = "recipe-card">
    <span></span>
</div>
`
class RecipeCard extends HTMLElement{

    constructor(){
        super();
        this.attachShadow({mode:'open'});
        this.shadowRoot.appendChild(template.content.cloneNode(true));
        this.shadowRoot.querySelector('span').innerText = this.getAttribute('name');
        this.shadowRoot.querySelector('div').style.backgroundImage = `url(${this.getAttribute('image')})`
    }
}

window.customElements.define('recipe-card', RecipeCard);