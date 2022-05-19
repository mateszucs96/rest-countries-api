export const state = {
    countries: {},
    filtered: {},
    searched: {},
}


export const fetchData = async (url, arg = '') => {
    try {
        const res = await fetch(url + arg);
        const data = await res.json();
        state.countries = data
        console.log(state.countries)
        return data;

    } catch (err) {
        console.error(err)
    }
}
