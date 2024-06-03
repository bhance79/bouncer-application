# Bouncer - Seamless Live Event Experience

Welcome to Bouncer, your premier gateway to seamless live event experiences. This project bridges the gap between event holders like Ticketmaster and LiveNation and live streaming services such as Zoom, YouTube, and Microsoft Teams.

## Table of Contents

- [Introduction](#introduction)
- [Features](#features)
- [Technologies Used](#technologies-used)
- [Installation](#installation)
- [Usage](#usage)
- [Project Structure](#project-structure)
- [Contributing](#contributing)
- [License](#license)

## Introduction

Bouncer aims to provide a user-friendly and secure environment where users can easily access and enjoy their favorite events. Once logged in, users will find all the events they currently own tickets for conveniently listed. If an event is live, a button to join the call is displayed, allowing instant access to the livestream without any hassle.

## Features

- User authentication and authorization.
- Display of user-specific events.
- Integration with Ticketmaster API for future events.
- Responsive design using React and Tailwind CSS.
- Interactive 3D scene using Three.js.
- Secure and seamless access to live streams.

## Technologies Used

- **Frontend**: React, Tailwind CSS, Three.js
- **Backend**: Flask
- **Database**: MySQL
- **API**: Ticketmaster API
- **Authentication**: JWT
- **Environment Management**: dotenv

## Installation

### Prerequisites

Ensure you have the following installed:

- Node.js and npm
- Python 3
- MySQL

### Clone the Repository

```bash
git clone https://github.com/your-username/bouncer.git
cd bouncer
```

### Backend Setup

1. Create a virtual environment and activate it:

```bash
python -m venv venv
source venv/bin/activate  # On Windows use `venv\Scripts\activate`
```

2. Install the required packages:

```bash
pip install -r requirements.txt
```

3. Create a `.env` file in the `backend` directory and add your environment variables:

```
DB_HOST=your_db_host
DB_USER=your_db_user
DB_PASSWORD=your_db_password
DB_NAME=your_db_name
TICKETMASTER_API_KEY=your_ticketmaster_api_key
```

4. Run the Flask server:

```bash
cd backend
flask run
```

### Frontend Setup

1. Install the required packages:

```bash
cd frontend
npm install
```

2. Run the React development server:

```bash
npm start
```

## Usage

1. Navigate to `http://localhost:3000` to access the frontend.
2. Use the provided login credentials or create a new account.
3. Access your events and join live streams seamlessly.

## Project Structure

```
bouncer/
├── backend/
│   ├── app.py
│   ├── .env
│   ├── requirements.txt
│   └── ...
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   │   ├── Home.js
│   │   │   ├── About.js
│   │   │   ├── ContactUs.js
│   │   │   ├── Login.js
│   │   │   ├── Events.js
│   │   │   ├── FutureEvents.js
│   │   │   └── ThreeScene.js
│   │   ├── App.js
│   │   ├── index.js
│   │   └── ...
│   ├── .env
│   ├── package.json
│   └── ...
└── README.md
```

## Contributing

Contributions are welcome! Please fork this repository, make your changes, and submit a pull request.

## License

This project is licensed under the MIT License.
```

### How to Use

1. **Replace `your-username` with your GitHub username** in the clone command.
2. **Add your actual database and API credentials** in the `.env` files for both backend and frontend.
3. **Ensure the directory structure in the `Project Structure` section matches your actual project structure**.

This `README.md` provides a comprehensive guide to your project, including setup instructions, usage, and contributing guidelines.
