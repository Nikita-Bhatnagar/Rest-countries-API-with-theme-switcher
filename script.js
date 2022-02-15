const cardsSection = document.querySelector(".cards");
const container = document.querySelector(".container");
const container2 = document.querySelector(".container2");
const errorMsg=document.querySelector(".error-msg");
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
    errorMsg.style.display="none";
    cardsSection.innerHTML = "";
    countries.forEach((country) => {
      const cardMarkup = `<a href="#${
        country.name.common
      }"><div class="card">
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
const options=document.querySelector(".options");
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
  body.classList.toggle("light");
  body.classList.toggle("dark");
}

//filter countries by region
const getFiltered = async function (e) {
  displayLoader();
  try {
    const region = e.target.textContent;
    
    if (region === "All") {
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
options.addEventListener("click", getFiltered);


function toggleRegionList(e){
  options.classList.toggle("display");
  if( filterInput.querySelector("i").classList.contains("fa-angle-right")){
  filterInput.querySelector("i").classList.remove("fa-angle-right");
  filterInput.querySelector("i").classList.add("fa-angle-down");

  }
  else{
    filterInput.querySelector("i").classList.add("fa-angle-right");
  filterInput.querySelector("i").classList.remove("fa-angle-down");
  }
}
filter.addEventListener("click",toggleRegionList);

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
    if(!res.ok){
      errorMsg.style.display="block";
      throw new Error("no countries found!!");
    
    }
    else{
    const data = await res.json();
    hideLoader();
    display(data);
    }
  } catch (err) {
    console.log(err.message);
  }
};
const searchByFullCountryName=async function(e){
  if(e.key==="Enter"){
    const query=e.target.value;
    if(query.trim()!=="")
    {
      displayLoader();
      const res=await fetch(`https://restcountries.com/v3.1/name/${query}?fullText=true`);
      if(!res.ok){
        errorMsg.style.display="block";
      }
      else{
      const data=await res.json();
    
      hideLoader();
      display(data);
      }
    }

  }
}
searchInput.addEventListener("input", searchCountry);
searchInput.addEventListener("keydown",searchByFullCountryName);

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
    const markup = `<div class="container-detail">

<a href="#"><button class="back-btn" type="button">
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
    <div class="border">
      
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
          const nameMarkup = `<a href="#${data[0].name.common}"><span class="box">${data[0].name.common}</span></a>`;
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
