



// async function fetchCountry() {
//   try {
//     // const response = await fetch(_.URL);      
//     const response = await fetch("https://restcountries.com/v3.1/all?fields=name,flags,population,region,capital,cca3,borders,subregion,currencies,languages")
//     if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
//     const donnee = await response.json();

//     ETAT.countries = donnee.sort((x, y) =>
//       getCountryName(x).localeCompare(getCountryName(y)),
//     );
//     ETAT.specificCountries = ETAT.countries;
//     provideCountries(ETAT.specificCountries);

//     const hash = window.location.hash.slice(1);
//     if (hash) {
//       const country = ETAT.countries.find((c) => c.cca3 === hash);
//       if (country) {
//         countryDetails(country);
//       }
//     }

//     console.log("Countries loaded", ETAT.countries.length);
//   } catch (err) {
//     DOM.countriesGrid.innerHTML = `<p class = "col-span-full py-12 text-center text-red-500 font-medium"> Error: ${err.message}</p>`;
//   }
// }


async function fetchThemAll() {
  try {
    // API for ALL countries
    const response = await fetch(
      "https://restcountries.com/v3.1/all?fields=name,flags,population,region,capital"
    );

    //  stop here if anything went wrong
    if (!response.ok) {
      throw new Error("Failed to load countries");
    }

    // Convert the response into JavaScript data that I can manipulate
    const countries = await response.json();

    
    // countries.sort((a, b) => a.name.common.localeCompare(b.name.common));

    
    console.log("All countries:", countries);

  } catch (error) {
    console.error("Error fetching countries:", error.message);
  }
}

fetchThemAll();
