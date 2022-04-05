//Main storage
var allCourses = [
    {courseNum: "57-132", 
        title: "Computer Programming", 
        professor: "Prof Q", 
        sections: ["1AC", "1AE", "1BD", "2AB", "2BC", "3CD"], 
        units: 10,
        fce: 6, 
        description: "A course committed to helping students learn the fundamentals of computer programming."
    },
    {courseNum: "67-443", 
        title: "Mobile App Development", 
        professor: "Prof H", 
        sections: ["1BC", "1DE", "2CD", "2CE", "3AD", "3AE"], 
        units: 12, 
        fce: 16, 
        description: "Provide students with the knowledge to be able to design and develop their own mobile application"
    },
    {courseNum: "67-373", 
        title: "IS Consulting", 
        professor: "Prof Mertz", 
        sections: ["1AB", "2AC", "2BC", "3AB", "3CD", "3DE", "4AE"], 
        units: 12, 
        fce: 10, 
        description: "Students will work with a community partner to help them solve their pain points in an effective and sustainable solution."
    },
    {courseNum: "05-535", 
        title: "Applied Machine Learning", 
        professor: "Prof Rose", 
        sections: ["4AB", "4BE", "4CD"], 
        units: 9, 
        fce: 12, 
        description: "Learn the basics of machine learning through this low-tech course."
    },
    {courseNum: "16-264", 
        title: "Humanoids", 
        professor: "Prof Atkeson", 
        sections: ["2AD", "4BD"], 
        units: 12, 
        fce: 6, 
        description: "Explore the current status of robotics within our society and the potentials of how advance machines can get."
    },
    {courseNum: "05-430", 
        title: "Programming Usable Interfaces", 
        professor: "Prof Hudson", 
        sections: ["1AE", "1BD", "1CE", "2AB", "2BC"], 
        units: 15, 
        fce: 20, 
        description: "Dive into the fundamentals of design and technology within our current society."
    },
    {courseNum: "05-435", 
        title: "Applied Fabrication in HCI", 
        professor: "Prof Alex", 
        sections: ["1AB", "2BD"], 
        units: 12, 
        fce: 18, 
        description: "Experiment with different fabrication methods such as 3D printing and laser cutting to modify materials."
    },
    {courseNum: "17-214", 
        title: "Fundametals of SWE", 
        professor: "Prof Bosch", 
        sections: ["1AE", "1BD", "1CE", "2AB", "2BC"],
        units: 12, 
        fce: 16, 
        description: "An introduction to software engineering for students to learn and apply to future courses."
    },
    {courseNum: "17-330", 
        title: "Object Oriented Programming", 
        professor: "Prof L", 
        sections: ["1AE", "1BD", "1CE", "2AB", "2BC"], 
        units: 12, 
        fce: 9, 
        description: "A deeper dive into object-oriented programming and various application in Java."
    },
    {courseNum: "67-272", 
        title: "Database Design & Dev", 
        professor: "Prof Raja", 
        sections: ["1AC", "1BE", "1DE", "2AC", "2CE"], 
        units: 12, 
        fce: 10, 
        description: "Familiarize students with databases and the various languages used to add and parse information."
    },
];
var currentCourses = [
    {courseNum: "57-132", 
        title: "Computer Programming", 
        professor: "Prof Q", 
        section: "1AE", 
        units: 10, 
        fce: 6, 
        description: "A course committed to helping students learn the fundamentals of computer programming.", 
        fulfilled: "Information Systems - Tech Core"
    },
    {courseNum: "67-443", 
        title: "Mobile App Development", 
        professor: "Prof H", 
        section: "2CD", 
        units: 12, 
        fce: 16, 
        description: "Provide students with the knowledge to be able to design and develop their own mobile application", 
        fulfilled: "Information Systems - Disciplinary Core"
    },
    {courseNum: "67-373", 
        title: "IS Consulting", 
        professor: "Prof Mertz", 
        section: "3AB", 
        units: 12, 
        fce: 10, 
        description: "Students will work with a community partner to help them solve their pain points in an effective and sustainable solution.", 
        fulfilled: "Information Systems - Professional Core"
    }
];

var sectionNums = [
    {
        num: "1",
        startTime: "8:00",
        endTime: "10:00",
        rowIndex: 1
    }, 
    {
        num: "2",
        startTime: "10:30",
        endTime: "12:30",
        rowIndex: 2
    }, 
    {
        num: "3",
        startTime: "14:30",
        endTime: "16:30",
        rowIndex: 3
    }, 
    {
        num: "4",
        startTime: "18:00",
        endTime: "20:00",
        rowIndex: 4
    }
];

var sectionLetters = [
    {
        num: "A",
        dayOfWeek: "Monday",
        colIndex: 0
    }, 
    {
        num: "B",
        dayOfWeek: "Tuesday",
        colIndex: 1
    }, 
    {
        num: "C",
        dayOfWeek: "Wednesday",
        colIndex: 2
    }, 
    {
        num: "D",
        dayOfWeek: "Thursday",
        colIndex: 3
    }, 
    {
        num: "E",
        dayOfWeek: "Friday",
        colIndex: 4
    }
];