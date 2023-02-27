//import http from "../../http-common";
import axios from "axios";

const http = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  headers: {
    "Content-type": "application/json"
  }
});

const getAll = () => {
  return http.get("/course");
};

const get = id => {
  return http.get(`/course/${id}`);
};

const create = data => {
  return http.post("/course", data);
};

const update = (id, data) => {
  return http.put(`/course/${id}`, data);
};

const remove = id => {
  return http.delete(`/course/${id}`);
};


const CourseService = {
  getAll,
  get,
  create,
  update,
  remove,
};

export default CourseService;