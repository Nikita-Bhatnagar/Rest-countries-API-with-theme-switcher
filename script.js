const cardsSection = document.querySelector(".cards");
const container = document.querySelector(".container");
const container2 = document.querySelector(".container2");
let theme = "dark";

//get all countries data
function getAll() {
  displayLoader();
  try {
    fetch("https://restcountries.com/v3.1/all")
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        hideLoader();
        display(data);
      });
  } catch (err) {
    console.log(err);
  }
}
window.addEventListener("load", getAll);

//display data
function display(countries) {
  try {
    cardsSection.innerHTML = "";
    countries.forEach((country) => {
      const cardMarkup = `<a href="#${
        country.name.common
      }"><div class="card ${theme}">
        <img src="${country.flags.png}" alt="flag" />
        <h4 class="name">${country.name.common}</h4>
        <div class="info">
          <p>
            <span class="info-heading">Population: </span
            ><span class="info-value">${Intl.NumberFormat("en-US").format(
              country.population
            )}</span>
          </p>
          <p>
            <span class="info-heading">Region: </span
            ><span class="info-value">${country.region}</span>
          </p>
          <p>
            <span class="info-heading">Capital: </span
            ><span class="info-value">${country.capital}</span>
          </p>
        </div>
      </div></a>`;
      cardsSection.insertAdjacentHTML("beforeend", cardMarkup);
    });
  } catch (err) {
    console.log(err);
  }
}

//change theme
const mode = document.querySelector(".mode");
const body = document.querySelector("body");
const navbarWrapper = document.querySelector(".navbar-wrapper");
const moon = document.querySelector(".fa-moon");
const search = document.querySelector(".search");
const searchInput = document.querySelector(".search-input");
const filter = document.querySelector(".filter");
const filterInput = document.querySelector(".filter-input");
let cards;
mode.addEventListener("click", toggleTheme);
function toggleTheme(e) {
  const p = mode.querySelector("p");
  if (p.textContent === "Dark Mode") {
    p.textContent = "Light Mode";
    theme = "light";
  } else {
    p.textContent = "Dark Mode";
    theme = "dark";
  }
  moon.classList.toggle("fas");
  moon.classList.toggle("far");
  body.classList.toggle("dark-bg");
  body.classList.toggle("light-bg");
  navbarWrapper.classList.toggle("dark");
  navbarWrapper.classList.toggle("light");
  search.classList.toggle("dark");
  search.classList.toggle("light");
  searchInput.classList.toggle("dark");
  searchInput.classList.toggle("light");
  filter.classList.toggle("dark");
  filter.classList.toggle("light");
  filterInput.classList.toggle("dark");
  filterInput.classList.toggle("light");
  container2.classList.toggle("dark");
  container2.classList.toggle("light");
  if (document.querySelector(".card")) {
    cards = document.querySelectorAll(".card");
    cards.forEach((card) => {
      card.classList.toggle("dark");
      card.classList.toggle("light");
    });
  }
  if (container2.innerHTML !== "") {
    container2.querySelector(".container-detail").classList.toggle("light");
    container2.querySelector(".container-detail").classList.toggle("dark");
    container2.querySelector(".border").classList.toggle("light");
    container2.querySelector(".border").classList.toggle("dark");
    container2.querySelector(".back-btn").classList.toggle("light");
    container2.querySelector(".back-btn").classList.toggle("dark");
    if (container2.querySelector(".box")) {
      container2.querySelectorAll(".box").forEach((box) => {
        box.classList.toggle("dark");
        box.classList.toggle("light");
      });
    }
  }
}

//filter countries by region
const getFiltered = async function (e) {
  displayLoader();
  try {
    const region = e.currentTarget.value;
    if (region === "all") {
      getAll();
      return;
    }
    const res = await fetch(`https://restcountries.com/v3.1/region/${region}`);
    const filteredCountries = await res.json();
    hideLoader();
    display(filteredCountries);
  } catch (err) {
    console.log(err);
  }
};
filterInput.addEventListener("input", getFiltered);

