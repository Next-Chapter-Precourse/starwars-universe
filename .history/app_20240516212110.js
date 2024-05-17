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

function displayData(data, category) {
  const display = document.getElementById("dataDisplay");
  display.innerHTML = ""; // Clear previous data

  data.forEach((item) => {
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
    if (category === "people") {
      details.textContent = `Height: ${item.height}, Mass: ${item.mass}`;
    } else if (category === "films") {
      details.textContent = `Director: ${item.director}, Release Date: ${item.release_date}`;
    } else if (category === "starships") {
      details.textContent = `Model: ${item.model}, Manufacturer: ${item.manufacturer}`;
    }
    cardBody.appendChild(details);

    card.appendChild(cardBody);
    display.appendChild(card);
  });
}