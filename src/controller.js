import * as model from './model.js';
import Country from './view.js';


const controlSearch = e => {
    e.preventDefault();
    model.loadSearch(e.target.value.toLowerCase())

    model.state.searched.forEach(country => {
        Country.renderCard(country)
    });
}

const controlSelect = (value) => {
    console.log(value)
    if (value === 'Filter by Region') return;
    model.state.filtered = model.state.countries.filter(el => el.region.toLowerCase() === value.toLowerCase());
    model.state.filtered.forEach(el => Country.renderCard(el));
}

const controlCountries = async () => {
    await model.fetchData('https://restcountries.com/v3.1/all')
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

const init = () => {
    controlCountries();
    Country.addHandlerSelect(controlSelect);
    Country.addHandlerSearch(controlSearch);

}
init();