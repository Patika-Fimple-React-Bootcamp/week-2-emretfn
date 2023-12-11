const loaderEl = document.querySelector(".loader");
const mainEl = document.querySelector(".main");
const searchInputEl = document.querySelector(".search-input");

// Modal elements
const modalEl = document.querySelector(".modal");
const modalCloseEl = document.querySelector(".modal-close");
const modalCommentsEl = document.querySelector(".modal-comment-list");
const modalLoaderEl = document.querySelector(".modal-loader");
const modalOverlayEl = document.querySelector(".modal-overlay");

let data = [];

// Fetch data
const fetchData = async () => {
  const response = await fetch("https://jsonplaceholder.typicode.com/posts");
  const data = await response.json();
  return data;
};

// Fetch comments for a post
const fetchComments = async (id) => {
  const response = await fetch(`https://jsonplaceholder.typicode.com/posts/${id}/comments`);
  const data = await response.json();
  return data;
};

// Render a card for each item in data
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

  // Open a modal when a card is clicked
  const cards = document.querySelectorAll(".card");
  cards.forEach((card) => {
    card.addEventListener("click", handleCardClick);
  });
};

// Open modal and fetch comments
const handleCardClick = async (e) => {
  handleModalOpen();
  const postId = e.currentTarget.id.split("-")[1];
  const comments = await fetchComments(postId);

  let innerHTML = "";
  comments.forEach((comment) => {
    innerHTML += `
    <li>
      <div class="modal-comment">
        <div class="modal-comment-header">
          <h3 class="modal-comment-name">${comment.name}</h3>
          <span class="modal-comment-email">${comment.email}</span>
        </div>
        <p class="modal-comment-body">${comment.body}</p>
      </div>
    </li>`;
  });
  modalCommentsEl.innerHTML = innerHTML;
  modalLoaderEl.style.display = "none";
  modalCommentsEl.style.display = "flex";
};

// add and remove classes to show and hide modal
const handleModalOpen = () => {
  modalCommentsEl.innerHTML = "";
  modalLoaderEl.style.display = "flex";
  modalCommentsEl.style.display = "none";
  modalEl.classList.add("show");
  document.body.classList.add("no-scroll");
};

const handleModalClose = () => {
  modalEl.classList.remove("show");
  document.body.classList.remove("no-scroll");
};

// Delete a card
const handleDelete = (e) => {
  e.stopPropagation();
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

// Filter data
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
  modalCloseEl.addEventListener("click", handleModalClose);
  modalOverlayEl.addEventListener("click", handleModalClose);
};
init();
