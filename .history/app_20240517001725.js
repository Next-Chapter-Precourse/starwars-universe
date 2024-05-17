// Grab each button and add click event. 
// When clicked the fetchData should be called to retrieve the data for that specific category.
document.getElementById("fetchCharacters").addEventListener("click", function () {
  fetchData("people");
});

document.getElementById("films").addEventListener("click", function () {
  fetchData("films");
});

document.getElementById("starships").addEventListener("click", function () {
  fetchData("starships");
});

async function fetchData(category) {
  const baseUrl = "https://swapi.dev/api/";
  const url = `${baseUrl}${category}/`;

  try {
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    const data = await response.json();
    displayData(data.results, category);
  } catch (error) {
    console.error("Fetch failed:", error);
    document.getElementById("dataDisplay").innerText = "Failed to load data";
  }
}

async function displayData(data, category) {
  const display = document.getElementById("dataDisplay");
  display.innerHTML = ""; // Clear previous data

  for (let i = 0; i < data.length; i++) {
    const item = data[i];
    const card = document.createElement("div");
    card.className = "card";

    const cardBody = document.createElement("div");
    cardBody.className = "card-body";

    const title = document.createElement("h5");
    title.className = "card-title";
    title.textContent = item.name || item.title;
    cardBody.appendChild(title);

    const details = document.createElement("p");
    details.className = "card-text";
    if (category === "films") {
      details.textContent = `Title: ${item.title}, Episode: ${item.episode_id}, Director: ${item.director}, Release Date: ${item.release_date}, Opening Crawl: ${item.opening_crawl}`;

      const img = document.createElement("img");
      img.src = "images/film.jpg"; // Add the local file path
      img.alt = "Film Icon";
      img.style.width = "100px"; // Set the width of the image
      img.style.height = "100px"; // Set the height of the image
      details.appendChild(img);
      cardBody.appendChild(img);
    }
    if (category === "starships") {
      details.textContent = `Name: ${item.name}, Model: ${item.model}, Manufacturer: ${item.manufacturer}, Cost in Credits: ${item.cost_in_credits}, Crew Capacity: ${item.crew}`;

      const img = document.createElement("img");
      img.src = "images/spaceship.jpg"; // Changed from URL to local file path
      img.alt = "Starship Icon";
      img.style.width = "100px"; // Set the width of the image
      img.style.height = "100px"; // Set the height of the image
      details.appendChild(img);
      cardBody.appendChild(img);
    }
    if (category === "people") {
      let filmTitles = await Promise.all(item.films.map(async (url) => {
        const response = await fetch(url);
        const film = await response.json();
        return film.title;
      }));
      details.textContent = `Name: ${item.name}, Birth Year: ${item.birth_year}, Gender: ${item.gender}, Height: ${item.height}, Films: ${filmTitles.join(', ')}`;
      const img = document.createElement("img");
      img.src = "Images/character.jpg"; // Add the local file path
      img.alt = "Character Icon";
      img.style.width = "100px"; // Set the width of the image
      img.style.height = "100px"; // Set the height of the image
      details.appendChild(img);
      cardBody.appendChild(img);
    }
    } else if (category === "films") {
      details.textContent = `Title: ${item.title}, Episode: ${item.episode_id}, Director: ${item.director}, Release Date: ${item.release_date}, Opening Crawl: ${item.opening_crawl}`;
      const img = document.createElement("img");
    } else if (category === "starships") {
      details.textContent = `Name: ${item.name}, Model: ${item.model}, Manufacturer: ${item.manufacturer}, Cost in Credits: ${item.cost_in_credits}, Crew Capacity: ${item.crew}`;
    }
    cardBody.appendChild(details);

    const learnMore = document.createElement("button");
    learnMore.textContent = "Learn More";
    learnMore.addEventListener("click", function () {
      showModal(item);
    });
    cardBody.appendChild(learnMore);

    card.appendChild(cardBody);
    display.appendChild(card);
  }
}

var modal = document.getElementById("myModal");
var span = document.getElementsByClassName("close")[0];

span.onclick = function() {
  modal.style.display = "none";
}

window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}

async function showModal(item) {
  // Fetch film titles
  if (item.films) {
    const filmPromises = item.films.map(url => fetch(url).then(res => res.json()));
    const films = await Promise.all(filmPromises);
    item.films = films.map(film => film.title);
  }

  // Fetch homeworld
  if (item.homeworld) {
    const homeworld = await fetch(item.homeworld).then(res => res.json());
    item.homeworld = homeworld.name;
  }

  // Fetch species
  if (item.species) {
    const speciesPromises = item.species.map(url => fetch(url).then(res => res.json()));
    const species = await Promise.all(speciesPromises);
    item.species = species.map(species => species.name);
  }

  // Fetch vehicles
  if (item.vehicles) {
    const vehiclePromises = item.vehicles.map(url => fetch(url).then(res => res.json()));
    const vehicles = await Promise.all(vehiclePromises);
    item.vehicles = vehicles.map(vehicle => vehicle.name);
  }

  // Fetch character names
  if (item.characters) {
    const characterPromises = item.characters.map(url => fetch(url).then(res => res.json()));
    const characters = await Promise.all(characterPromises);
    item.characters = characters.map(character => character.name);
  }

  // Fetch planet names
  if (item.planets) {
    const planetPromises = item.planets.map(url => fetch(url).then(res => res.json()));
    const planets = await Promise.all(planetPromises);
    item.planets = planets.map(planet => planet.name);
  }

  // Fetch starships
  if (item.starships) {
    const starshipPromises = item.starships.map(url => fetch(url).then(res => res.json()));
    const starships = await Promise.all(starshipPromises);
    item.starships = starships.map(starship => ({
      name: starship.name,
      model: starship.model,
      starshipClass: starship.starship_class,
      manufacturer: starship.manufacturer,
      costInCredits: starship.cost_in_credits,
      length: starship.length,
      crew: starship.crew,
      passengers: starship.passengers,
      maxAtmospheringSpeed: starship.max_atmosphering_speed,
      hyperdriveRating: starship.hyperdrive_rating,
      MGLT: starship.MGLT,
      cargoCapacity: starship.cargo_capacity,
      consumables: starship.consumables,
      films: starship.films.map(url => url.split('/').slice(-2, -1)[0]), // Replace film URLs with IDs
      pilots: starship.pilots.map(url => url.split('/').slice(-2, -1)[0]), // Replace pilot URLs with IDs
      created: new Date(starship.created).toLocaleString(),
      edited: new Date(starship.edited).toLocaleString(),
      picture: 'images/spaceship.jpg', // Changed from URL to local file path
    }));
  }

  // Display the item in a modal
  const modalText = document.getElementById("modalText");
  modalText.textContent = JSON.stringify(item, null, 2);

  // If the item is a starship, display its picture
  if (item.starships) {
    const picture = document.createElement('img');
    picture.src = item.starships[0].picture; // This will now load the local file
    picture.alt = 'Starship Picture';
    modalText.appendChild(picture);
  }
  delete item.url; // Remove the URL field

  document.getElementById("modalText").textContent = JSON.stringify(item, null, 2);
  modal.style.display = "block";
}