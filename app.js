document.addEventListener("DOMContentLoaded", () => {
  function getRickAndMortyData() {
    const apiUrl = "https://rickandmortyapi.com/api/character";

    fetch(apiUrl)
      .then((response) => response.json())
      .then((data) => {
        const results = data.results;
        const tableBody = document
          .getElementById("characterTable")
          .getElementsByTagName("tbody")[0];

        // Loop through the results and create rows
        results.map((character) => {
          const row = document.createElement("tr");
          row.setAttribute("class", "flex flex-row gap-8 ");

          // Name
          const nameCell = document.createElement("td");
          nameCell.textContent = character.name;
          row.appendChild(nameCell);

          // Status
          const statusCell = document.createElement("td");
          statusCell.textContent = character.status;
          row.appendChild(statusCell);

          // Species
          const speciesCell = document.createElement("td");
          speciesCell.textContent = character.species;
          row.appendChild(speciesCell);

          // Gender
          const genderCell = document.createElement("td");
          genderCell.textContent = character.gender;
          row.appendChild(genderCell);

          // Image
          const imageCell = document.createElement("td");
          const image = document.createElement("img");
          image.src = character.image;
          image.alt = `${character.name} image`;
          image.style.width = "50px";
          imageCell.appendChild(image);
          row.appendChild(imageCell);

          // Append row to the table body
          tableBody.appendChild(row);
        });
      })
      .catch((error) => console.error("Error fetching data:", error));
  }

  // Call the function to fetch data and populate the table
  getRickAndMortyData();
});
