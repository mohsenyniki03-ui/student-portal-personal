// Schedule page functionality
document.addEventListener('DOMContentLoaded', function() {
    // Check if user is logged in
    const currentUser = localStorage.getItem('currentUser');
    if (!currentUser) {
        window.location.href = 'index.html';
        return;
    }
    
    // Load and display schedule
    displaySchedule();
    
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

function displaySchedule() {
    const enrolledCourses = JSON.parse(localStorage.getItem('enrolledCourses') || '[]');
    const courses = getAllCourses();
    
    // Calculate totals
    const enrolledCourseObjects = enrolledCourses.map(id => 
        courses.find(c => c.id === id)
    ).filter(c => c !== undefined);
    
    const totalCredits = enrolledCourseObjects.reduce((sum, course) => sum + course.credits, 0);
    
    // Update summary
    document.getElementById('totalCourses').textContent = enrolledCourseObjects.length;
    document.getElementById('totalCreditsSchedule').textContent = totalCredits;
    
    // Display schedule grid
    displayScheduleGrid(enrolledCourseObjects);
    
    // Display enrolled courses list
    displayEnrolledCoursesList(enrolledCourseObjects);
}

function displayScheduleGrid(enrolledCourses) {
    // Clear existing schedule items
    const days = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday'];
    days.forEach(day => {
        const daySlots = document.getElementById(`${day}-slots`);
        daySlots.innerHTML = '';
    });
    
    // Add courses to schedule
    enrolledCourses.forEach(course => {
        const { days: courseDays, time } = course.schedule;
        
        courseDays.forEach(day => {
            const dayLower = day.toLowerCase();
            const daySlots = document.getElementById(`${dayLower}-slots`);
            
            if (daySlots) {
                const scheduleItem = createScheduleItem(course, time);
                daySlots.appendChild(scheduleItem);
            }
        });
    });
}

function createScheduleItem(course, time) {
    const item = document.createElement('div');
    item.className = 'schedule-item';
    
    // Calculate position based on time
    const position = calculatePosition(time);
    item.style.top = position.top + 'px';
    item.style.height = position.height + 'px';
    
    // Generate random color based on course code for visual distinction
    const colors = ['#2563eb', '#16a34a', '#dc2626', '#ca8a04', '#9333ea'];
    const colorIndex = course.code.charCodeAt(0) % colors.length;
    item.style.backgroundColor = colors[colorIndex];
    
    item.innerHTML = `
        <strong>${course.code}</strong>
        <div>${course.name}</div>
        <div>${time}</div>
    `;
    
    return item;
}

function calculatePosition(timeString) {
    // Parse time string like "9:00 AM - 10:00 AM"
    const [startTime] = timeString.split(' - ');
    const [time, period] = startTime.split(' ');
    const [hours, minutes] = time.split(':').map(Number);
    
    // Convert to 24-hour format
    let hour24 = hours;
    if (period === 'PM' && hours !== 12) {
        hour24 = hours + 12;
    } else if (period === 'AM' && hours === 12) {
        hour24 = 0;
    }
    
    // Calculate position (assuming 8 AM is the start, each hour is 60px)
    const startHour = 8;
    const pixelsPerHour = 60;
    
    const top = (hour24 - startHour) * pixelsPerHour;
    
    // Assume 1.5 hour classes by default
    const height = pixelsPerHour * 1.5;
    
    return { top, height };
}

function displayEnrolledCoursesList(enrolledCourses) {
    const listContainer = document.getElementById('enrolledCoursesList');
    
    if (enrolledCourses.length === 0) {
        listContainer.innerHTML = '<p style="color: var(--text-secondary);">No courses enrolled yet. <a href="courses.html">Browse courses</a> to get started.</p>';
        return;
    }
    
    listContainer.innerHTML = '';
    
    enrolledCourses.forEach(course => {
        const courseItem = document.createElement('div');
        courseItem.className = 'enrolled-course-item';
        
        const scheduleText = `${course.schedule.days.join(', ')} ${course.schedule.time}`;
        
        courseItem.innerHTML = `
            <div class="enrolled-course-info">
                <h4>${course.code} - ${course.name}</h4>
                <div class="enrolled-course-details">
                    <span>Credits: ${course.credits}</span> | 
                    <span>Instructor: ${course.instructor}</span> | 
                    <span>${scheduleText}</span>
                </div>
            </div>
            <div>
                <button class="btn-danger" onclick="dropCourseFromSchedule('${course.id}')">Drop</button>
            </div>
        `;
        
        listContainer.appendChild(courseItem);
    });
}

function dropCourseFromSchedule(courseId) {
    const enrolledCourses = JSON.parse(localStorage.getItem('enrolledCourses') || '[]');
    const courses = getAllCourses();
    const course = courses.find(c => c.id === courseId);
    
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
        displaySchedule();
    }
}
