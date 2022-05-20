import * as model from './model.js';
import Country from './view.js';

let value;


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

        Country.renderCard(country)
    });


}, 350)

const controlSearch = (e) => {
    e.preventDefault();
    // console.log(e.target.value)
    updateDebounceText(e.target.value.toLowerCase())
}

const controlSelect = (value) => {
    console.log(value)
    if (value === 'Filter by Region') return;
    model.state.filtered = model.state.countries.filter(el => el.region.toLowerCase() === value.toLowerCase());
    model.state.filtered.forEach(el => Country.renderCard(el));
}

const controlCountries = async () => {
    await model.fetchData('https://restcountries.com/v3.1/all')
    console.log(model.state.countries)
    model.state.countries.forEach(el => {
        Country.renderCard(el);
    })
    Country.addHandlerDetails(controlDetails);
}

const controlDetails = (countryName) => {
    model.state.countries.forEach(el => {
        if (el.name.common === countryName) {
            console.log(countryName)
            Country.renderDetails(el)
        }
    })
}

// const card = document.querySelectorAll('.card')
// card.forEach

const init = () => {
    controlCountries();
    Country.addHandlerSelect(controlSelect);
    Country.addHandlerSearch(controlSearch);

}
init();