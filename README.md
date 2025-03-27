# Digital Library
The Digital Library Book Management System is a Spring Boot + React (Vite) + MySQL application that allows librarians to efficiently manage books. The system enables adding, updating, searching, and removing books while maintaining their availability status.

Tech Stack
Backend: Java, Spring Boot, MySQL, Spring Data JPA
Frontend: React (Vite), Axios, React Router
Database: MySQL
Deployment: Netlify (Frontend), Render/Railway (Backend), Aiven (Database)

## Project Structure

```
DigitalLibrary/
├── digital_library_backend/    # Spring Boot backend
└── digital-library-frontend/   # React frontend
└── api docs                    # API docs
└── readme.md                   # Setup docs
```

## Prerequisites

- Java 17 or higher
- Node.js 18 or higher
- Maven
- npm or yarn
- Docker (optional, for containerized deployment)

## Backend Setup

1. Navigate to the backend directory:
   ```bash
   cd digital_library_backend
   ```

2. Copy the environment file:
   ```bash
   cp .env.sample .env
   ```

3. Update the `.env` file with your database credentials and other configurations.

4. Build the project:
   ```bash
   ./mvnw clean install
   ```

5. Run the application:
   ```bash
   ./mvnw spring-boot:run
   ```

The backend will be available at `http://localhost:8080`

## Frontend Setup

1. Navigate to the frontend directory:
   ```bash
   cd digital-library-frontend
   ```

2. Copy the environment file:
   ```bash
   cp .env.sample .env
   ```

3. Update the `.env` file with your configurations.

4. Install dependencies:
   ```bash
   npm install
   ```

5. Start the development server:
   ```bash
   npm run dev
   ```

The frontend will be available at `http://localhost:5173`

## Docker Setup

### Backend

1. Build the Docker image:
   ```bash
   cd digital_library_backend
   docker build -t digital-library-backend .
   ```

2. Run the container:
   ```bash
   docker run -p 8080:8080 digital-library-backend
   ```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request
