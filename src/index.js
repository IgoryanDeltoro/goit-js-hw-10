import './css/styles.css';
const debounce = require('lodash.debounce');
import API from './fetchCountries';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const DEBOUNCE_DELAY = 300;

const refs = {
  input: document.querySelector('#search-box'),
  otputCountry: document.querySelector('.country-list'),
  outputInfo: document.querySelector('.country-info'),
};

refs.input.addEventListener(
  'input',
  debounce(hendleEventInput, DEBOUNCE_DELAY)
);

function hendleEventInput(eve) {
  const value = eve.target.value.trim();

  if (value !== '') {
    API(value)
      .then(countries => {
        if (countries !== undefined && countries.length >= 10) {
          otputWarningNotification();
          cleanCountryList();
        } else if (countries.length >= 2 && countries.length <= 10) {
          const createHtml = countries
            .map(el => createCountriesList(el))
            .join('');
          cleanCountryInfo();
          refs.otputCountry.innerHTML = createHtml;
        } else if (countries.length === 1) {
          cleanCountryList();
          const createInfo = createInfoOfFindCountry(countries[0]);
          refs.outputInfo.innerHTML = createInfo;
        }
      })
      .catch(otputErrorNotification);
  }

  cleanCountryList();
  cleanCountryInfo();
}

function otputWarningNotification() {
  Notify.info('Too many matches found. Please enter a more specific name.');
}

function otputErrorNotification() {
  Notify.failure('Oops, there is no country with that name');
}

function createCountriesList({ flags, name }) {
  return `<li class='country-item'>
         <img src="${flags.svg}" width="25" height="25"/>
         <p style="font-weight:700; font-size:20px; display:inline;">${name}</p>
         </li> `;
}

function createInfoOfFindCountry({
  name,
  flags,
  capital,
  population,
  languages,
}) {
  return `<ul>
  <li>
  <img src="${flags.svg}" width="25" height="25"/>
  <p style="font-weight:900; font-size:30px; display:inline;">${name}</p>
  </li>
   <li>  
  <p style="font-weight:700; font-size:18px; display:inline;">Capital: <spam>${capital}</spam></p>
  </li>
    <li>  
  <p style="font-weight:700; font-size:18px; display:inline;">Population: <spam>${population}</spam></p>
  </li>
    <li>  
  <p style="font-weight:700; font-size:18px; display:inline;">Languages: <spam>${languages}</spam></p>
  </li>
  </ul>`;
}

function cleanCountryList() {
  refs.otputCountry.innerHTML = '';
}

function cleanCountryInfo() {
  refs.outputInfo.innerHTML = '';
}
