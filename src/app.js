import * as model from './model.js';
import Countryy from './view.js';

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
    model.state.searched = model.state.countries.filter(country => {
        return country.name.common.toLowerCase().startsWith(value)
    })
    model.state.searched.forEach(country => {

        Countryy.renderCard(country)
    });


}, 350)

const displaySearch = (e) => {
    e.preventDefault();
    // console.log(e.target.value)
    updateDebounceText(e.target.value.toLowerCase())
}

const showSelectt = (value) => {
    console.log(value)
    if (value === 'Filter by Region') return;
    model.state.filtered = model.state.countries.filter(el => el.region.toLowerCase() === value.toLowerCase());
    model.state.filtered.forEach(el => Countryy.renderCard(el));
}

const displayCountryy = async () => {
    await model.fetchData('https://restcountries.com/v3.1/all')
    console.log(model.state.countries)
    model.state.countries.forEach(el => Countryy.renderCard(el));
}

class App {
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

const init = () => {
    Countryy.addHandlerSelect(showSelectt);
    Countryy.addHandlerSearch(displaySearch);
    displayCountryy();
}
init()
const app = new App();