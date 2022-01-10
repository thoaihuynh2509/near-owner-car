import React from "react";

const Logout = () => {
  const onLogout = () => {
    window.walletConnection.signOut();
    // reload page
    window.location.replace(window.location.origin + window.location.pathname);
  };

  return (
    <>
      <span style={{ marginRight: "10px" }}>{window.accountId}</span>
      <button onClick={onLogout}>Log out</button>
    </>
  );
};

export default Logout;
