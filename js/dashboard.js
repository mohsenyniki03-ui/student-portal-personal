// Dashboard functionality
document.addEventListener('DOMContentLoaded', function() {
    // Check if user is logged in
    const currentUser = localStorage.getItem('currentUser');
    if (!currentUser) {
        window.location.href = 'index.html';
        return;
    }
    
    const user = JSON.parse(currentUser);
    
    // Display user information
    document.getElementById('studentName').textContent = user.name;
    document.getElementById('displayStudentId').textContent = user.studentId;
    
    // Get enrolled courses from localStorage
    const enrolledCourses = JSON.parse(localStorage.getItem('enrolledCourses') || '[]');
    
    // Calculate statistics
    const totalCredits = enrolledCourses.reduce((sum, courseId) => {
        const course = getCourseById(courseId);
        return sum + (course ? course.credits : 0);
    }, 0);
    
    // Update dashboard cards
    document.getElementById('enrolledCount').textContent = enrolledCourses.length;
    document.getElementById('availableCount').textContent = getAllCourses().length;
    document.getElementById('totalCredits').textContent = totalCredits;
    
    // Display recent activity
    displayRecentActivity(enrolledCourses);
    
    // Logout functionality
    document.getElementById('logoutBtn').addEventListener('click', function(e) {
        e.preventDefault();
        localStorage.removeItem('currentUser');
        window.location.href = 'index.html';
    });
});

function getCourseById(courseId) {
    const courses = getAllCourses();
    return courses.find(c => c.id === courseId);
}

function getAllCourses() {
    // Load courses from data file
    // Since we can't directly import in browser, we'll use a script tag
    if (typeof COURSES !== 'undefined') {
        return COURSES;
    }
    return [];
}

function displayRecentActivity(enrolledCourses) {
    const activityList = document.getElementById('activityList');
    
    if (enrolledCourses.length === 0) {
        activityList.innerHTML = '<p class="no-activity">No recent activity</p>';
    } else {
        let activityHTML = '<ul style="list-style: none; padding: 0;">';
        enrolledCourses.slice(0, 5).forEach(courseId => {
            const course = getCourseById(courseId);
            if (course) {
                activityHTML += `<li style="margin-bottom: 0.5rem;">✓ Enrolled in ${course.code} - ${course.name}</li>`;
            }
        });
        activityHTML += '</ul>';
        activityList.innerHTML = activityHTML;
    }
}
