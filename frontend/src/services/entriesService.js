import api from "./api";

const getMyEntries = async () => {
  const response = await api.get("/entries/my-entries");

  return response.data;
};

export { getMyEntries };
