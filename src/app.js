let countryNames = [];
let value;

const cardss = document.querySelector('.card-container');

const fetchAllCountries = async () => {
    const res = await fetch(`https://restcountries.com/v3.1/all`);
    const data = await res.json();
    return data;
}

const fetchByRegion = async (region) => {
    const res = await fetch(`https://restcountries.com/v3.1/region/${region}`)
    const data = await res.json();
    return data;
}


const fetchBySearch = async (name) => {
    const res = await fetch(`https://restcountries.com/v3.1/name/${name}`)
    const data = await res.json();
    return data;
}

const debounce = (cb, delay) => {
    let timeout;
    return (...args) => {
        clearTimeout(timeout)
        timeout = setTimeout(() => {
            cb(...args)
        }, delay);
    }
}


const updateDebounceText = debounce(async text => {
    value = text;
    const filteredCountries = countryNames.filter(country => {
        return country.startsWith(value)
    })
    if (value) {

        for (const country of filteredCountries) {
            const data = await fetchBySearch(country)
            const parts = data[0].population.toString().split(".");
            parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
            const num = parts.join(".");
            console.log(data[0])

            const html = `
            <div class="card" >
                <div class="card__flag">
                    <img src="${data[0].flags.svg}">
                </div>
                <div class="card__info">
                    <h1 class="card__title">
                        ${data[0].name.common}
                    </h1>
                    <div class="card__details">
                        <p class="info-label">Population: <span class="info-data">${num}</span></p>
                        <p class="info-label">Region: <span class="info-data">${data[0].region}</span></p>
                        <p class="info-label">Capital: <span class="info-data">${data[0].capital}</span></p>
                    </div>
                </div>
            </div >
            `
            cardss.insertAdjacentHTML('beforeend', html)
        }
    }
    if (!value) {
        app.displayCountry();
    }

}, 250)


class App {

    cards = cardss
    selector = document.querySelector('.countries');
    options = document.querySelectorAll('option');
    inputForm = document.querySelector('.input-form');
    input = document.querySelector('.input');

    constructor() {
        this.displayCountry();
        this.selector.addEventListener('change', this.showSelect.bind(this))
        this.inputForm.addEventListener('input', this.displaySearch.bind(this))
    }

    async showSelect() {
        this.cards.textContent = '';
        const selectedCountry = this.selector.options[this.selector.selectedIndex].value
        for (const data of await fetchByRegion(selectedCountry)) {
            const parts = data.population.toString().split(".");
            parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
            const num = parts.join(".");
            console.log(data)

            const html = `
                <div class="card" >
                    <div class="card__flag">
                        <img src="${data.flags.svg}">
                    </div>
                    <div class="card__info">
                        <h1 class="card__title">
                            ${data.name.common}
                        </h1>
                        <div class="card__details">
                            <p class="info-label">Population: <span class="info-data">${num}</span></p>
                            <p class="info-label">Region: <span class="info-data">${data.region}</span></p>
                            <p class="info-label">Capital: <span class="info-data">${data.capital}</span></p>
                        </div>
                    </div>
                </div >
                `
            this.cards.insertAdjacentHTML('beforeend', html)
        }
    }

    async displayCountry() {
        this.cards.textContent = '';
        countryNames = [];
        console.log(countryNames, 'before')
        for (const data of await fetchAllCountries()) {
            countryNames.push(data.name.common.toLowerCase())
            const parts = data.population.toString().split(".");
            parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
            const num = parts.join(".");

            const html = `
                <div class="card" >
                    <div class="card__flag">
                        <img src="${data.flags.svg}">
                    </div>
                    <div class="card__info">
                        <h1 class="card__title">
                            ${data.name.common}
                        </h1>
                        <div class="card__details">
                            <p class="info-label">Population: <span class="info-data">${num}</span></p>
                            <p class="info-label">Region: <span class="info-data">${data.region}</span></p>
                            <p class="info-label">Capital: <span class="info-data">${data.capital}</span></p>
                        </div>
                    </div>
                </div >
                `
            this.cards.insertAdjacentHTML('beforeend', html)
        }
        console.log(countryNames, 'after')
    }
    async displaySearch(e) {
        e.preventDefault();
        this.cards.textContent = '';
        updateDebounceText(e.target.value.toLowerCase())
    }
}

const app = new App();