import { getCountry, getCountryFull } from "./functions.js";

const content = document.querySelector("#content");

const createColCard = (obj) => {
    content.innerHTML = "";
    const colEL = document.createElement("div");
    const cardEl = document.createElement("div");
    cardEl.className = "singlrcountry d-flex justify-content-between shadow align-items-center p-1 m-auto mt-5";
    cardEl.innerHTML = `
        <div class="w-50 ps-3">
            <h2><b>${obj[0].name.common}</b></h2> 
            <h4><b>POP:</b> ${obj[0].population}</h4> 
            <h4><b>Region:</b> ${obj[0].region}</h4> 
            <h4 id="languge"><b>Languages:</b> ${Object.values(obj[0].languages).map((lang) => {
        return `<span> ${lang}</span>`
    })}</h4> 
            <h4><b>Coin:</b> ${Object.keys(obj[0].currencies).map((curr) => {
        return `<span> ${curr},</span>
                    <span> ${obj[0].currencies[curr].name}</span>`
    })}</h4> 
            <h4><b>Capital:</b> ${obj[0].capital}</h4> 
            <h4><b>Bordering countries:</b> ${(obj[0].borders) ? obj[0].borders.map((border) => {
        return `<span class="border-span" data-country="${border}">${border}</span>`;
    })
            : `<span>No bordering countries</span>`}</h4>
        </div>
        <div class="w-50">
            <div class="w-100 p-1">
                <img class="w-100" src="${obj[0].flags.png}" alt="flag"/>
            </div>
        </div>
    `;
    drowMap(holder, obj[0].latlng[0], obj[0].latlng[1]);
    holder.className = "d-flex justify-content-center m-5"
    colEL.append(cardEl);
    colEL.append(holder);
    content.append(colEL);

    const borderSpans = document.querySelectorAll(".border-span");
    borderSpans.forEach(span => {
        span.addEventListener("click", () => {
            const country = span.dataset.country;
            console.log("borderspan" + country);
            render(country);
        });
    });
};

const createCardOptions = (obj) => {
    const colEL = document.createElement("div");
    colEL.className = "col-md-4 p-1";
    const cardEl = document.createElement("div");
    cardEl.className = "card p-1 shadow m-1";
    cardEl.innerHTML = `
        <div class="d-flex justify-content-center align-items-center">
            <img class="w-100 ps-1" src="${obj.flags.png}" alt="flag"/>
        </div>
        <h3>${obj.name.common}</h3> 
    `;
    colEL.append(cardEl);
    cardEl.onclick = () => renderFull(obj.ccn3);
    return colEL;
}

const renderFull = async (countryCode) => {
    const data = await getCountryFull(countryCode);
    content.innerHTML = "";
    content.append(createColCard(data));
};


const render = async (country) => {
    const data = await getCountry(country);
    content.innerHTML = "";
    if (data.name != "AxiosError")
        data.forEach(el => {
            content.append(createCardOptions(el));
        });
    else content.innerHTML = `<h5 style="color:#E2E4DE" class="p-2">Country Not Found</h5>`
};


const searchCountry = (event) => {
    event.preventDefault();
    const country = inputCountry.value;
    render(country);
}

searchForm.addEventListener("submit", searchCountry);

const holder = document.getElementById("map");

function drowMap(holder, lat, lon) {
    const mapEl = document.createElement("div");
    holder.innerHTML = "";
    holder.append(mapEl);
    mapEl.id = `chipopo${Date.now()}`;
    mapEl.className = "map";
    const map = L.map(mapEl.id).setView([`${lat}`, `${lon}`], 13);
    L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
        maxZoom: 12,
        attribution:
            '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
    }).addTo(map);
}

window.render = render;