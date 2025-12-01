# Student Portal - Personal

A personal version of a student portal and course scheduler web application. This application allows students to log in, browse available courses, enroll in courses, and view their schedule.

## Features

- **Student Login**: Simple authentication system for students
- **Dashboard**: Overview of enrolled courses, credits, and quick actions
- **Course Catalog**: Browse and search available courses by department
- **Course Registration**: Enroll in courses with conflict detection
- **Schedule View**: Visual weekly schedule with enrolled courses
- **Responsive Design**: Works on desktop and mobile devices

## Technologies Used

- HTML5
- CSS3 (with CSS Variables for theming)
- JavaScript (ES6+)
- LocalStorage for data persistence

## Getting Started

### Prerequisites

- A modern web browser (Chrome, Firefox, Safari, Edge)
- Node.js and npm (optional, for running a local server)

### Installation

1. Clone this repository:
   ```bash
   git clone https://github.com/mohsenyniki03-ui/student-portal-personal.git
   cd student-portal-personal
   ```

2. Install dependencies (optional):
   ```bash
   npm install
   ```

### Running the Application

#### Option 1: Using npm (recommended)
```bash
npm start
```
This will start a local server and open the application in your default browser.

#### Option 2: Direct file opening
Simply open `index.html` in your web browser.

#### Option 3: Using Python
```bash
# Python 3
python -m http.server 8080

# Python 2
python -m SimpleHTTPServer 8080
```
Then navigate to `http://localhost:8080`

## Usage

1. **Login**: Use student ID "S12345" (or any student ID) with any password to log in
2. **Dashboard**: View your enrolled courses and statistics
3. **Browse Courses**: Navigate to the Course Catalog to see available courses
4. **Enroll**: Click "Enroll" on any course to register
5. **View Schedule**: Check your weekly schedule with all enrolled courses
6. **Drop Courses**: Remove courses from either the Course Catalog or Schedule page

## Project Structure

```
student-portal-personal/
├── index.html          # Login page
├── dashboard.html      # Student dashboard
├── courses.html        # Course catalog
├── schedule.html       # Weekly schedule view
├── css/
│   └── styles.css      # Application styles
├── js/
│   ├── login.js        # Login functionality
│   ├── dashboard.js    # Dashboard logic
│   ├── courses.js      # Course catalog and enrollment
│   └── schedule.js     # Schedule display and management
├── data/
│   └── courses.js      # Sample course data
├── package.json        # Project configuration
└── README.md           # This file
```

## Data Persistence

The application uses browser LocalStorage to persist:
- User login session
- Enrolled courses

Note: Data is stored locally in your browser and will be cleared if you clear browser data.

## Course Data

The application includes sample courses from various departments:
- Computer Science (CS)
- Mathematics (MATH)
- English (ENG)
- History (HIST)
- Biology (BIO)

## Future Enhancements

- Backend integration with real authentication
- Database for course and student data
- Grade tracking
- Prerequisite checking
- Waitlist functionality
- Email notifications
- Print schedule feature
- Export to calendar (iCal)

## License

ISC

## Author

Personal project by mohsenyniki03-ui
