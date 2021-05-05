import http from "../http-commons";
import axios from "axios";

class RequiredStatusService {
    getAll(data) {
        return axios.post("/getRequiredStatus", {data});
    }
}

export default new RequiredStatusService();