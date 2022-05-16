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


class App {
    cards = document.querySelector('.card-container');
    selector = document.querySelector('.countries');
    options = document.querySelectorAll('option');

    constructor() {
        this.displayCountry();
        this.selector.addEventListener('change', this.showSelect.bind(this))
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

        fetchAllCountries().then(res => res.forEach(data => {

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

    displaySearch() {

    }
}

const app = new App();