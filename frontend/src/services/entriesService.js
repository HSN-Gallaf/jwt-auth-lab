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

const deleteEntry = async (entryId) => {
  const response = await api.delete(`/entries/${entryId}`);

  return response.data;
};

const getOneEntry = async (entryId) => {
  const response = await api.get(`/entries/${entryId}`);

  return response.data;
};

const updateEntry = async (entryId, formData) => {
  const response = await api.put(`/entries/${entryId}`, formData);

  return response.data;
};

export {
  createEntry,
  getPublicEntries,
  getMyEntries,
  deleteEntry,
  getOneEntry,
  updateEntry,
};
