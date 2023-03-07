
import axios from "axios";

const http = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  headers: {
    "Content-type": "application/json"
  }
});

const getAll = () => {
  return http.get("/discount");
};

const getById = id => {
  return http.get(`/discount/${id}`);
};
const getByBatchId = id => {
  return http.get(`/discount/batch/${id}`);
};

const create = data => {
  return http.post("/discount", data);
};

const update = (id, data) => {
  return http.put(`/discount/${id}`, data);
};

const remove = id => {
  return http.delete(`/discount/${id}`);
};


const BatchDiscountService = {
  getAll,
  getByBatchId,
  getById,
  create,
  update,
  remove,
};

export default BatchDiscountService;