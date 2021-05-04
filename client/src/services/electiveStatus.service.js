import http from "../http-commons";

class ElectiveStatusService {
    create(data) {
        return http.get("/getElectiveStatus", data);
    }
}

export default new ElectiveStatusService();