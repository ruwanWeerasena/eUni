
import axios from "axios";

const http = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  headers: {
    "Content-type": "application/json"
  }
});

const getAll = () => {
  return http.get("/timeShedule");
};

const get = id => {
  return http.get(`/timeShedule/${id}`);
};

const create = data => {
  return http.post("/timeShedule", data);
};

const update = (id, data) => {
  return http.put(`/timeShedule/${id}`, data);
};

const remove = id => {
  return http.delete(`/timeShedule/${id}`);
};


const BatchTimeSheduleService = {
  getAll,
  get,
  create,
  update,
  remove,
};

export default BatchTimeSheduleService;