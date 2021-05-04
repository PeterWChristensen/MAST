import http from "../http-commons";
import axios from "axios";

class CourseService {
    create(data) {
        return http.post("/addCourse", data);
    }


    getAll() {
        return http.get("/getCourses");
    }
}

export default new CourseService();