// Grab each button and add click event.
// When clicked the fetchData should be called to retrieve the data for that specific catagory.
import axios from 'https://cdn.skypack.dev/axios';
let loader;

document.addEventListener('DOMContentLoaded', function () {
  loader = document.querySelector('.loader-container');
  if (loader) {
    loader.style.display = 'none';
  }
});

document.getElementById('characters').addEventListener('click', function () {
  showLoader();
  fetchData('people');
});

document.getElementById('films').addEventListener('click', function () {
  showLoader();
  console.log('loader exists?', loader);
  fetchData('films');
});

document.getElementById('starships').addEventListener('click', function () {
  showLoader();
  fetchData('starships');
});

function showLoader() {
  if (loader) {
    console.log('loading should show');
    loader.style.display = 'flex';
  }
}

function hideLoader() {
  if (loader) {
    console.log('loader shouldnt show');
    loader.style.display = 'none';
  }
}

async function fetchData(category) {
  showLoader();
  // TODO: Visit the SWAPI documentation: https://swapi.dev/documentation and find the baseUrl.
  const baseUrl = 'https://swapi.dev/api/';
  const url = `${baseUrl}${category}/`;
  loader.style.display = 'visible';
  try {
    const response = await axios.get(url);
    const data = response?.data;
    console.log({ data });
    switch (category) {
      case 'people':
        loader.style.display = 'hidden';
        setTimeout(() => {
          displayPeopleData(data.results); // Assuming displayPeopleData is defined elsewhere
        }, 1000);
        break; // Break is important to prevent fall-through
      case 'films':
        console.log('film stuff');
        displayFilmsData(data.results); // Assuming displayFilmsData is defined elsewhere
        break;
      case 'starships':
        console.log('starship activated');
        displayStarshipData(data.results);
        break;
      default:
        console.log('Category not recognized'); // Handle cases where category doesn't match
    }
  } catch (error) {
    console.error('Fetch failed:', error);
    // Adjust the error message based on the Axios error object
    document.getElementById('dataDisplay').innerText = error.response
      ? `Failed to load data: ${error.response.status} ${error.response.statusText}`
      : 'Failed to load data due to network error';
  } finally {
    hideLoader();
  }
}

function displayPeopleData(dataArray) {
  const display = document.getElementById('dataDisplay');
  display.innerHTML = ''; // Clear previous data
  showLoader();
  // Iterate over each item in the dataArray
  dataArray.forEach((data) => {
    // Create the card container
    const card = document.createElement('div');
    card.className = 'card';

    // Create the body of the card
    const cardBody = document.createElement('div');
    cardBody.className = 'card-body';

    // Create a title element with the name
    const title = document.createElement('h3');
    title.className = 'card-title';
    title.textContent = data.name; // Name of the character
    cardBody.appendChild(title);

    // Create and append additional details to the card
    const birthYear = document.createElement('p');
    birthYear.className = 'card-text';
    birthYear.textContent = `Birth Year: ${data.birth_year}`;
    cardBody.appendChild(birthYear);

    const gender = document.createElement('p');
    gender.className = 'card-text';
    gender.textContent = `Gender: ${data.gender}`;
    cardBody.appendChild(gender);

    const height = document.createElement('p');
    height.className = 'card-text';
    height.textContent = `Height: ${data.height} cm`;
    cardBody.appendChild(height);

    const mass = document.createElement('p');
    mass.className = 'card-text';
    mass.textContent = `Mass: ${data.mass} kg`;
    cardBody.appendChild(mass);

    const eyeColor = document.createElement('p');
    eyeColor.className = 'card-text';
    eyeColor.textContent = `Eye Color: ${data.eye_color}`;
    cardBody.appendChild(eyeColor);

    const hairColor = document.createElement('p');
    hairColor.className = 'card-text';
    hairColor.textContent = `Hair Color: ${data.hair_color}`;
    cardBody.appendChild(hairColor);

    // Add the card body to the card, and the card to the display element
    card.appendChild(cardBody);
    display.appendChild(card);
    card.style.marginBottom = '3rem';
  });
  hideLoader();
}

