import http from "../http-common";

class GradeService {
  getAll() {
    return http.get("/");
  }

  get(id) {
    return http.get(`//${id}`);
  }

  create(data) {
    return http.post("/", data);
  }

  update(id, data) {
    return http.put(`/${id}`, data);
  }
}

export default new GradeService();