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
  URL: "https://restcountries.com/v3.1/all",
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
            document.documentElement.classList.remote('dark');
            localStorage.setItem('them', 'light');
        } else {
            document.documentElement.classList.add('dark');
            localStorage.setItem('theme', 'dark');

        }
    });
}

