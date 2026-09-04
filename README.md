# TaskFlow – Full-Stack Todo Application

TaskFlow is a full-stack Todo management application built with React and Django REST Framework. It provides secure JWT-based authentication and allows users to create, manage, search, filter, update, and delete their tasks through a responsive web interface.

## 🚀 Live Demo

**Frontend:**  
https://task-flow-full-stack-sepia.vercel.app

**Backend API:**  
https://taskflow-fullstack-dzbd.onrender.com

## 📌 Features

- User registration and login
- JWT-based authentication
- Automatic access-token refresh
- Protected routes
- Create, read, update and delete todos
- Mark todos as completed
- Edit existing todos
- Task descriptions
- Task priorities
- Due dates
- Search todos
- Filter todos
- Sort todos
- Todo statistics
- Responsive UI
- RESTful API architecture
- PostgreSQL database in production

## 🛠️ Tech Stack

### Frontend
- React
- JavaScript
- Vite
- Tailwind CSS
- React Router
- Fetch API

### Backend
- Python
- Django
- Django REST Framework
- Simple JWT
- PostgreSQL
- SQLite for local development

### Tools & Deployment
- Git & GitHub
- Postman
- Vercel
- Render

## 🔐 Authentication

TaskFlow uses JWT authentication for secure user access.

The authentication flow includes:

1. User registers an account.
2. User logs in with their credentials.
3. Backend generates an access token and refresh token.
4. Access token is used for authenticated API requests.
5. When the access token expires, the frontend automatically requests a new access token using the refresh token.
6. Protected Todo APIs can only be accessed by authenticated users.

## 🏗️ API Architecture

The application follows a simple separation of responsibilities:

```text
React Components
       ↓
   todoApi.js
       ↓
   apiFetch.js
       ↓
Django REST API
       ↓
    Database

API Endpoints
Authentication
Method	Endpoint	Description
POST	/api/register/	Register a new user
POST	/api/login/	Login user
POST	/api/token/refresh/	Refresh access token
Todos
Method	Endpoint	Description
GET	/work/todolist/	Get user's todos
POST	/work/todolist/	Create a todo
PATCH	/work/todolist/<id>/	Update a todo
DELETE	/work/todolist/<id>/	Delete a todo
⚙️ Local Setup
1. Clone the repository
git clone https://github.com/ThenameisAmitttt/TaskFlow-FullStack.git
cd TaskFlow-FullStack
2. Backend Setup
cd todoapi

Create and activate a virtual environment:

python -m venv .venv

Windows:

.venv\Scripts\activate

Install dependencies:

pip install -r requirements.txt

Run migrations:

python manage.py migrate

Start the Django server:

python manage.py runserver
3. Frontend Setup

Open another terminal:

cd todofrontend

Install dependencies:

npm install

Create a .env file:

VITE_API_URL=http://127.0.0.1:8000

Start the development server:

npm run dev

The frontend will be available at:

http://localhost:5173
🌐 Environment Variables
Backend

The backend uses environment variables for production configuration.

SECRET_KEY=your_secret_key
DEBUG=False
ALLOWED_HOSTS=.onrender.com
DATABASE_URL=your_database_url
Frontend
VITE_API_URL=your_backend_url

Never commit .env files or secret keys to GitHub.

🧪 API Testing

The REST APIs can be tested using Postman.

Authentication endpoints and Todo CRUD operations can be tested by sending JWT-authenticated requests to the backend API.

🚀 Deployment

The project is deployed using:

Frontend: Vercel
Backend: Render
Database: PostgreSQL

The frontend communicates with the deployed Django REST API through environment-based configuration.

📈 Future Improvements
Task categories and tags
Email notifications for upcoming deadlines
Dark mode
Pagination
Advanced task analytics
Docker support
Automated testing and CI/CD
👨‍💻 Author

Amit Thakur

B.Tech Computer Science Engineering

GitHub:
https://github.com/ThenameisAmitttt