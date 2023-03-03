
import axios from "axios";

const http = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  headers: {
    "Content-type": "application/json"
  }
});

const getAll = () => {
  return http.get("/batch");
};

const get = id => {
  return http.get(`/batch/${id}`);
};

const create = data => {
  return http.post("/batch", data);
};

const update = (id, data) => {
  return http.put(`/batch/${id}`, data);
};

const remove = id => {
  return http.delete(`/batch/${id}`);
};

const getByCourseId = id => {
  return http.get(`batch/course/${id}`);

};

const BatchService = {
  getAll,
  get,
  create,
  update,
  remove,
  getByCourseId
};

export default BatchService;