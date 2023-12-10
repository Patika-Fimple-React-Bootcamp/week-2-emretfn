const loaderEl = document.querySelector(".loader");
const mainEl = document.querySelector(".main");
const searchInputEl = document.querySelector(".search-input");
let data = [];

const fetchData = async () => {
  const response = await fetch("https://jsonplaceholder.typicode.com/posts");
  const data = await response.json();
  return data;
};

const renderData = (data) => {
  //Reset main content
  mainEl.innerHTML = "";
  // Hide loader
  loaderEl.style.display = "none";

  // Render data
  let innerHTML = "";
  data.forEach((item) => {
    innerHTML += `
    <article class="card" id="card-${item.id}">
    <div class="card-header">
      <img src="https://source.unsplash.com/featured/330x330?${item.id}" loading="lazy" />
    </div>
    <div class="card-body">
      <h3 class="card-title">${item.title}</h3>
      <p class="card-description">
        ${item.body}
      </p>
    </div>
    <div class="card-footer">
      <button id="card-${item.id}" class="btn btn-danger delete-button">Delete</button>
    </div>
  </article>`;
  });
  mainEl.innerHTML = innerHTML;

  // Add delete button event listeners
  const deleteButtons = document.querySelectorAll(".delete-button");
  deleteButtons.forEach((button) => {
    button.addEventListener("click", handleDelete);
  });
};

const handleDelete = (e) => {
  // Confirm delete
  const isConfirmed = confirm("Are you sure you want to delete this post?");
  if (isConfirmed) {
    const id = e.target.id;
    const card = document.getElementById(id);
    card.remove();
    const cardId = id.split("-")[1];
    data = data.filter((item) => item.id !== parseInt(cardId));
  }
};

const handleFilter = (e) => {
  const searchTerm = e.target.value.toLowerCase();
  const filteredData = data.filter(
    (item) =>
      item.title.toLowerCase().includes(searchTerm) || item.body.toLowerCase().includes(searchTerm)
  );
  renderData(filteredData);
};

//Closure
const debounce = (fn, delay) => {
  let timeoutId;
  return (...args) => {
    if (timeoutId) clearTimeout(timeoutId);
    timeoutId = setTimeout(() => {
      fn(...args);
    }, delay);
  };
};

const init = async () => {
  data = await fetchData();
  renderData(data);
  searchInputEl.addEventListener("input", debounce(handleFilter, 500));
};
init();
