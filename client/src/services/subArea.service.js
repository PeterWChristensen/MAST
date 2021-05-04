import http from "../http-commons";

class SubAreaService {
    create(data) {
        return http.post("/addSubArea", data);
    }
}

export default new SubAreaService();