export const state = {
    countries: {},
    filtered: {},
    searched: {},
    details: {
        result: [],
        nativeName: '',
        languages: '',
        currencies: '',
        borders: [],
    },
    query: '',
}


export const fetchData = async (url, arg = '') => {
    try {
        const res = await fetch(url + arg);
        const data = await res.json();
        state.countries = data
        return data;

    } catch (err) {
        console.error(err)
    }
}

export const loadSearch = text => {
    state.searched = state.countries.filter(country => {
        return country.name.common.toLowerCase().startsWith(text)
    })
}

export const getCurrencies = () => {

    for (const currency of Object.values(state.details.result[0].currencies)) {
        return currency.name
    }
}

export const getNativeName = () => {

    for (const name of Object.entries(state.details.result[0].name.nativeName)) {
        return name[1].official
    }
}

export const getLanguages = () => {
    let languages = [];
    for (const language of Object.values(state.details.result[0].languages)) {
        languages = [...languages, language]
    }
    return languages.splice('').join(', ')
}

export const getBorders = () => {

    state.details.borders = state.details.result[0].borders?.map(el => el)
}

export const getBorderData = () => {
    let bordersData = [];
    state.countries.forEach(el => {

        console.log(state.details.borders.filter(element => element === el.cca3))

    })
}

export const loadDetails = (countryName) => {
    state.details.result = state.countries.filter(el => {
        if (el.name.common === countryName) {
            return el
        }
    })
    state.details.nativeName = getNativeName();
    state.details.currencies = getCurrencies();
    state.details.languages = getLanguages();
    getBorders()
    getBorderData()
}
