import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { getOneEntry, updateEntry } from "../services/entriesService";

const EditEntry = () => {
  const [error, setError] = useState(null);
  const [formData, setFormData] = useState({
    title: "",
    entryBody: "",
    isPublic: false,
  });

  const navigate = useNavigate();
  const { entryId } = useParams();

  const loadEntry = async () => {
    try {
      const response = await getOneEntry(entryId);
      setFormData(response);
    } catch (err) {
      setError(err.response.data.message);
    }
  };

  function handleChange(event) {
    const { name, type, value, checked } = event.target;

    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  }

  const handleSubmit = async (event) => {
    try {
      event.preventDefault();
      const response = await updateEntry(entryId, formData);
      navigate(`/entries`);
    } catch (err) {
      setError(err.response.data.message);
    }
  };

  useEffect(() => {
    loadEntry();
  }, []);

  return (
    <div>
      <p>{error}</p>
      <h1>Edit Entry</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="title">Entry Title:</label>
        <input
          type="text"
          id="title"
          name="title"
          value={formData.title}
          onChange={handleChange}
        />

        <label htmlFor="title">Entry Body:</label>
        <input
          type="text"
          id="entryBody"
          name="entryBody"
          value={formData.entryBody}
          onChange={handleChange}
        />

        <label htmlFor="title">Public:</label>
        <input
          type="checkbox"
          id="isPublic"
          name="isPublic"
          value={formData.isPublic}
          onChange={handleChange}
        />

        <button>Edit Entry</button>
      </form>
    </div>
  );
};

export default EditEntry;
