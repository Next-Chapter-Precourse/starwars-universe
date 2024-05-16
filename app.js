// Grab each button and add click event. 
// When clicked the fetchData should be called to retrieve the data for that specific catagory.
document.getElementById("characters").addEventListener("click", function () {
  fetchData("people");
});

document.getElementById("films").addEventListener("click", function () {
  fetchData("films");
});

document.getElementById("starships").addEventListener("click", function () {
   fetchData("starships");// TODO: Fetch the data for the starships category.
});

async function fetchData(category) {
  // TODO: Visit the SWAPI documentation: https://swapi.dev/documentation and find the baseUrl. 
  const baseUrl = "https://swapi.dev/api/";
  const url = `${baseUrl}${category}/`;

  try {
     const response = await fetch(url); // Fetch data from SWAPI
    const data = await response.json(); // Parse JSON response


    // Error Handling: If the response is not ok then we throw an error otherwise we continue
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    // TODO: Next we need create a variable called 'data' and set this to be the parsed JSON data.
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

    const title = document.createElement("h5");
    title.className = "card-title";
    title.textContent = item.name || item.title;
    cardBody.appendChild(title);

    const details = document.createElement("p");
    details.className = "card-text";

    // Additional details based on category
    if (item.gender && item.birth_year) { // Character
      details.textContent = `Gender: ${item.gender}, Birth Year: ${item.birth_year}`;
    } else if (item.director && item.release_date) { // Film
      details.textContent = `Director: ${item.director}, Release Date: ${item.release_date}`;
    } else if (item.model && item.manufacturer) { // Starship
      details.textContent = `Model: ${item.model}, Manufacturer: ${item.manufacturer}`;
    } else {
      details.textContent = "Additional details not available";
    }

    cardBody.appendChild(details);

    card.appendChild(cardBody);
    display.appendChild(card);
  });
}



