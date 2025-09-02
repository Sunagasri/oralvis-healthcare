# OralVis Healthcare Web Application

A full-stack web application for dental scan management with role-based authentication.

## Features

- **Role-based Authentication**: Technician and Dentist roles
- **Scan Upload**: Technicians can upload patient scans with details
- **Scan Viewing**: Dentists can view all uploaded scans
- **PDF Reports**: Generate downloadable PDF reports for each scan
- **Responsive Design**: Works on desktop and mobile devices

## Tech Stack

- **Frontend**: React (Vite), HTML, CSS
- **Backend**: Node.js, Express.js
- **Database**: SQLite
- **Authentication**: JWT tokens
- **File Upload**: Multer for handling image uploads
- **PDF Generation**: jsPDF, html2canvas

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/Sunagasri/oralvis-healthcare.git
   cd oralvis-healthcare
   ```

2. Install backend dependencies:
   ```bash
   cd backend
   npm install
   ```

3. Install frontend dependencies:
   ```bash
   cd ../frontend
   npm install
   ```

4. Set up environment variables:
   - Create a `.env` file in the backend directory
   - Add: `JWT_SECRET=your_super_secret_jwt_key_here`

5. Start the development servers:
   - Backend: `cd backend && npm run dev`
   - Frontend: `cd frontend && npm run dev`

## Usage

1. Register accounts with both Technician and Dentist roles
2. Login as a Technician to upload patient scans
3. Login as a Dentist to view all scans and generate PDF reports

## API Endpoints

- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `POST /api/scans` - Upload a scan (Technician only)
- `GET /api/scans` - Get all scans (Dentist only)

## Project Structure

```
oralvis-healthcare/
├── backend/
│   ├── config/
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── uploads/
│   └── server.js
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── context/
│   │   └── services/
│   └── vite.config.js
└── README.md
```
