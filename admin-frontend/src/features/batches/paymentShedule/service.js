
import axios from "axios";

const http = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  headers: {
    "Content-type": "application/json"
  }
});

const getAll = () => {
  return http.get("/paymentShedule");
};

const get = id => {
  return http.get(`/paymentShedule/${id}`);
};

const create = data => {
  return http.post("/paymentShedule", data);
};

const update = (id, data) => {
  return http.put(`/paymentShedule/${id}`, data);
};

const remove = id => {
  return http.delete(`/paymentShedule/${id}`);
};


const BatchPaymentSheduleService = {
  getAll,
  get,
  create,
  update,
  remove,
};

export default BatchPaymentSheduleService;