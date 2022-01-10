import React, { useEffect, useState } from "react";
import { Logout } from "../auth";
import ListOwner from "./ListOwner";

import "./style.css";

const OwnerCar = () => {
  const [currentOwner, setCurrentOwner] = useState("");
  const [newOwner, setNewOwner] = useState("");
  const [collapse, setCollapse] = useState(false);

  useEffect(async () => {
    const fetchData = async () => {
      await window.contract
        .get_new_owner({ account_id: window.accountId })
        .then((owner) => {
          setCurrentOwner(owner);
        });
    };

    fetchData();
  }, []);

  const onTransfer = async () => {
    try {
      await window.contract
        .tranfer_owner_car({
          account_id: window.accountId,
          new_owner: newOwner,
        })
        .then(() => {
          setNewOwner("");
          alert("Transfer Successfully");
        });
    } catch (error) {
      alert("Cannot Transfer Owner");
    }
  };

  const onChange = (event) => {
    const { value } = event.target;
    setNewOwner(value);
  };

  return (
    <main className="container">
      <header className="header">
        <Logout />
      </header>

      <div className="card-wrapper">
        <div className="card">
          <div className="product-imgs">
            <div className="img-display">
              <div className="img-showcase">
                <img
                  src="https://i1-vnexpress.vnecdn.net/2021/07/07/Aventador-Ultimae-Coupe-1-3961-1625659942.jpg?w=680&h=0&q=100&dpr=1&fit=crop&s=-bQfhP52fmZis8gCgeHLoQ"
                  alt="car image"
                />
                <img
                  src="https://i1-vnexpress.vnecdn.net/2021/07/07/Aventador-Ultimae-3-4-Rear-988-8401-6806-1625659942.jpg?w=300&h=180&q=100&dpr=1&fit=crop&s=B7U1zxoPqSMYrVwuoa5S8g"
                  alt="car image"
                />
                <img
                  src="https://i1-vnexpress.vnecdn.net/2021/07/07/Aventador-Ultimae-Front-5556-1-3532-3841-1625659942.jpg?w=300&h=180&q=100&dpr=1&fit=crop&s=qtwe1TXgOQkEDG0swmgFXg"
                  alt="car image"
                />
                <img
                  src="https://i1-vnexpress.vnecdn.net/2021/07/07/Aventador-Ultimae-Rear-1848-16-6335-6733-1625659942.jpg?w=300&h=180&q=100&dpr=1&fit=crop&s=SG1yZTBTOyLkGJuFqJrKLw"
                  alt="car image"
                />
              </div>
            </div>
            <div className="img-select">
              <div className="img-item">
                <a href="#" data-id="1">
                  <img
                    src="https://i1-vnexpress.vnecdn.net/2021/07/07/Aventador-Ultimae-3-4-Front-92-5094-9826-1625659942.jpg?w=300&h=180&q=100&dpr=1&fit=crop&s=51Bh3i0BP6rnPtsTWpYe8g"
                    alt="shoe image"
                  />
                </a>
              </div>
              <div className="img-item">
                <a href="#" data-id="2">
                  <img
                    src="https://i1-vnexpress.vnecdn.net/2021/07/07/Aventador-Ultimae-3-4-Rear-988-8401-6806-1625659942.jpg?w=300&h=180&q=100&dpr=1&fit=crop&s=B7U1zxoPqSMYrVwuoa5S8g"
                    alt="shoe image"
                  />
                </a>
              </div>
              <div className="img-item">
                <a href="#" data-id="3">
                  <img
                    src="https://i1-vnexpress.vnecdn.net/2021/07/07/Aventador-Ultimae-Front-5556-1-3532-3841-1625659942.jpg?w=300&h=180&q=100&dpr=1&fit=crop&s=qtwe1TXgOQkEDG0swmgFXg"
                    alt="shoe image"
                  />
                </a>
              </div>
              <div className="img-item">
                <a href="#" data-id="4">
                  <img
                    src="https://i1-vnexpress.vnecdn.net/2021/07/07/Aventador-Ultimae-Rear-1848-16-6335-6733-1625659942.jpg?w=300&h=180&q=100&dpr=1&fit=crop&s=SG1yZTBTOyLkGJuFqJrKLw"
                    alt="shoe image"
                  />
                </a>
              </div>
            </div>
          </div>

          <div className="product-content">
            <h2 className="product-title">Lamborghini</h2>

            <div className="product-price">
              <p className="owner">
                Owner: <span>{currentOwner}</span>
              </p>
            </div>

            <input placeholder="Account ID" onChange={onChange} />
            <button
              type="button"
              className="btn"
              onClick={onTransfer}
              disabled={!newOwner}
              style={{ margin: "20px" }}
            >
              Transfer
            </button>

            <button
              type="button"
              onClick={() => setCollapse(!collapse)}
              style={{ backgroundColor: "red", marginBottom: "20px" }}
            >
              {`${collapse ? "Close" : "Open"} Old Owners`}
            </button>

            <hr />

            {collapse && <ListOwner />}
          </div>
        </div>
      </div>
    </main>
  );
};

export default OwnerCar;
