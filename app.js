// Grab each button and add click event.
// When clicked the fetchData should be called to retrieve the data for that specific catagory.
document.getElementById("characters").addEventListener("click", function () {
  fetchData("people");
});

document.getElementById("films").addEventListener("click", function () {
  fetchData("films");
});

document.getElementById("starships").addEventListener("click", function () {
  // TODO: Fetch the data for the starships category.
  fetchData("starships");
});

async function fetchData(category) {
  // TODO: Visit the SWAPI documentation: https://swapi.dev/documentation and find the baseUrl.
  const baseUrl = "https://swapi.dev/api/";
  const url = `${baseUrl}${category}/`;

  try {
    // TODO: Use url and fetch or axio to get the data from SWAPI. Set this data to called response.
    const response = await fetch(url);

    // Error Handling: If the response is not ok then we throw an error otherwise we continue
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    // TODO: Next we need create a variable called 'data' and set this to be the parsed JSON data.
    const data = await response.json();
    // We can use the .json method on our reponse object to parse our incoming data.
    displayData(data.results);
  } catch (error) { // Error handling
    // sends any errors to the console
    console.error("Fetch failed:", error);
    // Displays error message on page when there is a error getting data.
    document.getElementById("dataDisplay").innerText = "Failed to load data";
  }
}

function displayData(data) {
  const display = document.getElementById("dataDisplay");
  display.innerHTML = ""; // Clear previous data

  data.forEach((item) => {
    const card = document.createElement("div");
    card.className = "card";

    const cardBody = document.createElement("div");
    cardBody.className = "card-body";

    // Create a title element, choose title based on available data
    const title = document.createElement("h5");
    title.className = "card-title";
    title.textContent = item.name || item.title; // Adjust based on data type (character name, film title, etc.)
    cardBody.appendChild(title);

    // Optionally, add more details to the card
    const details = document.createElement("p");
    details.className = "card-text";
    let detailResults = `Birth Year : ${item.birth_year}<br />Gender: ${item.gender}<br />Height: ${item.height}`;
    const filmDetails = `Episode: ${item.episode_id}<br />Director: ${item.director}<br />Release Date: ${item.release_date}<br />${item.opening_crawl}`;
    const starshipDetails = `Model: ${item.model}<br />Manufacturer: ${item.manufacturer}<br /> Credit Costs: ${item.cost_in_credits}<br /> Crew: ${item.crew}`;
    if (item.title) {
      detailResults = filmDetails;
    } else if (item.name && item.model) {
      detailResults = starshipDetails;
    }

    details.innerHTML = detailResults; // Customize this line based on what data you want to show
    cardBody.appendChild(details);

    card.appendChild(cardBody);
    display.appendChild(card);
  });
}

