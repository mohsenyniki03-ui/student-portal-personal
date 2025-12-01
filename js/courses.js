// Courses page functionality
document.addEventListener('DOMContentLoaded', function() {
    // Check if user is logged in
    const currentUser = localStorage.getItem('currentUser');
    if (!currentUser) {
        window.location.href = 'index.html';
        return;
    }
    
    // Load and display courses
    displayCourses();
    
    // Setup filters
    document.getElementById('departmentFilter').addEventListener('change', filterCourses);
    document.getElementById('searchCourse').addEventListener('input', filterCourses);
    
    // Logout functionality
    document.getElementById('logoutBtn').addEventListener('click', function(e) {
        e.preventDefault();
        localStorage.removeItem('currentUser');
        window.location.href = 'index.html';
    });
});

function getAllCourses() {
    // Load courses from data file
    if (typeof COURSES !== 'undefined') {
        return COURSES;
    }
    return [];
}

function displayCourses(coursesToShow = null) {
    const courses = coursesToShow || getAllCourses();
    const courseList = document.getElementById('courseList');
    const enrolledCourses = JSON.parse(localStorage.getItem('enrolledCourses') || '[]');
    
    courseList.innerHTML = '';
    
    courses.forEach(course => {
        const isEnrolled = enrolledCourses.includes(course.id);
        const courseCard = createCourseCard(course, isEnrolled);
        courseList.appendChild(courseCard);
    });
}

function createCourseCard(course, isEnrolled) {
    const card = document.createElement('div');
    card.className = 'course-card';
    
    const scheduleText = `${course.schedule.days.join(', ')} ${course.schedule.time}`;
    
    card.innerHTML = `
        <div class="course-info">
            <h3>${course.name}</h3>
            <p class="course-code">${course.code}</p>
            <div class="course-details">
                <span>Credits: ${course.credits}</span>
                <span>Instructor: ${course.instructor}</span>
                <span>Available: ${course.available}/${course.seats}</span>
            </div>
            <p style="margin-top: 0.5rem; color: var(--text-secondary);">${course.description}</p>
            <p style="margin-top: 0.5rem; font-size: 0.875rem; color: var(--text-secondary);">${scheduleText}</p>
        </div>
        <div class="course-actions">
            ${isEnrolled 
                ? '<span class="enrolled-badge">Enrolled</span><button class="btn-danger" onclick="dropCourse(\'' + course.id + '\')">Drop</button>'
                : '<button class="btn-success" onclick="enrollCourse(\'' + course.id + '\')" ' + (course.available === 0 ? 'disabled' : '') + '>Enroll</button>'
            }
        </div>
    `;
    
    return card;
}

function enrollCourse(courseId) {
    const enrolledCourses = JSON.parse(localStorage.getItem('enrolledCourses') || '[]');
    const course = getAllCourses().find(c => c.id === courseId);
    
    if (!course) {
        alert('Course not found');
        return;
    }
    
    if (enrolledCourses.includes(courseId)) {
        alert('You are already enrolled in this course');
        return;
    }
    
    if (course.available === 0) {
        alert('This course is full');
        return;
    }
    
    // Check for time conflicts
    const conflict = checkTimeConflict(courseId, enrolledCourses);
    if (conflict) {
        if (!confirm(`This course conflicts with ${conflict.code} - ${conflict.name}. Do you still want to enroll?`)) {
            return;
        }
    }
    
    enrolledCourses.push(courseId);
    localStorage.setItem('enrolledCourses', JSON.stringify(enrolledCourses));
    
    alert(`Successfully enrolled in ${course.code} - ${course.name}`);
    displayCourses();
}

function dropCourse(courseId) {
    const enrolledCourses = JSON.parse(localStorage.getItem('enrolledCourses') || '[]');
    const course = getAllCourses().find(c => c.id === courseId);
    
    if (!course) {
        alert('Course not found');
        return;
    }
    
    if (!confirm(`Are you sure you want to drop ${course.code} - ${course.name}?`)) {
        return;
    }
    
    const index = enrolledCourses.indexOf(courseId);
    if (index > -1) {
        enrolledCourses.splice(index, 1);
        localStorage.setItem('enrolledCourses', JSON.stringify(enrolledCourses));
        
        alert(`Successfully dropped ${course.code} - ${course.name}`);
        displayCourses();
    }
}

function checkTimeConflict(newCourseId, enrolledCourseIds) {
    const newCourse = getAllCourses().find(c => c.id === newCourseId);
    if (!newCourse) return null;
    
    const parseTime = (timeStr) => {
        const [time, period] = timeStr.trim().split(' ');
        const [hours, minutes] = time.split(':').map(Number);
        
        // Convert to 24-hour format
        let hour24 = hours;
        if (period === 'PM' && hours !== 12) {
            hour24 = hours + 12;
        } else if (period === 'AM' && hours === 12) {
            hour24 = 0;
        }
        
        return hour24 * 60 + minutes; // return minutes since midnight
    };
    
    const getTimeRange = (timeString) => {
        const [startTime, endTime] = timeString.split(' - ');
        return {
            start: parseTime(startTime),
            end: parseTime(endTime)
        };
    };
    
    const newTimeRange = getTimeRange(newCourse.schedule.time);
    
    for (const enrolledId of enrolledCourseIds) {
        const enrolledCourse = getAllCourses().find(c => c.id === enrolledId);
        if (!enrolledCourse) continue;
        
        // Check if there are any common days
        const commonDays = newCourse.schedule.days.filter(day => 
            enrolledCourse.schedule.days.includes(day)
        );
        
        if (commonDays.length > 0) {
            // Check for time overlap
            const enrolledTimeRange = getTimeRange(enrolledCourse.schedule.time);
            
            // Times conflict if they overlap: new.start < enrolled.end AND new.end > enrolled.start
            if (newTimeRange.start < enrolledTimeRange.end && newTimeRange.end > enrolledTimeRange.start) {
                return enrolledCourse;
            }
        }
    }
    
    return null;
}

function filterCourses() {
    const departmentFilter = document.getElementById('departmentFilter').value;
    const searchTerm = document.getElementById('searchCourse').value.toLowerCase();
    
    let courses = getAllCourses();
    
    // Filter by department
    if (departmentFilter !== 'all') {
        courses = courses.filter(c => c.department === departmentFilter);
    }
    
    // Filter by search term
    if (searchTerm) {
        courses = courses.filter(c => 
            c.name.toLowerCase().includes(searchTerm) ||
            c.code.toLowerCase().includes(searchTerm) ||
            c.instructor.toLowerCase().includes(searchTerm) ||
            c.description.toLowerCase().includes(searchTerm)
        );
    }
    
    displayCourses(courses);
}
