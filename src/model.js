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
        return data;

    } catch (err) {
        console.error(err)
    }
}

export const loadDetails = (e) => {

}
