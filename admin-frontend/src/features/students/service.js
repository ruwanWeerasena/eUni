//import http from "../../http-common";
import axios from "axios";

const http = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  headers: {
    "Content-type": "application/json"
  }
});

const getAll = () => {
  return http.get("/student");
};

const get = id => {
  return http.get(`/student/${id}`);
};

const create = data => {
  return http.post("/student", data);
};

const update = (id, data) => {
  return http.put(`/student/${id}`, data);
};

const remove = id => {
  return http.delete(`/student/${id}`);
};


const StudentService = {
  getAll,
  get,
  create,
  update,
  remove,
};

export default StudentService;