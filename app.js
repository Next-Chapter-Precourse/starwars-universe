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

async function fetchDataUsingAxios(category) {
  const baseUrl = "https://swapi.dev/api/";
  const url = `${baseUrl}${category}/`;

  // Fetch the data of the category that was clicked, and store it in a variable called 'data'.
  try {
    const response = await axios.get(url);
    const data = await response.data;

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    // Grab the data from the response and store it in a variable called 'data'.You can only consume the data once.
    const responseJSONData = await response.clone().json();
    data = await responseJSONData;
    displayData(data.results);
  } catch (err) {
    (err) => console.error("Fetch failed:", err);
    // Displays error message on page when there is a error getting data.
    document.getElementById("dataDisplay").innerText = "Error loading data.";
  }
}
async function fetchData(category) {
  // TODO: Visit the SWAPI documentation: https://swapi.dev/documentation and find the baseUrl.
  const baseUrl = "https://swapi.dev/api/";
  const url = `${baseUrl}${category}/`;

  try {
    // Fetch the data of the category that was clicked, and store it in a variable called 'data'.
    const response = await fetch(url);
    // Error Handling: If the response is not ok then we throw an error otherwise we continue
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    // Grab the data from the response and store it in a variable called 'data'.You can only consume the data once.
    const responseJSONData = await response.clone().json();
    data = await responseJSONData;
    displayData(data.results);
  } catch (error) {
    // Error handling
    // sends any errors to the console
    console.error("Fetch failed:", error);
    // Displays error message on page when there is a error getting data.
    document.getElementById("dataDisplay").innerText = "Error loading data.";
  }
}

async function displayData(data) {
  const display = document.getElementById("dataDisplay");
  display.innerHTML = ""; // Clear previous data

  for (const item of data) {
    const card = document.createElement("div");
    card.className = "card";

    const cardBody = document.createElement("div");
    cardBody.className = "card-body";

    // Create a title element, choose title based on available data
    const title = document.createElement("h5");
    title.className = "card-title";
    title.textContent = item.name || item.title; // Adjust based on data type (character name, film title, etc.)
    cardBody.appendChild(title);

    // Check if the item is a character
    if (item.name && !item.manufacturer) {
      // Optionally, add more details to the card
      const birthDetails = document.createElement("p");
      birthDetails.className = "card-text";
      birthDetails.textContent = `Birth Year: ${item.birth_year}`;
      cardBody.appendChild(birthDetails);

      const genderDetails = document.createElement("p");
      genderDetails.className = "card-text";
      genderDetails.textContent = `Gender: ${item.gender}`;
      cardBody.appendChild(genderDetails);

      const heightDetails = document.createElement("p");
      heightDetails.className = "card-text";
      heightDetails.textContent = `Height: ${item.height}`;
      cardBody.appendChild(heightDetails);

      const filmDetailsList = document.createElement("ul");
      filmDetailsList.className = "film-details-list";

      const filmPromises = item.films.map(async (filmUrl) => {
        const filmResponse = await fetch(filmUrl);
        const filmData = await filmResponse.json();
        const filmDetails = document.createElement("li");
        filmDetails.className = "card-text";
        filmDetails.textContent = `Episode: ${filmData.episode_id} - ${filmData.title}`;
        return filmDetails;
      });

      const filmDetailsElements = await Promise.all(filmPromises);
      filmDetailsElements.forEach((filmDetails) => {
        filmDetailsList.appendChild(filmDetails);
      });

      const learnMoreButton = document.createElement("button");
      learnMoreButton.textContent = "Learn More";
      learnMoreButton.addEventListener("click", () => {
        const dialog = document.createElement("dialog");
        const closeButton = document.createElement("button");
        closeButton.textContent = "Close";
        closeButton.addEventListener("click", () => {
          dialog.close();
        });
        const additionalDetails = document.createElement("p");
        additionalDetails.className = "card-text";
        additionalDetails.textContent = `Hair Color : ${item.hair_color}`;
        dialog.appendChild(additionalDetails);
        dialog.appendChild(closeButton);
        document.body.appendChild(dialog); // Append the dialog to the document body
        dialog.showModal();
      });

      cardBody.appendChild(filmDetailsList);
      cardBody.appendChild(learnMoreButton);
      card.appendChild(cardBody);
      display.appendChild(card);
    } else if (item.manufacturer) {
      const nameDetails = document.createElement("p");
      nameDetails.className = "card-text";
      nameDetails.textContent = `Name: ${item.name}`;
      cardBody.appendChild(nameDetails);

      const manufacturerDetails = document.createElement("p");
      manufacturerDetails.className = "card-text";
      manufacturerDetails.textContent = `Manufacturer: ${item.manufacturer}`;
      cardBody.appendChild(manufacturerDetails);

      const costDetails = document.createElement("p");
      costDetails.className = "card-text";
      costDetails.textContent = `Cost in Credits: ${item.cost_in_credits}`;
      cardBody.appendChild(costDetails);

      const crewCapacityDetails = document.createElement("p");
      crewCapacityDetails.className = "card-text";
      crewCapacityDetails.textContent = `Crew Capacity: ${item.crew}`;
      cardBody.appendChild(crewCapacityDetails);

      const learnMoreButton = document.createElement("button");
      learnMoreButton.textContent = "Learn More";
      learnMoreButton.addEventListener("click", () => {
        const dialog = document.createElement("dialog");
        const closeButton = document.createElement("button");
        closeButton.textContent = "Close";
        closeButton.addEventListener("click", () => {
          dialog.close();
        });
        const additionalDetails = document.createElement("p");
        additionalDetails.className = "card-text";
        additionalDetails.textContent = `Model: ${item.model}`;
        dialog.appendChild(additionalDetails);
        dialog.appendChild(closeButton);
        document.body.appendChild(dialog); // Append the dialog to the document body
        dialog.showModal();
      });

      card.appendChild(cardBody);
      cardBody.appendChild(learnMoreButton);
      display.appendChild(card);
    } else if (item.title) {
      const details = document.createElement("p");
      details.className = "card-text";
      details.textContent = `Release date is ${item.release_date}`;
      cardBody.appendChild(details);

      const learnMoreButton = document.createElement("button");
      learnMoreButton.textContent = "Learn More";
      learnMoreButton.addEventListener("click", () => {
        const dialog = document.createElement("dialog");
        const closeButton = document.createElement("button");
        closeButton.textContent = "Close";
        closeButton.addEventListener("click", () => {
          dialog.close();
        });

        const additionalDetails = document.createElement("p");
        additionalDetails.className = "card-text";
        additionalDetails.textContent = `Opening Crawl: ${item.opening_crawl}`;
        dialog.appendChild(additionalDetails);
        dialog.appendChild(closeButton);
        document.body.appendChild(dialog); // Append the dialog to the document body
        dialog.showModal();
      });

      card.appendChild(cardBody);
      cardBody.appendChild(learnMoreButton);
      display.appendChild(card);
    }
  }
}
