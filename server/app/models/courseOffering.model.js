module.exports = (sequelize, Sequelize) => {
const CourseOffering = sequelize.define("CourseOffering", {
    courseOfferingID: {
        type: Sequelize.STRING,
        primaryKey: true,
        allowNull: false,
        unique: true
    },
    courseID: {
        type: Sequelize.STRING,
        allowNull: false,
        references: {
            model: 'Course',
            key: "courseID"
        }
    },
    semester: {
        type: Sequelize.ENUM('Fall','Winter','Spring','Summer1','Summer2')
    },
    year: {
        type: Sequelize.INTEGER
    },
    section: {
        type: Sequelize.STRING
    },
    day: {
        type: Sequelize.STRING
    },
    startTime: {
        type: Sequelize.STRING
    },
    endTime: {
        type: Sequelize.STRING
    }
}, { 
    tableName: 'CourseOffering',
    timestamps: false
});
  
    return CourseOffering;
};
