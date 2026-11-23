import React, { useEffect, useState } from "react";
import { getMyEntries } from "../services/entriesService";
import { Spin } from "antd";
const MyEntries = () => {
  const [myEntries, setMyEntries] = useState([]);
  const [error, setError] = useState(null);

  const loadMyEntries = async () => {
    try {
      const response = await getMyEntries();

      setMyEntries(response);
    } catch (err) {
      setError(err.response.data.message);
    }
  };
  useEffect(() => {
    loadMyEntries();
  }, []);

  return (
    <div>
      <h1>My Entries</h1>
      <p>{error}</p>

      {myEntries ? (
        myEntries.length > 0 ? (
          myEntries.map((entry) => (
            <div key={entry._id}>
              <p>{entry.title}</p>
            </div>
          ))
        ) : (
          <p>You Have No Entries</p>
        )
      ) : (
        <Spin />
      )}
    </div>
  );
};

export default MyEntries;
