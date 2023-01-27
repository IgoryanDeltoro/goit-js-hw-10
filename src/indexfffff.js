import './css/styles.css';
import { fetchCountries } from './fetchCountries';
const debounce = require('lodash.debounce');
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import templateFunction from './markup/template.hbs';

const refs = {
  input: document.querySelector('#search-box'),
  otputCountry: document.querySelector('.country-list'),
  outputInfo: document.querySelector('.country-info'),
};

const DEBOUNCE_DELAY = 300;

refs.input.addEventListener(
  'input',
  debounce(hendleEventInput, DEBOUNCE_DELAY)
);

// function hendleEventInput(eve) {
//   const value = eve.target.value.trim();

//   if (value !== '') {
//     fetchCountries(value)
//       .then(countries => {
//         // if (countries.length >= 10) {
//         //   Notify.info(
//         //     'Too many matches found. Please enter a more specific name.'
//         //   );
//         // } else if (countries.length >= 2 && countries.length <= 10) {
//         //   renderCountryList(countries);
//         // } else if (countries.length === 1) {
//         //   return countries;
//         // }
//         return countries;
//       })
//       .then(renderFinedCountry)
//       .catch(() => Notify.failure('Oops, there is no country with that name'));
//     return;
//   }
//   refs.otputCountry.innerHTML = '';
// }

// function renderFinedCountry(countries) {
//   console.log(countries);
//   if (countries !== undefined) {
//     const filtredCountry = countries.map(el => templateFunction(el));
//     console.log(filtredCountry);

//     refs.otputCountry.innerHTML = filtredCountry;
//   }
// }

// function renderCountryList(countries) {
//   console.log(countries);
//   if (countries !== undefined) {
//     const filtredCountry = countries
//       .map(el => {
//         return `<li class='country-item'>
//           <img src="${el.flags.svg}" width="20" height="20"/>
//           <p style="font-weight:700px; font-size:18px; display:inline;">${el.name}</p>
//           </li> `;
//       })
//       .join('');

//     refs.otputCountry.innerHTML = filtredCountry;
//   }
// }
