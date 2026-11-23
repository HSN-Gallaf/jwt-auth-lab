import React, { useEffect, useState } from "react";
import { getPublicEntries } from "../services/entriesService";
import { Spin } from "antd";

const Entry = () => {
  const [entries, setEntries] = useState([]);
  const [error, setError] = useState(null);

  const loadEntries = async () => {
    try {
      const response = await getPublicEntries();

      setEntries(response);
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
              <p>{entry.title}</p>
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
