//import http from "../../http-common";
import axios from "axios";

const http = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  headers: {
    "Content-type": "application/json"
  }
});

const getAll = () => {
  return http.get("/enrollment");
};

const get = id => {
  return http.get(`/enrollment/${id}`);
};

const create = data => {
  return http.post("/enrollment", data);
};

// const update = (id, data) => {
//   return http.put(`/lecturer/${id}`, data);
// };

// const remove = id => {
//   return http.delete(`/lecturer/${id}`);
// };


const EnrollmentService = {
  getAll,
  get,
  create,
  // update,
  // remove,
};

export default EnrollmentService;