//search country
const searchCountry = async function (e) {
  displayLoader();
  try {
    const query = e.currentTarget.value;
    if (query.trim() === "") {
      getAll();
      return;
    }
    const res = await fetch(`https://restcountries.com/v3.1/name/${query}`);
    const data = await res.json();
    hideLoader();
    display(data);
  } catch (err) {
    console.log(err);
  }
};
searchInput.addEventListener("input", searchCountry);

//displa detailed data
function displayDetailed(data) {
  try {
    container.style.display = "none";
    container2.innerHTML = "";
    let currStr = [];
    displayLoader();

    for (let key in data[0].currencies) {
      currStr.push(data[0].currencies[key].name);
    }
    currStr = currStr.join(", ");
    const markup = `<div class="container-detail ${theme}">

<a href="#"><button class="back-btn ${theme}" type="button">
  <i class="fas fa-arrow-left"></i>
  Back
</button></a>
<div class="wrapper">
  <div class="img">
    <img src="${data[0].flags.png}" alt="" class="flag-image" />
  </div>

  <div class="details">
    <h2 class="country-name ">${data[0].name.common}</h2>
    <div class="detail-wrapper">
      <div class="col-1">
        <p>
          <span class="info-heading">Native Name: </span
          ><span class="info-value">${
            Object.values(data[0].name.nativeName)[0].official
          }</span>
        </p>
        <p>
          <span class="info-heading">Population: </span
          ><span class="info-value">${data[0].population}</span>
        </p>
        <p>
          <span class="info-heading">Region: </span
          ><span class="info-value">${data[0].region}</span>
        </p>
        <p>
          <span class="info-heading">Sub Region: </span
          ><span class="info-value">${data[0].subregion}</span>
        </p>
        <p>
          <span class="info-heading">Capital: </span
          ><span class="info-value">${data[0].capital[0]}</span>
        </p>
      </div>
      <div class="col-2">
        <p>
          <span class="info-heading">Top Level Domain: </span
          ><span class="info-value">${data[0].tld[0]}</span>
        </p>
        <p>
          <span class="info-heading currency">Currencies: </span
          ><span class="info-value">${currStr}</span>
        </p>
        <p>
          <span class="info-heading language">Languages: </span
          ><span class="info-value">${Object.values(data[0].languages).join(
            ", "
          )}</span>
        </p>
      </div>
    </div>
    <div class="border ${theme}">
      
    </div>
  </div>
</div>
</div>`;

    hideLoader();
    container2.insertAdjacentHTML("beforeend", markup);
  } catch (err) {
    console.log(err);
  }
}
const getCountryFromBorder = function (borders) {
  try {
    const borderDiv = document.querySelector(".border");
    const markup = `<span class="heading">Border Countries:</span>`;
    borderDiv.insertAdjacentHTML("beforeend", markup);

    borders.forEach((border) => {
      fetch(`https://restcountries.com/v3.1/alpha/${border}`)
        .then((res) => res.json())
        .then((data) => {
          const nameMarkup = `<a href="#${data[0].name.common}"><span class="box ${theme}">${data[0].name.common}</span></a>`;
          borderDiv.insertAdjacentHTML("beforeend", nameMarkup);
        });
    });
    hideLoader();
  } catch (err) {
    console.log(err);
  }
};
const getDetails = async function (e) {
  try {
    const countryName = window.location.hash.slice(1);
    if (countryName.trim() === "") {
      container.style.display = "block";
      container2.innerHTML = "";
      return;
    }
    displayLoader();
    const res = await fetch(
      `https://restcountries.com/v3.1/name/${countryName}?fullText=true`
    );
    const data = await res.json();
    displayDetailed(data);
    if (data[0].borders) {
      displayLoader();
      getCountryFromBorder(data[0].borders);
    }
  } catch (err) {
    console.log(err);
  }
};

window.addEventListener("hashchange", getDetails);

//loading spinner
const loader = document.querySelector(".container .loader");
function displayLoader() {
  loader.style.display = "block";
}
function hideLoader() {
  loader.style.display = "none";
}
