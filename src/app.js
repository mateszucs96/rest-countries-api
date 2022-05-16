const fetchData = async (name) => {
    const res = await fetch(`https://restcountries.com/v2/name/${name}`);
    const dataArr = await res.json();
    const data = dataArr[0];
    return data;
}

fetchData('hungary')

{/* <div class="card">
        <div class="card__flag">
            <img src="./assets/Flag_of_Germany.svg.png" alt="german-flag" class="flag">
        </div>
        <div class="card__info">
            <h1 class="card__title">
                Germany
            </h1>
            <div class="card__details">
                <p class="info-label">Population: <span class="info-data population">84 000 000</span></p>
                <p class="info-label">Region: <span class="info-data region">Europe</span></p>
                <p class="info-label">Capital: <span class="info-data capital">Berlin</span></p>
            </div>
        </div>
    </div> */}


class App {
    flag = document.querySelector('.flag');
    countryName = document.querySelector('.card__title');
    population = document.querySelector('.population');
    region = document.querySelector('.region');
    capital = document.querySelector('.capital');
    cards = document.querySelectorAll('.card');

    constructor() {

    }

    async displayCountry() {

        const data = await fetchData('hungary');
        this.flag.src = data.flag
        this.countryName.textContent = data.name;
        //modify number to separate with comma
        const parts = data.population.toString().split(".");
        parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        const num = parts.join(".");

        this.population.textContent = num;
        this.region.textContent = data.region;
        this.capital.textContent = data.capital;
        console.log()
    }
}

const app = new App()
app.displayCountry()