module.exports = {
    HOST: "mysql3.cs.stonybrook.edu",
    USER: "jseol",
    PASSWORD: "112209780",
    DB: "jseol",
    dialect: "mysql",
    pool: {
        max: 50,
        min: 0,
        acquire: 30000,
        idle: 10000
    }
};
