export default function fetchCountries(name) {
  return fetch(
    `https://restcountries.com/v2/name/${name}?fields=capital,name,population,languages,flags`
  ).then(response => {
    if (!response.ok) {
      throw new Error(response.status);
    }
    return response.json();
  });
}
