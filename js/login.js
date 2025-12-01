// Login functionality
document.addEventListener('DOMContentLoaded', function() {
    const loginForm = document.getElementById('loginForm');
    
    // Check if user is already logged in
    const currentUser = localStorage.getItem('currentUser');
    if (currentUser) {
        window.location.href = 'dashboard.html';
    }
    
    loginForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const studentId = document.getElementById('studentId').value;
        const password = document.getElementById('password').value;
        
        // Simple validation (in a real app, this would be server-side)
        if (studentId && password) {
            // Generate student name from ID (simple demo logic)
            const nameMap = {
                'S12345': 'John Doe',
                'S12346': 'Jane Smith',
                'S12347': 'Bob Johnson'
            };
            const studentName = nameMap[studentId] || 'Student ' + studentId;
            
            // Create user session
            const user = {
                studentId: studentId,
                name: studentName,
                email: studentId.toLowerCase() + '@student.edu',
                loginTime: new Date().toISOString()
            };
            
            localStorage.setItem('currentUser', JSON.stringify(user));
            
            // Redirect to dashboard
            window.location.href = 'dashboard.html';
        } else {
            alert('Please enter both student ID and password');
        }
    });
});
