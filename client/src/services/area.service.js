import http from "../http-commons";

class AreaService {
    create(data) {
        return http.post("/addArea", data);
    }
}

export default new AreaService();