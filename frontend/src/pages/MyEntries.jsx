import React, { useEffect, useState } from "react";
import { getMyEntries } from "../services/entriesService";

const MyEntries = () => {
  const [myEntries, setMyEntries] = useState([]);

  const loadMyEntries = async () => {
    const response = await getMyEntries();

    setMyEntries(response);
  };
  useEffect(() => {
    loadMyEntries();
  }, []);

  return (
    <div>
      <h1>My Entries</h1>
      {myEntries
        ? myEntries.map((entry) => (
            <div key={entry._id}>
              <p>{entry.title}</p>
            </div>
          ))
        : null}
    </div>
  );
};

export default MyEntries;
