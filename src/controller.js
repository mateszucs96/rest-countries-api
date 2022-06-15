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

    model.loadDetails(countryName, model.state.details.nativeName)
    Country.renderDetails(
        model.state.details.result,
        model.state.details.nativeName,
        model.state.details.currencies,
        model.state.details.languages,
        model.state.details.borderData,
    );
    Country.addHandlerBackButton(controlCountries)
    Country.addHandlerButton(contorlBorders)
}

const contorlBorders = (countryName) => {
    model.loadDetails(countryName, model.state.details.nativeName)
    Country.renderDetails(
        model.state.details.result,
        model.state.details.nativeName,
        model.state.details.currencies,
        model.state.details.languages,
        model.state.details.borderData,
    );
    Country.addHandlerBackButton(controlCountries)
    Country.addHandlerButton(contorlBorders)
}

const init = () => {
    controlCountries();
    Country.addHandlerSelect(controlSelect);
    Country.addHandlerSearch(controlSearch);

}
init();
