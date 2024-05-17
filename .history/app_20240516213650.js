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

  for (const item of data) {
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
      let filmTitles = await Promise.all(item.films.map(async (url) => {
        const response = await fetch(url);
        const film = await response.json();
        return film.title;
      }));
      details.textContent = `Name: ${item.name}, Birth Year: ${item.birth_year}, Gender: ${item.gender}, Height: ${item.height}, Films: ${filmTitles.join(', ')}`;
    } else if (category === "films") {
      details.textContent = `Director: ${item.director}, Release Date: ${item.release_date}`;
    } else if (category === "starships") {
      details.textContent = `Model: ${item.model}, Manufacturer: ${item.manufacturer}`;
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

function showModal(item) {
  document.getElementById("modalText").textContent = JSON.stringify(item, null, 2);
  modal.style.display = "block";
}