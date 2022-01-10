import React, { useState, useEffect } from "react";

const ListOwner = () => {
  const [owners, setOwners] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      await window.contract
        .get_old_owner({ account_id: window.accountId })
        .then((owners) => {
          setOwners(owners);
        });
    };

    fetchData();
  }, []);

  return (
    <ul>
      {owners.map((owner) => (
        <li key={owner}>{owner}</li>
      ))}
    </ul>
  );
};

export default ListOwner;
