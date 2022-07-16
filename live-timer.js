/*	TASK 2
	We already have <time-formatted> element to show a nicely formatted time.
	Create <live-timer> element to show the current time:

	1.It should use <time-formatted> internally, not duplicate its functionality.
	2.Ticks (updates) every second.
	3.For every tick, a custom event named tick should be generated, with the current date in event.detail
*/

//////////////////////	Code from example	///////////////////////////////
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

class LiveTimer extends HTMLElement {

	constructor() {
		super();
		this.innerHTML = `<time-formatted hour="numeric" minute="numeric" second="numeric"></time-formatted>`;

	}

		
	updateTime() {
		this.date = new Date();
		this.firstChild.setAttribute('datetime', this.date);
		
	}

	connectedCallback() {
		this.timer = setInterval(() => this.updateTime(),1000);
	}

	disconnectedCallback() {
		clearInterval(this.timer)
	}

}

customElements.define("live-timer", LiveTimer);

//trying to get date details 
const detailsElement = document.querySelector('live-timer').firstChild;
console.log(detailsElement)
const tickEvent = new CustomEvent('tick', { detail: document.querySelector('live-timer').firstChild.getAttribute('datetime')});
document.querySelector('live-timer').dispatchEvent(tickEvent);
//console.log(tickEvent)


function getDetails() {
	//function to be triggered on tick event
}

