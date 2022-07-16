/*	TASK 3
	Sa se creeze un custom element numit "word-counter" care extinde <p> si vine in plus cu un buton "Show word count".
	La apasarea butonului apare numarul de cuvinte din text.
*/

const wordCountTemplate = document.createElement('template')
wordCountTemplate.innerHTML = `
    <style>
      .text-container {
        width: 400px;
		padding: 20px;
        border: 1px solid purple;
      }
    </style>

    <p class='text-container'><slot /></p>
	<p class='result'>Number of words is: </p>
	<button class='countBtn'>Show word count</button>
    `;

class WordCount extends HTMLParagraphElement {
	constructor() {
		super();

		this.attachShadow({ mode: 'open' });
		this.shadowRoot.appendChild(wordCountTemplate.content.cloneNode(true));
	}

	countWords() {
		let result = document.querySelector('.mytext').textContent.replace(/([^a-z0-9 ])/gi, '').split(' ').length;
		this.shadowRoot.querySelector('.result').textContent = `Number of words is: ${result}`;
	}

	connectedCallback() {
		this.shadowRoot.querySelector('.countBtn').addEventListener('click', () => this.countWords());
	}
}

customElements.define('word-count', WordCount, { extends: 'p' });