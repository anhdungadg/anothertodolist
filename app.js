// Todo List — application logic
// Step 2: add-todo behavior.
// Step 3: complete (toggle) and delete behavior via event delegation.
// Step 4: localStorage persistence with a todos array as the source of truth.
// Step 5: filter view (All / Active / Completed) applied at render time.

// Cache references to the DOM elements we'll work with.
const form = document.getElementById("todo-form");
const input = document.getElementById("todo-input");
const list = document.getElementById("todo-list");
const filters = document.getElementById("filters");

// Key under which the todo list is stored in localStorage.
const STORAGE_KEY = "todos";

// The single source of truth: an array of todo objects, each shaped like
// { text: string, completed: boolean }. The DOM is always rebuilt from
// this array, never edited directly, so the two can't drift apart.
let todos = [];

// Which todos are currently visible. One of "all", "active", or "completed".
// This is view-only state — it never changes the todos array itself, only
// which entries render() chooses to display.
let currentFilter = "all";

// Load any previously saved todos from localStorage. Returns an array;
// falls back to an empty list if nothing is saved or the data is corrupt.
function loadTodos() {
  const saved = localStorage.getItem(STORAGE_KEY);
  if (!saved) {
    return [];
  }

  try {
    const parsed = JSON.parse(saved);
    // Guard against malformed data (e.g. someone edited localStorage).
    return Array.isArray(parsed) ? parsed : [];
  } catch (error) {
    // If the stored value isn't valid JSON, start fresh rather than crash.
    return [];
  }
}

// Persist the current todos array to localStorage. Called on every change.
function saveTodos() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(todos));
}

// Rebuild the visible list from the todos array. This is the only place
// that writes to the DOM, so the UI always mirrors our data exactly.
function render() {
  // Clear out whatever was rendered before.
  list.innerHTML = "";

  todos.forEach(function (todo, index) {
    // Apply the current filter: skip any todo that doesn't match. We still
    // iterate the full array so `index` stays aligned with the source of
    // truth — that's what click handling maps back to.
    if (currentFilter === "active" && todo.completed) {
      return;
    }
    if (currentFilter === "completed" && !todo.completed) {
      return;
    }

    // Build the list item that holds this todo.
    const item = document.createElement("li");
    item.className = "todo-item";
    if (todo.completed) {
      item.classList.add("completed");
    }
    // Remember which todo this element represents so click handling can
    // map a DOM event back to an entry in the array.
    item.dataset.index = index;

    // The text lives in its own element so toggling/striking it doesn't
    // also affect the Delete button. Clicking it toggles completion.
    const label = document.createElement("span");
    label.className = "todo-text";
    label.textContent = todo.text;

    // Delete button removes the whole todo when clicked.
    const deleteButton = document.createElement("button");
    deleteButton.type = "button";
    deleteButton.className = "delete-button";
    deleteButton.textContent = "Delete";

    // Assemble the item and add it to the visible todo list.
    item.appendChild(label);
    item.appendChild(deleteButton);
    list.appendChild(item);
  });
}

// Add a todo from the current input. Handles both the Add button click
// and the Enter key, since both trigger the form's submit event.
function addTodo(event) {
  // Don't let the form submit and reload the page.
  event.preventDefault();

  // Read the typed text, trimming surrounding whitespace.
  const text = input.value.trim();

  // Ignore empty (or whitespace-only) input.
  if (text === "") {
    return;
  }

  // Update the source of truth, persist, then re-render.
  todos.push({ text: text, completed: false });
  saveTodos();
  render();

  // Clear the input so it's ready for the next todo.
  input.value = "";
}

// Handle clicks anywhere in the list using event delegation: a single
// listener on the <ul> covers every current and future todo, so we
// don't have to wire up listeners on each item as it's created.
function handleListClick(event) {
  const target = event.target;

  // Find the todo <li> the click happened inside (if any).
  const item = target.closest(".todo-item");
  if (!item) {
    return;
  }

  // Map the clicked element back to its entry in the todos array.
  const index = Number(item.dataset.index);

  if (target.classList.contains("delete-button")) {
    // Delete button: remove the entire todo.
    todos.splice(index, 1);
  } else if (target.classList.contains("todo-text")) {
    // Todo text: toggle the completed state (strike-through styling).
    todos[index].completed = !todos[index].completed;
  } else {
    // Click landed on the item but not an actionable part; ignore it.
    return;
  }

  // Persist the change and re-render from the updated array.
  saveTodos();
  render();
}

// Handle clicks on the filter buttons. Updates currentFilter, moves the
// "active" highlight to the clicked button, and re-renders the list.
function handleFilterClick(event) {
  const button = event.target.closest(".filter-button");
  if (!button) {
    return;
  }

  // Switch the view to the clicked button's filter.
  currentFilter = button.dataset.filter;

  // Highlight only the selected button.
  filters.querySelectorAll(".filter-button").forEach(function (btn) {
    btn.classList.toggle("active", btn === button);
  });

  // Re-render so only matching todos show.
  render();
}

function init() {
  // Load saved todos and render them before wiring up interactions.
  todos = loadTodos();
  render();

  // Adding a todo happens on form submit (button click or Enter key).
  form.addEventListener("submit", addTodo);

  // One delegated listener handles toggling and deleting every todo.
  list.addEventListener("click", handleListClick);

  // One delegated listener handles all three filter buttons.
  filters.addEventListener("click", handleFilterClick);
}

init();
