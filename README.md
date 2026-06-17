# Todo List

A simple Todo List web app built with plain HTML, CSS, and vanilla JavaScript — no frameworks, no build step.

## Project structure

| File         | Purpose                                              |
| ------------ | ---------------------------------------------------- |
| `index.html` | Page markup: title, input box, Add button, todo list |
| `style.css`  | Clean, modern styling                                |
| `app.js`     | Application logic (todos array, render, persistence) |

## Running

Open `index.html` directly in a browser, or serve the folder with any static server:

```bash
python3 -m http.server
```

Then visit http://localhost:8000.

## Status

Fully functional. Todos can be added, completed, and deleted, and the list is saved to `localStorage` so it survives page reloads.

## Roadmap

- [x] Add a todo
- [x] Delete a todo
- [x] Mark a todo as complete
- [x] Persist todos in `localStorage`
