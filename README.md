# Todo List

A simple Todo List web app built with plain HTML, CSS, and vanilla JavaScript — no frameworks, no build step.

## Project structure

| File         | Purpose                                              |
| ------------ | ---------------------------------------------------- |
| `index.html` | Page markup: title, input box, Add button, todo list |
| `style.css`  | Clean, modern styling                                |
| `app.js`     | Application logic (scaffold only for now)            |

## Running

Open `index.html` directly in a browser, or serve the folder with any static server:

```bash
python3 -m http.server
```

Then visit http://localhost:8000.

## Status

This is the initial scaffold. The UI is in place; add and delete behavior are not yet implemented.

## Roadmap

- [ ] Add a todo
- [ ] Delete a todo
- [ ] Mark a todo as complete
- [ ] Persist todos in `localStorage`
