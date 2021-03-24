module.exports = (sequelize, Sequelize) => {
const Student = sequelize.define("Student", {
    studentID: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        allowNull: false,
        unique: true
    },
    firstName: {
        type: Sequelize.STRING,
        allowNull: false
    },
    lastName: {
        type: Sequelize.STRING,
        allowNull: false
    },
    requirementID: {
        type: Sequelize.INTEGER
    },
    entrySemester: {
        type: Sequelize.ENUM('Fall','Winter','Spring','Summer1','Summer2')
    },
    entryYear: {
        type: Sequelize.INTEGER
    },
    gradSemester: {
        type: Sequelize.ENUM('Fall','Winter','Spring','Summer1','Summer2')
    },
    gradYear: {
        type: Sequelize.INTEGER
    },
    nSemestersInProgram: {
        type: Sequelize.INTEGER
    },
    gpa: {
        type: Sequelize.DECIMAL(3,2)
    },
    totalCredits: {
        type: Sequelize.INTEGER
    },
    projectOption: {
        type: Sequelize.STRING
    },
    advisor: {
        type: Sequelize.STRING
    },
    hasGraduated: {
        type: Sequelize.BOOLEAN
    }
}, { 
    tableName: 'Student',
    timestamps: false
});
  
    return Student;
};