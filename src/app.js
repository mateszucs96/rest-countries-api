
let countryNames = [];
let countries = [];
let value;


const fetchData = async (url, arg = '') => {
    try {
        const res = await fetch(url + arg);
        const data = await res.json();
        return data;

    } catch (err) {
        console.error(err)
    }
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

            const data = await fetchData(`https://restcountries.com/v3.1/name/`, country)
            const parts = data[0].population.toString().split(".");
            parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
            const num = parts.join(".");
            console.log(data[0])
            const countries = new Country(data[0].name.common, data[0].flags.svg, num, data[0].region, data[0].capital)
            countries.renderCard()
        }
    }
    if (!value) {
        app.displayCountry();
    }

}, 350)


class Country {
    cards = document.querySelector('.card-container');

    constructor(name, flag, population, region, capital) {
        this.name = name;
        this.flag = flag;
        this.population = population;
        this.region = region;
        this.capital = capital;


    }

    renderCard() {
        const html = `
        <div class="card" >
            <div class="card__flag">
                <img src="${this.flag}">
            </div>
            <div class="card__info">
                <h1 class="card__title">
                    ${this.name}
                </h1>
                <div class="card__details">
                    <p class="info-label">Population: <span class="info-data">${this.population}</span></p>
                    <p class="info-label">Region: <span class="info-data">${this.region}</span></p>
                    <p class="info-label">Capital: <span class="info-data">${this.capital}</span></p>
                </div>
            </div>
        </div >
        `
        this.cards.insertAdjacentHTML('beforeend', html)
    }
}


class App {

    cards = document.querySelector('.card-container');
    selector = document.querySelector('.countries');
    options = document.querySelectorAll('option');
    inputForm = document.querySelector('.input-form');
    input = document.querySelector('.input');
    detailsSection = document.querySelector('.details-section');

    constructor() {
        this.displayCountry();
        this.selector.addEventListener('change', this.showSelect.bind(this))
        this.inputForm.addEventListener('input', this.displaySearch.bind(this))
    }

    async showSelect() {
        this.cards.textContent = '';
        const selectedCountry = this.selector.options[this.selector.selectedIndex].value
        for (const data of await fetchData(`https://restcountries.com/v3.1/region/`, selectedCountry)) {
            const parts = data.population.toString().split(".");
            parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
            const num = parts.join(".");
            console.log(data)
            const country = new Country(data.name.common, data.flags.svg, num, data.region, data.capital)
            country.renderCard()
        }

    }

    async displayCountry() {
        this.cards.textContent = '';
        countryNames = [];
        console.log(countryNames, 'before')
        for (const data of await fetchData(`https://restcountries.com/v3.1/all`)) {
            countryNames.push(data.name.common.toLowerCase())
            const parts = data.population.toString().split(".");
            parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
            const num = parts.join(".");
            const country = new Country(data.name.common, data.flags.svg, num, data.region, data.capital)
            countries.push(country);
            country.renderCard()
        }
        const card = document.querySelectorAll('.card')

        card.forEach((el, i) => el.addEventListener('click', this.displayDetails.bind(this)))
        // countries.forEach((el, i) => console.log(el.name, i))
    }
    async displaySearch(e) {
        e.preventDefault();
        this.cards.textContent = '';
        updateDebounceText(e.target.value.toLowerCase())
    }

    async displayDetails(e) {
        this.cards.textContent = '';
        const clicked = e.target.closest('.card')
        const countryName = clicked.children[1].children[0].textContent.trim()

        const dataArr = await fetchData(`https://restcountries.com/v3.1/name/`, countryName);
        const data = dataArr[0]
        console.log(data.languages)

        let currencies;
        let native

        for (const curr of Object.entries(data.currencies)) {
            currencies = curr[1].name
        }

        for (const name of Object.entries(data.name.nativeName)) {
            native = name[1].official
        }
        const html = `
        <button class="details__btn btn">Back</button>

        <div class="country">
            <div class="flag__box">
                <img src="${data.flags.svg}" alt="flag">
            </div>

            <h1 class="country__name">
                ${data.name.common}
            </h1>
            <div class="country__details">
                <p class="country-label">Native Name: <span class="country-data capital">${native}</span></p>
                <p class="country-label">Population: <span class="country-data population">${data.population}</span></p>
                <p class="country-label">Region: <span class="country-data region">${data.region}</span></p>
                <p class="country-label">Sub Region: <span class="country-data capital">${data.subregion}</span></p>
                <p class="country-label">Capital: <span class="country-data capital">${data.capital}</span></p>
            </div>
            <div class="country__secondary-details">
                <p class="country-label">Top Level Domain: <span class="country-data capital">.de</span></p>
                <p class="country-label">Currencies: <span class="country-data population">${currencies}</span></p>
                <p class="country-label">Languages: <span class="country-data region">Europe, French</span></p>
            </div>

            <h4 class="border-countries">
                Boder Countries
            </h4>
            <div class="borders">
                <p>A</p>

            </div>

        </div>
        `
        this.detailsSection.insertAdjacentHTML('beforeend', html)
    }
}

const app = new App();