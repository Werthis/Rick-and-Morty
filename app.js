document.addEventListener("DOMContentLoaded", () => {
  const apiUrl = "https://rickandmortyapi.com/api/character";
  const tableBody = document.getElementById("tableBody");
  const paginationControls = document.getElementById("paginationControls");
  const statusFilter = document.getElementById("statusFilter");
  let currentPage = 1;
  let currentStatus = "all";
  statusFilter.value = "all";

  const fetchData = async (page = 1, status) => {
    let url = `${apiUrl}?page=${page}`;
    if (status !== "all") {
      url += `&status=${status}`;
    }
    const response = await fetch(url);
    const data = await response.json();
    return data;
  };

  const renderTableRows = (characters) => {
    tableBody.innerHTML = "";
    characters.forEach((character) => {
      const row = document.createElement("tr");
      row.innerHTML = `
      <td class="w-20 h-20 py-2 px-3 border-b border-r border-gray-300">
        <img class="rounded-full" src="${character.image}" alt="${character.name}">
      </td>
      <td class="sm:w-96 py-2 px-3 border-b border-r border-gray-300">${character.name}</td>
      <td class="w-[82px] py-2 px-2 border-b border-gray-300 text-center">${character.status}</td>
    `;
      tableBody.appendChild(row);
    });
  };

  const renderPagination = (info) => {
    const totalPages = info.pages;
    paginationControls.innerHTML = "";

    const isPageVisible = (page) => {
      return (
        page === 1 || page === totalPages || Math.abs(page - currentPage) <= 2
      );
    };

    const createPageButton = (page) => {
      const pageButton = document.createElement("button");
      const isCurrentPage = page === currentPage;
      const isEllipsis =
        (page === currentPage - 2 || page === currentPage + 2) &&
        page !== 1 &&
        page !== totalPages;

      pageButton.className = `mx-1 px-3 py-1 rounded ${
        isCurrentPage ? "bg-blue-500 text-white" : "bg-gray-200"
      } ${isPageVisible(page) ? "" : "hidden"}`;

      pageButton.innerText = isEllipsis ? "..." : page;

      pageButton.addEventListener("click", () => {
        currentPage = page;
        loadPage(currentPage, currentStatus);
      });

      return pageButton;
    };

    // Use DocumentFragment to minimize reflows
    const fragment = document.createDocumentFragment();

    for (let i = 1; i <= totalPages; i++) {
      const pageButton = createPageButton(i);
      fragment.appendChild(pageButton);
    }

    paginationControls.appendChild(fragment);
  };

  const loadPage = async (page, status) => {
    const data = await fetchData(page, status);
    renderTableRows(data.results);
    renderPagination(data.info);
  };

  statusFilter.addEventListener("change", (event) => {
    currentStatus = event.target.value;
    currentPage = 1;
    loadPage(currentPage, currentStatus);
  });

  loadPage(currentPage, currentStatus);
});
