import http from "../http-commons";

class CourseService {
    create(data) {
        return http.post("/addCourse", data);
    }

    getAll() {
        return http.get("/getCourses");
    }
}

export default new CourseService();