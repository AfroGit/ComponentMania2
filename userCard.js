const template = document.createElement('template');
template.innerHTML = `
<style>
   .user-card {
      font-family: 'Arial', sans-serif;
      background: #f4f4f4;
      width: 500px;
      height: 225px;
      display: grid;
      grid-template-columns: 1fr 2fr;
      grid-gap: 10px;
      margin-bottom: 15px;
      border-bottom: darkorchid 5px solid;
   
   }

   .user-card img {
      width: 100%;
   }

   .user-card button {
       cursor: pointer;
       background: darkorchid;
       color: #fff;
       border: 0;
       border-radius: 5px;
       padding: 5px 10px;
   
   }
   
</style>
<div class="user-card">
    <img />
    <div>
        <h3></h3>
        <div class="info">
            <p><slot name="email" /></p>
            <p><slot name="phone" /></p>
            <p><slot name="department" /></p>
        </div>
        <button class="toggle-info">Hide Info</button>
    </div>
        </div>
    </div>
</div>
`;

class UserCard extends HTMLElement {
  constructor() {
    super();

    this.showInfo = true;

    this.attachShadow({ mode: 'open' });//this process creates the shadow DOM
    this.shadowRoot.appendChild(template.content.cloneNode(true));
    this.shadowRoot.querySelector('h3').innerText =
      this.getAttribute('name'); //We will use this to get at elements on the shadow DOM

    this.shadowRoot.querySelector('img').src =
      this.getAttribute('avatar');


  }

  toggleInfo() {
    this.showInfo = !this.showInfo;

    const info = this.shadowRoot.querySelector('.info');
    const toggleBtn = this.shadowRoot.querySelector('button');

    if(this.showInfo) {
      info.style.display = 'block';
      toggleBtn.innerText = 'Hide Info';
    } else {
      info.style.display = 'none';
      toggleBtn.innerText = 'Show Info';
    }
  }

  connectedCallback() {
    this.shadowRoot.querySelector('button').addEventListener('click', () => {
      this.toggleInfo();
    });
  }

  disconnectedCallback(){
    this.shadowRoot.querySelector('button').removeEventListener();
    
  }
}

window.customElements.define('user-card', UserCard);