
# Enginuity Cloud Frontend (React)

## Features
- React app with dashboard, projects, files, tags/annotations
- Styled-components for custom Enginuity palette
- Mocked API service for easy backend hookup
- Authentication (login/register) with local state (stubbed)

## Requirements
- Node.js 18+ and npm

## Setup
1. Open a terminal in this `frontend` directory.
2. Install dependencies:
	```sh
	npm install
	```
3. Create a `.env` file (see `.env.example` for required variables).
4. Start the development server:
	```sh
	npm start
	```
5. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Troubleshooting
- If you see a blank page or "Invalid hook call" error:
  - Delete `node_modules` and `package-lock.json`, then run `npm install` again.
  - Ensure only one version of `react`, `react-dom`, and `styled-components` is installed.
- If you change dependencies, always restart the dev server.

## Project Structure
- `src/pages/` — Main pages (Login, Register, Dashboard, Project)
- `src/components/` — Sidebar, Topbar, and shared UI
- `src/services/api.js` — Stubbed API functions (replace with real backend calls later)
- `src/theme.js` — Enginuity color palette

## Customization
- Update the color palette in `src/theme.js` to match your branding.
- Replace stubbed API calls in `src/services/api.js` with real backend integration when ready.

---
For backend/API setup, see the `../backend/README.md` file.
