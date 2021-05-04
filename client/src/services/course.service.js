import http from "../http-commons";
import axios from "axios";

class CourseService {
    create(data) {
        return http.post("/addCourse", data);
    }

    getCourseInfo(courseID) {
        return axios
        .post("/getCourseInfo", {
                courseID
            })
            .then(response => {
              localStorage.setItem("info", JSON.stringify(response.data));
              this.setState({events: response.data})
              return response.data;
            }).catch(err => console.error(err));
        }
}

export default new CourseService();