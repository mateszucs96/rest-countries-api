class Countryy {
    data;
    cards = document.querySelector('.card-container');
    selector = document.querySelector('.countries');
    inputForm = document.querySelector('.input-form');
    constructor(name, flag, population, region, capital) {
        this.name = name;
        this.flag = flag;
        this.population = population;
        this.region = region;
        this.capital = capital;


    }

    addHandlerSelect(handler) {
        this.selector.addEventListener('click', () => {
            this.cards.textContent = '';
            handler(this.selector.options[this.selector.selectedIndex].value)
        });
    }

    addHandlerSearch(handler) {
        this.inputForm.addEventListener('input', (e) => {
            this.cards.textContent = '';
            handler(e)
        })
    }

    renderCard(data) {

        this.data = data
        const html = `
        <div class="card" >
            <div class="card__flag">
                <img src="${this.data.flags.svg}">
            </div>
            <div class="card__info">
                <h1 class="card__title">
                    ${this.data.name.common}
                </h1>
                <div class="card__details">
                    <p class="info-label">Population: <span class="info-data">${this.data.population}</span></p>
                    <p class="info-label">Region: <span class="info-data">${this.data.region}</span></p>
                    <p class="info-label">Capital: <span class="info-data">${this.data.capital}</span></p>
                </div>
            </div>
        </div >
        `

        this.cards.insertAdjacentHTML('beforeend', html)
    }
}

export default new Countryy();