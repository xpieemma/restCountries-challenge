const DOM = {
  themeToggle: document.getElementById("theme-toggle"),
  searchInput: document.getElementById("search-input"),
  regionFilter: document.getElementById("region-filter"),
  countriesGrid: document.getElementById("countries-grid"),
  homeView: document.getElementById("home-view"),
  detailView: document.getElementById("detail-view"),
  countryDetails: document.getElementById("country-details"),
  backButton: document.getElementById("back-button"),
  appTitle: document.getElementById("app-title"),
};

const _ = {
  URL: "https://restcountries.com/v3.1/all?fields=name,flags,population,region,capital",
  DELAY: 300,
  DELAY_INCREMENT: 50,
  MAX_DELAY: 1000,
};
//country?.name?.common : if country exist and has name property
const getCountryName = (country) =>
  country?.name?.common || country?.name || "Unknown";

const imageControl = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const img = entry.target;
        img.src = img.dataset.src;
        img.onload = () => img.classList.remove("opacity-0");
        imageControl.unobserve(img);
      }
    });
  },
  { rootMargin: "50px" },
);

const ETAT = {
  countries: [],
  specificCountries: [],
  currentView: "home",
  currentCountry: null,
};

function initTheme(){
    const savedTheme = localStorage.getItem('theme');
    const darkTheme = window.matchMedia('(prefers-color-scheme: dark)').matches;

    if (savedTheme === 'dark' || (!savedTheme && darkTheme)){
        document.documentElement.classList.add('dark');
    } else {
        document.documentElement.classList.remove('dark');
    }
}

function eventListen(){
    DOM.themeToggle.addEventListener('click', () => {
        if (document.documentElement.classList.contains('dark')){
            document.documentElement.classList.remove('dark');
            localStorage.setItem('theme', 'light');
        } else {
            document.documentElement.classList.add('dark');
            localStorage.setItem('theme', 'dark');

        }
    });

    let timeout;
    DOM.searchInput.addEventListener('input', () =>{
        clearTimeout(timeout);
        timeout = setTimeout(filterCountries, _.DELAY);
    });
    DOM.regionFilter.addEventListener('change', filterCountries);
}

async function fetchCountry(){
    try {
        const response = await fetch(_.URL);
        if(!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
        const donnee = await response.json();

        ETAT.countries = donnee.sort((x, y) => 
        getCountryName(x).localeCompare(getCountryName(y)));
        ETAT.specificCountries = ETAT.countries;
        provideCountries(ETAT.specificCountries);

        console.log('Countries loaded', ETAT.countries.length);

    } catch (err){
        DOM.countriesGrid.innerHTML = `<p class = "col-span-full py-12 text-center text-red-500 font-medium"> Error: ${err.message}</p>`;
    }
}

function createCountryCard(country, i){
    const card = document.createElement('article');
    const name = getCountryName(country);
    const capital = Array.isArray(country.capital)? 
    country.capital.join(', ')
    : (country.capital || 'N/A');

    card.className = `group rounded-lg overflow-hidden cursor-pointer shadow-sm transition-all duration-300
        bg-white border border-gray-200 
        dark:bg-gray-800 dark:border-gray-700 
        hover:-translate-y-2 hover:shadow-xl hover:border-blue-400 dark:hover:border-blue-500
        animate-fade-up`;

    card.style.animationDelay =`
    ${Math.min(i*_.DELAY_INCREMENT, _.MAX_DELAY)}
    ms
    `;

    card.innerHTML = `
        <div class="h-40 overflow-hidden border-b border-gray-200 dark:border-gray-700">
            <img data-src="${country.flags.svg || country.flag}" alt="Flag of ${name}" class="lazy w-full h-full object-cover opacity-0 transition-opacity duration-500">
        </div>
        <div class="p-6 pb-8 text-sm text-gray-600 dark:text-gray-300">
            <h2 class="font-display text-lg font-bold mb-4 truncate text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">${name}</h2>
            <p class="mb-1"><strong class="font-semibold text-gray-900 dark:text-white">Population:</strong> ${country.population.toLocaleString()}</p>
            <p class="mb-1"><strong class="font-semibold text-gray-900 dark:text-white">Region:</strong> ${country.region}</p>
            <p><strong class="font-semibold text-gray-900 dark:text-white">Capital:</strong> ${capital}</p>
        </div>`;

        card.addEventListener('click', () => countryDetails(country));
        return card;
}

function provideCountries(countries){
    DOM.countriesGrid.innerHTML = '';

    if (countries.length === 0){
        DOM.countriesGrid.innerHTML = 
        `
        <div class ="col-span-full py-24 text-center"> 
        <p class="text-xl font-medium text-gray-500 dark: text-gray-400">No match to your search</p>
        </div>
        `
        return;
    }
    const fragment = document.createDocumentFragment();
    countries.forEach((country, i)=> {
        const card = createCountryCard(country, i);
        fragment.appendChild(card);
    });
    DOM.countriesGrid.appendChild(fragment);

    document.querySelectorAll('.lazy').forEach(img => imageControl.observe(img));
}

function filterCountries() {
    const searching = DOM.searchInput.value.toLowerCase().trim();
    const regions = DOM.regionFilter.value;
    ETAT.specificCountries = ETAT.countries.filter(country => {
        const searchingMatch = getCountryName(country).toLowerCase().includes(searching);
        const regionMatch = regions === 'all' || country.region === regions;
        return searchingMatch && regionMatch;
    });
    provideCountries(ETAT.specificCountries);
}
function countryDetails(country){
    ETAT.currentView = 'detail';
    ETAT.currentCountry = country;

    console.log("Showing details for: ", getCountryName(country));

    DOM.homeView.classList.add('hidden');
    DOM.detailView.classList.remove('hidden');
    window.scrollTo(0, 0);
}

function homeViews() {
    ETAT.currentView = 'home';
    ETAT.currentCountry = null;
    DOM.homeView.classList.remove('hidden');
}



 initTheme();
 eventListen();
 fetchCountry();
