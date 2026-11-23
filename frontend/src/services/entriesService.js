import api from "./api";

const createEntry = async (formData) => {
  const response = await api.post("/entries", formData);

  return response.data;
};

const getPublicEntries = async () => {
  const response = await api.get("/entries");

  return response.data;
};

const getMyEntries = async () => {
  const response = await api.get("/entries/my-entries");

  return response.data;
};

export { createEntry, getPublicEntries, getMyEntries };
