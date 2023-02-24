//import http from "../../http-common";
import axios from "axios";

const http = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  headers: {
    "Content-type": "application/json"
  }
});

const getAll = () => {
  return http.get("/lecturer");
};

const get = id => {
  return http.get(`/lecturer/${id}`);
};

const create = data => {
  return http.post("/lecturer", data);
};

const update = (id, data) => {
  return http.put(`/lecturer/${id}`, data);
};

const remove = id => {
  return http.delete(`/lecturer/${id}`);
};


const LecturerService = {
  getAll,
  get,
  create,
  update,
  remove,
};

export default LecturerService;