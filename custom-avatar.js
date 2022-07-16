/*	TASK 1
	Sa se creeze o componenta "avatar" care afiseaza o imagine cu forma circulara.
*/

const avatarTemplate = document.createElement('template');
avatarTemplate.innerHTML = `
    <style>
      img {
        border-radius: 50%;
        height: 20vh;
        width: auto;
      }
    </style>

    <div class='avatar'>
    	<img />
    </div>
`;

class Avatar extends HTMLElement {
	constructor() {
		super();

		this.attachShadow({ mode: 'open' });
		this.shadowRoot.appendChild(avatarTemplate.content.cloneNode(true));
		this.shadowRoot.querySelector('img').src = this.getAttribute('mysrc');
	}
}

customElements.define('custom-avatar', Avatar);