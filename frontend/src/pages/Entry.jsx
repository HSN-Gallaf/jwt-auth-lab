import React, { useEffect, useState } from "react";
import { deleteEntry, getPublicEntries } from "../services/entriesService";
import { Spin } from "antd";
import { Link } from "react-router";
import { useAuth } from "../context/AuthContext";

const Entry = () => {
  const [entries, setEntries] = useState([]);
  const [error, setError] = useState(null);

  const { user } = useAuth();

  const loadEntries = async () => {
    try {
      const response = await getPublicEntries();

      setEntries(response);
    } catch (err) {
      setError(err.response.data.message);
    }
  };

  const handleDelete = async (entryId) => {
    try {
      const response = await deleteEntry(entryId);

      const filteredEntries = entries.filter((entry) => entry._id !== entryId);
      setEntries(filteredEntries);
    } catch (err) {
      setError(err.response.data.message);
    }
  };

  useEffect(() => {
    loadEntries();
  }, []);

  return (
    <div>
      <h1>Entry List</h1>
      <p>{error}</p>
      {entries ? (
        entries.length > 0 ? (
          entries.map((entry) => (
            <div key={entry._id}>
              <p>Title: {entry.title}</p>

              {user && entry.owner === user._id ? (
                <>
                  <Link to={`/entries/${entry._id}/edit`}>Edit </Link>
                  <button
                    onClick={() => {
                      handleDelete(entry._id);
                    }}
                  >
                    Delete Entry
                  </button>
                </>
              ) : null}
            </div>
          ))
        ) : (
          <p>There is NO Entries</p>
        )
      ) : (
        <Spin />
      )}
    </div>
  );
};

export default Entry;
