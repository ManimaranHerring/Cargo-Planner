# Cargo Planner (Backend + Frontend)

This project contains:

- **backend/** – Node.js + Express + Prisma + SQLite
- **frontend/** – React + Vite

Current features (MVP):

- Cargo Management: add and list cargo
- Backend API at `http://localhost:4000/api`
- Frontend app at `http://localhost:5173`

## How to run locally

1. Download this repository as ZIP from GitHub and extract.
2. Install Node.js (>= 18).
3. Open a terminal in the `backend` folder and run:

   ```bash
   npm install
   npm run prisma:migrate
   npm run dev
