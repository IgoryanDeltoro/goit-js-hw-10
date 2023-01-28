import './css/styles.css';
const debounce = require('lodash.debounce');
import API from './fetchCountries';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import countryList from './templates/country-list.hbs';
import countryInfo from './templates/country-info.hbs';
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
        if (countries.length >= 10) {
          otputWarningNotification();
          cleanCountryList();
        } else if (countries.length >= 2 && countries.length <= 10) {
          createCountriesList(countries);
        } else if (countries.length === 1) {
          createInfoOfFindCountry(countries);
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

function createCountriesList(countries) {
  cleanCountryInfo();
  const createHtml = countries.map(el => countryList(el)).join('');
  refs.otputCountry.innerHTML = createHtml;
}

function createInfoOfFindCountry(countries) {
  cleanCountryList();
  const createInfo = countryInfo(countries[0]);
  refs.outputInfo.innerHTML = createInfo;
}

function cleanCountryList() {
  refs.otputCountry.innerHTML = '';
}

function cleanCountryInfo() {
  refs.outputInfo.innerHTML = '';
}
