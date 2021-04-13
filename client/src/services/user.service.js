import axios from 'axios';
import authHeader from './auth-header';

const API_URL = 'http://localhost:8080/api/test/';

class UserService {
  getPublicContent() {
    return axios.get(API_URL + 'all');
  }

  getGPDBoard() {
    return axios.get(API_URL + 'gpd', { headers: authHeader() });
  }

  getStudentBoard() {
    return axios.get(API_URL + 'student', { headers: authHeader() });
  }
}

export default new UserService();