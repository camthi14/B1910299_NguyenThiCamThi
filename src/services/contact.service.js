import createApiClient from "./api.service";

class ContactService {
  constructor(baseUrl = "/api/contacts") {
    this.api = createApiClient(baseUrl);
  }

  getAll = async () => {
    return (await this.api.get("/")).data;
  };

  create = async (data) => {
    return (await this.api.post("/", data)).data;
  };

  deleteAll = async () => {
    return (await this.api.delete("/")).data;
  };

  get = async (id) => {
    return (await this.api.get(`/${id}`)).data;
  };

  update = async (id, data) => {
    return (await this.api.patch(`/${id}`, data)).data;
  };

  delete = async (id) => {
    return (await this.api.delete(`/${id}`)).data;
  };
}

export default new ContactService();
