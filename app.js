// Todo List — application logic
// Step 2: add-todo behavior.
// Delete/complete behavior will be implemented in a later step.

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

  // Build a new list item holding the todo text.
  const item = document.createElement("li");
  item.textContent = text;

  // Append it to the visible todo list.
  list.appendChild(item);

  // Clear the input so it's ready for the next todo.
  input.value = "";
}

function init() {
  // Adding a todo happens on form submit (button click or Enter key).
  form.addEventListener("submit", addTodo);
}

init();
