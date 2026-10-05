Student Violation Record



\## Description



Student Violation Record is a web-based system for recording and managing student violations. It allows users to add, view, edit, and delete student violation records through a simple web interface.



The system uses a React/Vite frontend, an Express/Node.js backend, and MongoDB for storing violation records.



\## Technologies Used



\* React

\* Vite

\* Node.js

\* Express.js

\* MongoDB

\* Mongoose

\* MongoDB Compass

\* HTML

\* CSS

\* JavaScript



\## Project Structure



```text

StudentViolationRecord/

├── backend/

│   ├── models/

│   ├── routes/

│   ├── .env

│   ├── .env.example

│   ├── package.json

│   └── server.js

├── frontend/

├── .gitignore

└── README.md

```



\## Backend Setup



Open a terminal in the project folder and run:



```bash

cd backend

npm install

```



Create a `.env` file inside the `backend` folder:



```env

MONGO\_URI=your\_mongodb\_connection\_string

PORT=5000

```



Start the backend:



```bash

npm run dev

```



The backend runs on:



```text

http://localhost:5000

```



\## Frontend Setup



Open another terminal and go to the frontend folder:



```bash

cd frontend

npm install

npm run dev

```



Open the Vite development URL shown in the terminal, usually:



```text

http://localhost:5173

```



\## MongoDB



The system uses MongoDB to permanently store student violation records.



MongoDB Compass can be used to view and manage the database locally or connect to the MongoDB database used by the application.



\## API Routes



| Method | Endpoint              | Description               |

| ------ | --------------------- | ------------------------- |

| GET    | `/api/violations`     | Get all violation records |

| GET    | `/api/violations/:id` | Get one violation record  |

| POST   | `/api/violations`     | Create a violation record |

| PUT    | `/api/violations/:id` | Update a violation record |

| DELETE | `/api/violations/:id` | Delete a violation record |



\## Running the System



1\. Make sure MongoDB is available.

2\. Open a terminal in `backend`.

3\. Run `npm run dev`.

4\. Open another terminal in `frontend`.

5\. Run `npm run dev`.

6\. Open the frontend URL provided by Vite.

7\. Use the system to manage student violation records.



\## Security



Environment files containing database connection strings are not included in the GitHub repository.



The `.gitignore` file excludes:



```text

node\_modules/

.env

.env.local

```



The `.env.example` file contains only a placeholder for the MongoDB connection string.



\## Author



Student Project — Student Violation Record



