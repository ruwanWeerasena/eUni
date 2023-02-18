//import http from "../../http-common";
import axios from "axios";

const http = axios.create({
  baseURL: "http://localhost:5000/",
  headers: {
    "Content-type": "application/json"
  }
});

const getAll = () => {
  console.log('getAll',http)
  return http.get("/staff");
};

const get = id => {
  return http.get(`/staff/${id}`);
};

const create = data => {
  return http.post("/staff", data);
};

const update = (id, data) => {
  return http.put(`/staff/${id}`, data);
};

const remove = id => {
  return http.delete(`/staff/${id}`);
};


const TutorialService = {
  getAll,
  get,
  create,
  update,
  remove,
};

export default TutorialService;