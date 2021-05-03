import http from "../http-commons";

class subAreaCourseService {
    create(data) {
        return http.post("/addSubAreaCourse", data);
    }
}

export default new subAreaCourseService();