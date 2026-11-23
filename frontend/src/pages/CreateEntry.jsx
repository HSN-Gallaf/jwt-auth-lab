import React, { useState } from "react";
import { createEntry } from "../services/entriesService";
import { useNavigate } from "react-router";
const CreateEntry = () => {
  const [error, setError] = useState(null);
  const [formData, setFormData] = useState({
    title: "",
    entryBody: "",
    isPublic: false,
  });

  const navigate = useNavigate();

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
      const response = await createEntry(formData);
      navigate("/entries");
    } catch (err) {
      setError(err.response.data.message);
    }
  };

  return (
    <div>
      <h1>Create Entry</h1>
      <p>{error}</p>

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

        <button>Create Entry</button>
      </form>
    </div>
  );
};

export default CreateEntry;
