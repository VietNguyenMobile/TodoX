## Quick orientation

This repository is a small Todo app split into a Node/Express backend and a (currently-empty or external) frontend directory. The backend lives in `backend/` and uses ES modules (see `backend/package.json` -> `"type": "module`). Key files to inspect when making changes:

- `backend/src/server.js` — express app; mounts routes and listens on port 5001.
- `backend/src/routes/tasksRouters.js` — route definitions for `/api/tasks`.
- `backend/src/controllers/taskControllers.js` — controller functions (currently stubbed with in-memory/sample responses).
- `backend/src/config/db.js` — mongoose connection helper that expects `process.env.MONGO_URI`.
- `backend/src/.env` — local environment variables (contains a MONGO_URI; treat as secret).
- `backend/package.json` — `dev` uses `nodemon`, `start` runs `node src/server.js`.
- Root `package.json` — convenience scripts: `build` installs deps and builds frontend (`--prefix frontend`) and `start` runs backend start.

## Big-picture architecture & data flow

- Backend is an Express API server. All API routes are mounted under the prefix `/api/tasks` (see `server.js` -> `app.use('/api/tasks', tasksRouter)`).
- Controllers currently return static data. There are no Mongoose models in the repo yet; `db.js` provides a connection helper but `server.js` does not call it. If you wire real persistence in, add a `models/` folder, update controllers to use models, and call `connectDB()` from `server.js` before starting the server.
- Frontend is expected under `frontend/`. The root `build` script installs frontend deps and runs the frontend build. If the frontend is developed separately, the backend expects the API to be reachable at `http://localhost:5001/api/tasks` during development.

## Developer workflows (concrete commands)

- Run backend in development:

  cd backend
  npm install
  npm run dev

  This starts nodemon which reloads `backend/src/server.js` on changes. The server logs: "Server is running on port 5001".

- Run backend production/start:

  cd backend
  npm run start

- Build the whole repo (this will install deps for backend and frontend and run frontend build):

  npm run build

## Project-specific conventions & notes for an AI agent

- ES modules only: use `import` / `export` (not CommonJS `require`). Files use `.js` and `export default` / named exports.
- Routes -> Controllers pattern: route files import named controller functions and pass them directly to router methods. Example: `router.get('/', getAllTasks)`.
- Environment handling: `backend/src/config/db.js` expects `process.env.MONGO_URI`. There is a `backend/src/.env` file in the repo — treat it as sensitive. Do not commit real credentials; when modifying the repo remove or rotate secrets.
- Database integration is intentionally incomplete: if you implement persistence, ensure to:
  - add `models/Task.js` (Mongoose schema)
  - update `taskControllers.js` to call Mongoose methods (async/await)
  - import and call `connectDB()` from `server.js` (before listening)

## Examples (use these exact paths in edits)

- API route: GET -> `http://localhost:5001/api/tasks` implemented by `backend/src/routes/tasksRouters.js` -> `backend/src/controllers/taskControllers.js` (`getAllTasks`).
- DB helper: `import { connectDB } from './config/db.js'` and call `await connectDB()` before `app.listen(...)`.

## Integration points & external deps

- MongoDB via Mongoose (`mongoose` is in `backend/package.json`). The project currently contains a DB helper but does not wire it up.
- No test framework is present. There are no CI instruction files in `.github/` yet.

## Guidance for code changes an AI agent might make

- Preserve ES module style. Follow route -> controller separation; controllers should be single-responsibility and return appropriate HTTP codes (current controllers do this for stubs).
- If you add new environment variables, update README or add a `.env.example` (but don't add secrets).
- When adding DB code, add minimal migration: models, updated controllers, and a connect call in `server.js`. Keep startup idempotent and log errors from the DB helper.

## Sensitivity & safety

- `backend/src/.env` contains a Mongo connection string — treat it as a secret. If you commit changes that remove it, replace with `.env.example` and instruct maintainers to set the real value in their environment.

---

If anything here is unclear, tell me which area you'd like expanded (e.g., examples for wiring Mongoose models, recommended folder structure for frontend assets, or a suggested `.env.example`).
