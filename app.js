document.addEventListener("DOMContentLoaded", () => {
  const apiUrl = "https://rickandmortyapi.com/api/character";
  const tableBody = document.getElementById("tableBody");
  const paginationControls = document.getElementById("paginationControls");
  let currentPage = 1;

  // Fetch data from API
  const fetchData = async (page = 1) => {
    const response = await fetch(`${apiUrl}?page=${page}`);
    const data = await response.json();
    return data;
  };

  // Render table rows
  const renderTableRows = (characters) => {
    tableBody.innerHTML = "";
    characters.forEach((character) => {
      const row = document.createElement("tr");
      // row.className = 'flex flex-col w-full'
      row.innerHTML = `
      <td class="w-20 h-20 py-2 px-3 border-b border-r border-gray-300">
        <img class="rounded-full" src="${character.image}" alt="${character.name}">
      </td>
      <td class="sm:w-96 py-2 px-3 border-b border-r border-gray-300">${character.name}</td>
      <td class="w-20 py-2 px-2 border-b border-gray-300">${character.status}</td>
    `;
      tableBody.appendChild(row);
    });
  };

  // Create pagination controls
  const renderPagination = (info) => {
    paginationControls.innerHTML = ""; // Clear previous controls
    const totalPages = info.pages;

    for (let i = 1; i <= totalPages; i++) {
      const pageButton = document.createElement("button");
      const isBorderElement = i === 1 || i === totalPages;
      const buttonVisible =
        i === 1 ||
        i === currentPage - 2 ||
        i === currentPage - 1 ||
        i === currentPage ||
        i === currentPage + 1 ||
        i === currentPage + 2 ||
        i === totalPages;

      pageButton.className = `mx-1 px-3 py-1 rounded ${
        i === currentPage ? "bg-blue-500 text-white" : "bg-gray-200"
      } ${buttonVisible ? "" : "hidden"}`;

      pageButton.innerText =
        (i === currentPage - 2 || i === currentPage + 2) &&
        !isBorderElement
          ? "..."
          : i;

      // Add event listener for pagination click
      pageButton.addEventListener("click", () => {
        currentPage = i;
        loadPage(currentPage);
      });

      paginationControls.appendChild(pageButton);
    }
  };

  // Load a specific page
  const loadPage = async (page) => {
    const data = await fetchData(page);
    console.log(data);
    renderTableRows(data.results);
    renderPagination(data.info);
  };

  // Initialize the table and pagination
  loadPage(currentPage);
});
