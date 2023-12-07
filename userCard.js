const template = document.createElement('template');
template.innerHTML = `
<style>
   h3{
    color: coral;
   }
</style>
<div class="user-card">
    <img />
    <div>
        <h3></h3>
    </div>
</div>
`;

class UserCard extends HTMLElement {
  constructor() {
    super();

    this.attachShadow({ mode: 'open' });//this process creates the shadow DOM
    this.shadowRoot.appendChild(template.content.cloneNode(true));
    this.shadowRoot.querySelector('h3').innerText =
    this.getAttribute('name'); //We will use this to get at elements on the shadow DOM

    this.shadowRoot.querySelector('img').src =
      this.getAttribute('avatar');


  }
}

window.customElements.define('user-card', UserCard);