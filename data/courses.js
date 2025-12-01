// Sample course data
const COURSES = [
    {
        id: 'CS101',
        code: 'CS 101',
        name: 'Introduction to Computer Science',
        department: 'CS',
        credits: 3,
        instructor: 'Dr. Smith',
        schedule: { days: ['Monday', 'Wednesday', 'Friday'], time: '9:00 AM - 10:00 AM' },
        seats: 30,
        available: 15,
        description: 'An introduction to computer science and programming concepts.'
    },
    {
        id: 'CS201',
        code: 'CS 201',
        name: 'Data Structures and Algorithms',
        department: 'CS',
        credits: 4,
        instructor: 'Dr. Johnson',
        schedule: { days: ['Tuesday', 'Thursday'], time: '10:00 AM - 11:30 AM' },
        seats: 25,
        available: 10,
        description: 'Study of fundamental data structures and algorithms.'
    },
    {
        id: 'CS301',
        code: 'CS 301',
        name: 'Database Systems',
        department: 'CS',
        credits: 3,
        instructor: 'Prof. Williams',
        schedule: { days: ['Monday', 'Wednesday'], time: '2:00 PM - 3:30 PM' },
        seats: 20,
        available: 5,
        description: 'Introduction to database design and SQL.'
    },
    {
        id: 'MATH101',
        code: 'MATH 101',
        name: 'Calculus I',
        department: 'MATH',
        credits: 4,
        instructor: 'Dr. Brown',
        schedule: { days: ['Monday', 'Wednesday', 'Friday'], time: '11:00 AM - 12:00 PM' },
        seats: 35,
        available: 20,
        description: 'Introduction to differential calculus.'
    },
    {
        id: 'MATH201',
        code: 'MATH 201',
        name: 'Linear Algebra',
        department: 'MATH',
        credits: 3,
        instructor: 'Dr. Davis',
        schedule: { days: ['Tuesday', 'Thursday'], time: '1:00 PM - 2:30 PM' },
        seats: 30,
        available: 12,
        description: 'Study of vector spaces and linear transformations.'
    },
    {
        id: 'ENG101',
        code: 'ENG 101',
        name: 'English Composition',
        department: 'ENG',
        credits: 3,
        instructor: 'Prof. Miller',
        schedule: { days: ['Monday', 'Wednesday'], time: '8:00 AM - 9:30 AM' },
        seats: 25,
        available: 8,
        description: 'Fundamentals of academic writing.'
    },
    {
        id: 'ENG202',
        code: 'ENG 202',
        name: 'American Literature',
        department: 'ENG',
        credits: 3,
        instructor: 'Dr. Wilson',
        schedule: { days: ['Tuesday', 'Thursday'], time: '3:00 PM - 4:30 PM' },
        seats: 20,
        available: 15,
        description: 'Survey of American literature from colonial times to present.'
    },
    {
        id: 'HIST101',
        code: 'HIST 101',
        name: 'World History I',
        department: 'HIST',
        credits: 3,
        instructor: 'Prof. Moore',
        schedule: { days: ['Monday', 'Wednesday', 'Friday'], time: '1:00 PM - 2:00 PM' },
        seats: 30,
        available: 18,
        description: 'Survey of world history from ancient to medieval times.'
    },
    {
        id: 'HIST202',
        code: 'HIST 202',
        name: 'Modern World History',
        department: 'HIST',
        credits: 3,
        instructor: 'Dr. Taylor',
        schedule: { days: ['Tuesday', 'Thursday'], time: '9:00 AM - 10:30 AM' },
        seats: 25,
        available: 10,
        description: 'Study of modern world history from 1500 to present.'
    },
    {
        id: 'BIO101',
        code: 'BIO 101',
        name: 'Introduction to Biology',
        department: 'BIO',
        credits: 4,
        instructor: 'Dr. Anderson',
        schedule: { days: ['Monday', 'Wednesday'], time: '10:00 AM - 12:00 PM' },
        seats: 28,
        available: 14,
        description: 'Introduction to biological concepts and laboratory techniques.'
    },
    {
        id: 'BIO201',
        code: 'BIO 201',
        name: 'Genetics',
        department: 'BIO',
        credits: 3,
        instructor: 'Prof. Thomas',
        schedule: { days: ['Tuesday', 'Thursday'], time: '2:00 PM - 3:30 PM' },
        seats: 22,
        available: 7,
        description: 'Study of heredity and genetic variation.'
    }
];

// Export courses data
if (typeof module !== 'undefined' && module.exports) {
    module.exports = COURSES;
}
