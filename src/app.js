let countryNames = [];
// let value;

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

const debounce = (cb, delay = 500) => {
    return (...args) => {
        setTimeout(() => {
            cb(...args)
        }, delay);
    }
}


class App {

    cards = document.querySelector('.card-container');
    selector = document.querySelector('.countries');
    options = document.querySelectorAll('option');
    inputForm = document.querySelector('.input-form');
    input = document.querySelector('.input');

    constructor() {
        this.displayCountry();
        this.selector.addEventListener('change', this.showSelect.bind(this))
        this.inputForm.addEventListener('keyup', this.displaySearch.bind(this))
    }

    showSelect() {
        const selectedCountry = this.selector.options[this.selector.selectedIndex].value

        fetchByRegion(selectedCountry).then(res => res.forEach(data => {
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
        }))



        this.cards.textContent = '';

    }

    displayCountry() {
        this.cards.textContent = '';
        countryNames = [];
        fetchAllCountries().then(res => res.forEach(data => {
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

        }));

    }
    async displaySearch(e) {
        e.preventDefault();
        const value = this.input.value.toLowerCase()

        // const updateDebounceText = debounce(text => {
        //     console.log(text)
        //     value = text;
        //     console.log(value)
        // })

        // updateDebounceText(this.input.value.toLowerCase())

        const filteredCountries = countryNames.filter(country => {
            return country.startsWith(value)
        })
        if (value) {

            console.log(filteredCountries)



            this.cards.textContent = '';
            filteredCountries.forEach(el => fetchBySearch(el).then(res => res.forEach(data => {
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

            })))
        }
        else {

            this.displayCountry();
        }



        // this.input.value = ''
    }
}

const app = new App();