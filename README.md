
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
3. Get IPv4 address from AWS and replace address in /src/common/config.js
4. Start the development server:
	```sh
	npm start
	```
5. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure
- `src/pages/` — Main pages (Login, Register, Dashboard, Project)
- `src/components/` — Sidebar, Topbar, and shared UI
- `src/services` — API functions containing 
- `src/theme.js` — Enginuity color palette