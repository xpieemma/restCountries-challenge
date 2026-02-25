# [Live demo](https://xpieemma.github.io/restCountries-challenge/)

# Frontend Mentor - REST Countries API with Color Theme Switcher
This is a solution to the REST Countries API with color theme switcher challenge on Frontend Mentor. This project involves fetching data from the REST Countries API to display country information, implementing search and filter functionality, and providing a seamless dark mode experience.

# Table of Contents
## Overview

### The Challenge

### Screenshot

### Links

## My Process

### Built With

### Key Features

### What I Learned



# Overview
## The Challenge
Users should be able to:

* See all countries from the API on the homepage.

* Search for a specific country using an input field.

* Filter countries by region.

* Click on a country to see more detailed information on a separate page.

* Click through to the border countries on the detail page.

* Toggle the color scheme between light and dark mode.



## Live Site URL:(https://xpieemma.github.io/restCountries-challen)]

# My Process
## Built With
### Semantic HTML5 markup

### Tailwind CSS (via CDN) for utility-first styling

### JavaScript (ES6+) for asynchronous data fetching and DOM manipulation

### REST Countries API for real-world data

### Intersection Observer API for lazy loading images

### Flexbox & CSS Grid for responsive layouts

# Key Features
### Dynamic Theme Switching: A robust dark mode implementation that respects user system preferences and persists via localStorage.

### Efficient Filtering: Real-time search with a debounce mechanism to improve performance and a region-based filter.

Smooth Navigation: Handled via window.history.pushState and popstate events to allow users to use the browser's back button between the "Home" and "Detail" views without a full page reload.

Performance Optimization: Flag images are lazy-loaded using the Intersection Observer to ensure fast initial page loads.

Detailed Views: In-depth country statistics including native names, currencies, languages, and clickable border country buttons.

What I Learned
During this project, I focused on managing application "state". I used a centralized ETAT (State) object to keep track of country data and the current view.

I also practiced css trick, such as creating custom animations for a "fade-up" effect when cards load and a "spin-slow" animation for the branding.

When I initially tried to deploy the project on GitHub, I noticed that the live page only rendered the README file when the source was set to the /root directory.

To resolve this, I attempted to change the deployment settings, but the only options available were /root and /docs. Since I couldn't select the specific folder where my code was located, I returned to my local environment and renamed my project folder to docs. However, upon pushing these changes, I realized I had duplicated the folder; the repository then contained two folders with identical content under different names.

Even after this change, the deployment remained broken, still only displaying the README. I returned to my local workstation, ran git add ., and performed a clean commit and push. This successfully deleted the redundant folder and allowed GitHub Pages to correctly read the source code from the /docs directory. Now that the site is live, I've noticed a slight caching issue where it requires two or three refreshes before the full project and styling appear in action.




