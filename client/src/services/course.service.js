import http from "../http-commons";

class CourseService {
    create(data) {
        return http.post("/addCourse", data);
    }
}

export default new CourseService();