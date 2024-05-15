// Grab each button and add click event.
// When clicked the fetchData should be called to retrieve the data for that specific catagory.
document.getElementById("characters").addEventListener("click", function () {
  fetchData("people");
});

document.getElementById("films").addEventListener("click", function () {
  fetchData("films");
});

document.getElementById("starships").addEventListener("click", function () {
  fetchData("starships");
});

async function fetchData(category) {
  // TODO: Visit the SWAPI documentation: https://swapi.dev/documentation and find the baseUrl.
  const baseUrl = "https://swapi.dev/api/";
  const url = `${baseUrl}${category}/`;

  try {
    const response = await axios.get(url);
    const data = response.data;
    if (response.status !== 200) {
      throw new Error("Network response was not ok");
    }
    displayData(data.results);
  } catch (error) {
    console.error("Fetch failed:", error);
    // Displays error message on page when there is a error getting data.
    document.getElementById("dataDisplay").innerText = "Failed to load data";
  }
}

function displayData(data) {
  console.log("inside display function", data);
  const display = document.getElementById("dataDisplay");
  display.innerHTML = ""; // Clear previous data

  data.forEach((item) => {
    const isStarship = item.model != undefined;
    const isFilm = item.episode_id != undefined;
    const isCharacter = item.height != undefined;
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

    if (isCharacter) {
      const details = document.createElement("p");
      details.className = "card-text";
      details.textContent = `Gender: ${item.gender}`;
      const details2 = document.createElement("p");
      details2.className = "card-text";
      details2.textContent = `Hair color: ${item.hair_color}`;
      const details3 = document.createElement("p");
      details3.className = "card-text";
      details3.textContent = `Skin color: ${item.skin_color}`;
      cardBody.append(details, details2, details3);
    }

    if (isFilm) {
      const details = document.createElement("p");
      details.className = "card-text";
      details.textContent = `Director: ${item.director}`;
      const details2 = document.createElement("p");
      details2.className = "card-text";
      details2.textContent = `Opening crawl: ${item.opening_crawl}`;
      const details3 = document.createElement("p");
      details3.className = "card-text";
      details3.textContent = `Release date: ${item.release_date}`;
      cardBody.append(details, details2, details3);
    }

    if (isStarship) {
      const details = document.createElement("p");
      details.className = "card-text";
      details.textContent = `Model: ${item.model}`;
      const details2 = document.createElement("p");
      details2.className = "card-text";
      details2.textContent = `Manufacturer: ${item.manufacturer}`;
      const details3 = document.createElement("p");
      details3.className = "card-text";
      details3.textContent = `Number of passengers: ${item.passengers}`;
      const details4 = document.createElement("p");
      details4.className = "card-text";
      details4.textContent = `Max speed: ${item.max_atmosphering_speed}`;
      cardBody.append(details, details2, details3, details4);
    }

    card.appendChild(cardBody);
    display.appendChild(card);
  });
}
