class Country {
    data;
    card;

    cards = document.querySelector('.card-container');
    selector = document.querySelector('.countries');
    inputForm = document.querySelector('.input-form');
    detailsSection = document.querySelector('.details-section');

    addHandlerSelect(handler) {
        this.selector.addEventListener('click', () => {
            this.cards.textContent = '';
            handler(this.selector.options[this.selector.selectedIndex].value)
        });
    };

    addHandlerSearch(handler) {
        this.inputForm.addEventListener('input', (e) => {
            this.cards.textContent = '';
            handler(e)
        });
    };

    addHandlerDetails(handler) {
        this.card.forEach(el => el.addEventListener('click', e => {
            const clicked = e.target.closest('.card')
            const countryName = clicked.children[1].children[0].textContent.trim()
            handler(countryName)
        }))
    };

    renderDetails(data) {
        this.data = data[0]
        this.cards.textContent = '';
        let native;
        let languages = []
        for (const name of Object.entries(this.data.name.nativeName)) {
            native = name[1].official
        }
        for (const language of Object.values(this.data.languages)) {

            languages = [...languages, language]
        }
        this.data.borders.forEach(el => console.log(el))
        const html = `
        <button class="details__btn btn">Back</button>

        <div class="country">
            <div class="flag__box">
                <img src="${this.data.flags.svg}" alt="flag">
            </div>

            <h1 class="country__name">
                ${this.data.name.common}
            </h1>
            <div class="country__details">
                <p class="country-label">Native name: <span class="country-data population">${native}</span></p>
                <p class="country-label">Population: <span class="country-data population">${this.data.population}</span></p>
                <p class="country-label">Region: <span class="country-data region">${this.data.region}</span></p>
                <p class="country-label">Sub Region: <span class="country-data capital">${this.data.subregion}</span></p>
                <p class="country-label">Capital: <span class="country-data capital">${this.data.capital}</span></p>
            </div>
            <div class="country__secondary-details">
                <p class="country-label">Top Level Domain: <span class="country-data capital">.de</span></p>
                
                <p class="country-label">Languages: <span class="country-data region">${languages.splice(' ').join(', ')}</span></p>
                <p class="country-label">Boders: <span class="country-data region">${languages.splice(' ').join(', ')}</span></p>
                </div>

            <h4 class="border-countries">
                Boder Countries
            </h4>
            <div class="borders">
                <p>A</p>

            </div>

        </div>
        `
        this.detailsSection.insertAdjacentHTML('beforeend', html);
    };

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
        this.cards.insertAdjacentHTML('beforeend', html);
        this.card = document.querySelectorAll('.card');
    };
};

export default new Country();