//import http from "../../http-common";
import axios from "axios";

const http = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  headers: {
    "Content-type": "application/json"
  }
});

const getAll = () => {
  return http.get("/branch");
};

const get = id => {
  return http.get(`/branch/${id}`);
};

const create = data => {
  return http.post("/branch", data);
};

const update = (id, data) => {
  return http.put(`/branch/${id}`, data);
};

const remove = id => {
  return http.delete(`/branch/${id}`);
};


const TutorialService = {
  getAll,
  get,
  create,
  update,
  remove,
};

export default TutorialService;