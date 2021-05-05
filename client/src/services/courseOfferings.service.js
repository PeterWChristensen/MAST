import http from "../http-commons";
import axios from "axios";

class CourseOfferingsService {
    create(data) {
        return http.post("/", data);
    }
    getAll(data) {
        return axios.post("/getCourseOfferings", {data});
    }
}

export default new CourseOfferingsService();