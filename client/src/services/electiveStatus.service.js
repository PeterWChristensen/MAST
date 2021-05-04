import http from "../http-commons";

class ElectiveStatusService {
    getAll(data) {
        return http.get("/getElectiveStatus", data);
    }
}

export default new ElectiveStatusService();