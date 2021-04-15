module.exports = (sequelize, Sequelize) => {
    const DegreeRequirement = sequelize.define("DegreeRequirement", {
        requirementID: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            allowNull: false,
        },
        departID: {
            type: Sequelize.STRING,
        },
        track: {
            type: Sequelize.STRING,
        },
        versionSemester: {
            type: Sequelize.ENUM('Fall','Winter','Spring','Summer1','Summer2')
        },
        versionYear: {
            type: Sequelize.INTEGER
        },
        totalCredit: {
            type: Sequelize.INTEGER
        },
        project: {
            type: Sequelize.STRING
        },
        thesis: {
            type: Sequelize.STRING
        },
        timeLimit: {
            type: Sequelize.INTEGER
        },
        finalRecommended: {
            type: Sequelize.INTEGER
        },
        minGPA: {
            type: Sequelize.INTEGER
        }
    }, { 
        tableName: 'DegreeRequirement',
        timestamps: false
    });
      
        return DegreeRequirement;
    };