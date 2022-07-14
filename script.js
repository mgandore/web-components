///////////////////    task 1     //////////////////////////

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


/////////////////      task 2      ///////////////////////////
/////////////////  code from example  ////////////////////////
class TimeFormatted extends HTMLElement {

	render() { // (1)
		let date = new Date(this.getAttribute('datetime') || Date.now());

		this.innerHTML = new Intl.DateTimeFormat("default", {
			year: this.getAttribute('year') || undefined,
			month: this.getAttribute('month') || undefined,
			day: this.getAttribute('day') || undefined,
			hour: this.getAttribute('hour') || undefined,
			minute: this.getAttribute('minute') || undefined,
			second: this.getAttribute('second') || undefined,
			timeZoneName: this.getAttribute('time-zone-name') || undefined,
		}).format(date);
	}

	connectedCallback() { // (2)
		if (!this.rendered) {
			this.render();
			this.rendered = true;
		}
	}

	static get observedAttributes() { // (3)
		return ['datetime', 'year', 'month', 'day', 'hour', 'minute', 'second', 'time-zone-name'];
	}

	attributeChangedCallback(name, oldValue, newValue) { // (4)
		this.render();
	}
}

customElements.define("time-formatted", TimeFormatted);
//////////////////////////////////////////////////////////////

class LiveTimer extends HTMLElement {

	constructor() {
		super();
		this.innerHTML = `<time-formatted hour="numeric" minute="numeric" second="numeric"></time-formatted>`;
	}
	
	updateTime() {
		this.date = new Date();
		console.log(`All details here: ${this.date}`);
		this.firstChild.setAttribute('datetime', this.date);
		const tickEvent = new CustomEvent('tick', { detail: this.date });
		this.dispatchEvent(tickEvent);
	}

	connectedCallback() {
		this.timer = setInterval(() => this.updateTime(),1000);
	}

	disconnectedCallback() {
		clearInterval(this.timer)
	}

}

customElements.define("live-timer", LiveTimer);


/////////////////      task 3     ////////////////////////////

const wordCountTemplate = document.createElement('template')
wordCountTemplate.innerHTML = `
    <style>
      .text-container {
        width: 400px;
        border: 1px solid black;
      }
    </style>
    <button class='countBtn'>Show word count</button>
    <p class='result'>Number of words is: </p>
    <p class='text-container'><slot /></p>
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









