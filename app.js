// Todo List — application logic
// Step 2: add-todo behavior.
// Step 3: complete (toggle) and delete behavior via event delegation.

// Cache references to the DOM elements we'll work with.
const form = document.getElementById("todo-form");
const input = document.getElementById("todo-input");
const list = document.getElementById("todo-list");

// Create a todo item from the current input and add it to the list.
// Handles both the Add button click and the Enter key, since both
// trigger the form's submit event.
function addTodo(event) {
  // Don't let the form submit and reload the page.
  event.preventDefault();

  // Read the typed text, trimming surrounding whitespace.
  const text = input.value.trim();

  // Ignore empty (or whitespace-only) input.
  if (text === "") {
    return;
  }

  // Build the list item that holds this todo.
  const item = document.createElement("li");
  item.className = "todo-item";

  // The text lives in its own element so toggling/striking it doesn't
  // also affect the Delete button. Clicking it toggles completion.
  const label = document.createElement("span");
  label.className = "todo-text";
  label.textContent = text;

  // Delete button removes the whole todo when clicked.
  const deleteButton = document.createElement("button");
  deleteButton.type = "button";
  deleteButton.className = "delete-button";
  deleteButton.textContent = "Delete";

  // Assemble the item and add it to the visible todo list.
  item.appendChild(label);
  item.appendChild(deleteButton);
  list.appendChild(item);

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

  if (target.classList.contains("delete-button")) {
    // Delete button: remove the entire todo.
    item.remove();
  } else if (target.classList.contains("todo-text")) {
    // Todo text: toggle the completed state (strike-through styling).
    item.classList.toggle("completed");
  }
}

function init() {
  // Adding a todo happens on form submit (button click or Enter key).
  form.addEventListener("submit", addTodo);

  // One delegated listener handles toggling and deleting every todo.
  list.addEventListener("click", handleListClick);
}

init();