function displayFilmsData(dataArray) {
  const display = document.getElementById('dataDisplay');
  display.innerHTML = ''; // Clear previous data

  // Iterate over each item in the dataArray
  dataArray.forEach((data) => {
    // Create the card container
    const card = document.createElement('div');
    card.className = 'card';

    // Create the body of the card
    const cardBody = document.createElement('div');
    cardBody.className = 'card-body';

    // Create a title element with the film title
    const title = document.createElement('h3');
    title.className = 'card-title';
    title.textContent = data.title; // Title of the film
    cardBody.appendChild(title);

    // Create and append additional details to the card
    const episode = document.createElement('p');
    episode.className = 'card-text';
    episode.textContent = `Episode: ${data.episode_id}`;
    cardBody.appendChild(episode);

    const releaseDate = document.createElement('p');
    releaseDate.className = 'card-text';
    releaseDate.textContent = `Release Date: ${data.release_date}`;
    cardBody.appendChild(releaseDate);

    const director = document.createElement('p');
    director.className = 'card-text';
    director.textContent = `Director: ${data.director}`;
    cardBody.appendChild(director);

    const producer = document.createElement('p');
    producer.className = 'card-text';
    producer.textContent = `Producer: ${data.producer}`;
    cardBody.appendChild(producer);

    const openingCrawl = document.createElement('p');
    openingCrawl.className = 'card-text';
    openingCrawl.textContent = `Opening Crawl: ${data.opening_crawl.substring(
      0,
      150
    )}...`;
    cardBody.appendChild(openingCrawl);

    // Add the card body to the card, and the card to the display element
    card.appendChild(cardBody);
    display.appendChild(card);
    card.style.marginBottom = '2rem';
  });
}

function displayStarshipData(dataArray) {
  const display = document.getElementById('dataDisplay');
  display.innerHTML = ''; // Clear previous data

  // Iterate over each item in the dataArray
  dataArray.forEach((data) => {
    // Create the card container
    const card = document.createElement('div');
    card.className = 'card';

    // Create the body of the card
    const cardBody = document.createElement('div');
    cardBody.className = 'card-body';

    // Create a title element with the name of the starship
    const title = document.createElement('h3');
    title.className = 'card-title';
    title.textContent = data.name;
    cardBody.appendChild(title);

    // Additional starship details
    const model = document.createElement('p');
    model.className = 'card-text';
    model.textContent = `Model: ${data.model}`;
    cardBody.appendChild(model);

    const manufacturer = document.createElement('p');
    manufacturer.className = 'card-text';
    manufacturer.textContent = `Manufacturer: ${data.manufacturer}`;
    cardBody.appendChild(manufacturer);

    const cost = document.createElement('p');
    cost.className = 'card-text';
    cost.textContent = `Cost in credits: ${data.cost_in_credits}`;
    cardBody.appendChild(cost);

    const length = document.createElement('p');
    length.className = 'card-text';
    length.textContent = `Length: ${data.length}`;
    cardBody.appendChild(length);

    const crew = document.createElement('p');
    crew.className = 'card-text';
    crew.textContent = `Crew: ${data.crew}`;
    cardBody.appendChild(crew);

    const passengers = document.createElement('p');
    passengers.className = 'card-text';
    passengers.textContent = `Passengers: ${data.passengers}`;
    cardBody.appendChild(passengers);

    const cargoCapacity = document.createElement('p');
    cargoCapacity.className = 'card-text';
    cargoCapacity.textContent = `Cargo Capacity: ${data.cargo_capacity}`;
    cardBody.appendChild(cargoCapacity);

    const hyperdriveRating = document.createElement('p');
    hyperdriveRating.className = 'card-text';
    hyperdriveRating.textContent = `Hyperdrive Rating: ${data.hyperdrive_rating}`;
    cardBody.appendChild(hyperdriveRating);

    card.appendChild(cardBody);
    display.appendChild(card);
    card.style.marginBottom = '3rem'; // Ensure there is spacing between cards
  });
}
