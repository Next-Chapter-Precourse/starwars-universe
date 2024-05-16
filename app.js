document.getElementById("characters").addEventListener("click", function () {
  clearDataDisplay(); // Clear the display area whenever a new category is clicked
  fetchData("people");
});

document.getElementById("films").addEventListener("click", function () {
  clearDataDisplay(); // Clear the display area whenever a new category is clicked
  fetchData("films");
});

document.getElementById("starships").addEventListener("click", function () {
  clearDataDisplay(); // Clear the display area whenever a new category is clicked
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
    displayData(data.results);
  } catch (error) {
    console.error("Fetch failed:", error);
    document.getElementById("dataDisplay").innerText = "Failed to load data";
  }
}

function displayData(data) {
  const display = document.getElementById("dataDisplay");
  display.innerHTML = ""; // Ensure the display is cleared before adding new data

  data.forEach((item) => {
    const card = document.createElement("div");
    card.className = "card";

    const cardBody = document.createElement("div");
    cardBody.className = "card-body";

    const title = document.createElement("h5");
    title.className = "card-title";
    title.textContent = item.name || item.title || 'N/A'; // Improved null handling

    const details = document.createElement("p");
    details.className = "card-text";

    // Dynamically display details based on category
    if (item.release_date) {
      details.textContent = `Released on: ${item.release_date}`;
    } else if (item.manufacturer) {
      details.textContent = `Manufacturer: ${item.manufacturer}`;
    } else {
      details.textContent = "Additional details not available.";
    }

    cardBody.appendChild(title);
    cardBody.appendChild(details);

    card.appendChild(cardBody);
    display.appendChild(card);
  });
}

function clearDataDisplay() {
  const display = document.getElementById("dataDisplay");
  display.innerHTML = "";
}
