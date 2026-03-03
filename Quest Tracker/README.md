# Elden Ring Quest Log

I love Elden Ring and so I have made this todo webapp in Elden Ring's theme. It looks beautiful especially for Elden Ring Lovers.
Do check this site in your pc

## Features
* **Quest Management:** Add, view, and complete your daily challenges.
* **Authentication:** Secure login and registration for every adventurer.
* **Persistent Progress:** Your data is saved locally in a structured database.
* **Responsive UI:** Inspired by the aesthetic of the Lands Between.

## Tech Stack
* **Framework:** Django (Python) 🐍
* **Database:** SQLite 🗄️
* **Styling:** CSS3 & Google Fonts (`Cinzel`) 🎨
* **Icons:** FontAwesome / Emoji support 🛡️

---

## Installation & Setup

To get this project running on your local machine, follow these steps:

### 1️⃣ Setup the Environment
* **Clone the repo:** `https://github.com/Shishir-129/Todo-app-Django.git`
* **Create a virtual environment:** `python -m venv venv`
* **Activate it:** - Windows: `venv\Scripts\activate`
  - Mac/Linux: `source venv/bin/activate`

### 2️⃣ Install Dependencies
* **Install required packages:**
  `pip install -r requirements.txt`

### 3️⃣ Database Configuration
* **Apply Migrations:** (This creates your local `db.sqlite3` file)
  `python manage.py migrate`
* **Create Admin Account:** (Optional, for site management)
  `python manage.py createsuperuser`

### 4️⃣ Run the Site
* **Start the server:**
  `python manage.py runserver`
* **Access the Quest Log:** Open `http://127.0.0.1:8000/` in your browser.
