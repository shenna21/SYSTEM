# Curriculum Management System

A simple **Node.js + PostgreSQL-based** curriculum management system where users can submit and view curriculum details.

## Prerequisites
Ensure you have the following installed:

- **PostgreSQL** (for the database)
- **Node.js & npm** (for the backend server)
- **A code editor** (e.g., VS Code)

## Step 1: Install PostgreSQL

### Windows
1. Download PostgreSQL from [here](https://www.postgresql.org/download/).
2. Run the installer and follow the setup instructions.
3. During installation, set a password for the default `postgres` user.
4. After installation, open **pgAdmin** to manage your database.

### Linux (Ubuntu/Debian)
```bash
sudo apt update
sudo apt install postgresql postgresql-contrib
```

### macOS (Homebrew)
```bash
brew install postgresql
```

## Step 2: Start PostgreSQL
Start the PostgreSQL service:

```bash
sudo service postgresql start  # Linux
brew services start postgresql # Mac
```

Check if PostgreSQL is running:

```bash
psql -V
```

## Step 3: Set Up the Database

### Open PostgreSQL Shell
```bash
psql -U postgres
```
(Enter the password you set during installation)

### Create a Database
```sql
CREATE DATABASE mydatabase;
```

### Switch to the Database
```sql
\c mydatabase;
```

### Create a Table (`tbl_curriculum`)
```sql
CREATE TABLE tbl_curriculum (
    id SERIAL PRIMARY KEY,
    subject_name VARCHAR(255) NOT NULL,
    program_id INT NOT NULL,
    room_id INT NOT NULL,
    schoolyear_id INT NOT NULL
);
```

### View All Tables
```sql
SELECT table_name FROM information_schema.tables WHERE table_schema = 'public';
```

### View Table Data
```sql
SELECT * FROM tbl_curriculum;
```

## Step 4: Install Node.js and Dependencies

### Check if Node.js is Installed
```bash
node -v
npm -v
```
If not installed, download and install **[Node.js](https://nodejs.org/)**.

### Clone the Project
```bash
git clone https://github.com/your-repo/curriculum-management.git
cd curriculum-management
```

### Install Dependencies
```bash
npm install
```

## Step 5: Configure Environment

### Update `server.js` PostgreSQL Configuration
Edit `server.js` and update your PostgreSQL credentials:

```javascript
const { Pool } = require('pg');

const pool = new Pool({
    user: "postgres",
    host: "localhost",
    database: "mydatabase",
    password: "your_password",  // Change this
    port: 5432
});
```

## Step 6: Start the Backend Server
```bash
node server.js
```
✅ The server will run at **http://localhost:5000**

## Step 7: Open the Frontend
- Open `public/index.html` in a browser to submit curriculum data.
- Open `public/database.html` to view curriculum data.

## API Endpoints
| Method | Endpoint          | Description                  |
|--------|------------------|------------------------------|
| GET    | `/get-curriculum` | Fetch all curriculum data    |
| POST   | `/add-curriculum` | Add a new curriculum entry   |

## Troubleshooting

### Check if PostgreSQL is Running
```bash
sudo service postgresql status
```

### Restart PostgreSQL
```bash
sudo service postgresql restart
```

## Conclusion
🎯 You now have a full-fledged **PostgreSQL + Node.js** project to manage curriculum data. Let me know if you need help! 🚀
