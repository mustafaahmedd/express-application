import http from "../http-common";

class CrudServices{
    
    getAll = () => {
      return http.get("/coins");
    };

}
// const getById = id => {
//   return http.get(`/coins/${id}`);
// };
// const create = data => {
//   return http.post("/coins", data);
// };
// const update = (id, data) => {
//   return http.put(`/coins/${id}`, data);
// };
// const removeAll = () => {
//   return http.delete(`/coins`);
// };
// const CrudServices = {
//   getAll,
//   getById,
//   create,
//   update,
//   removeAll
// };
export default new CrudServices;