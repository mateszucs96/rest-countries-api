export const state = {
    countries: {},
    filtered: {},
    searched: {},
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
        console.log(state.query)
        return country.name.common.toLowerCase().startsWith(text)
    })
}


export const loadDetails = (e) => {

}
