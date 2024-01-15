import React, { useContext, useEffect } from "react";
import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import axios from "axios";
import AuthContext from "./AuthContext";
import Card from "./Card";

const HomePage = () => {
  const { authToken, setAuthToken } = useContext(AuthContext);
  const [cards, setCards] = useState([]);

  const apiUrl = "http://localhost:4000/user/getCards";
  const headers = {
    Authentication: `Bearer ${authToken}`,
  };

  async function getCards() {
    try {
      const response = await axios.get(apiUrl, { headers });
      setCards(response.data.userCards);
    } catch (error) {
      console.error(error);
      console.log("Could not get cards");
    }
  }
  useEffect(() => {
    if (authToken != "") {
      getCards();
    }
  }, [authToken]);

  useEffect(() => {
    const storedAuthToken = localStorage.getItem("authToken");

    if (storedAuthToken) {
      setAuthToken(storedAuthToken);
    }

    if (authToken !== "") {
      getCards();
    }
  }, [authToken, setAuthToken]);

  useEffect(() => {
    localStorage.setItem("authToken", authToken);
  }, [authToken]);

  return (
    <div>
      <div>
        {cards.map((card) => (
          <Card
            key={card._id}
            name={card.name}
            description={card.description}
            interests={card.interests}
            linkedin={card.linkedin}
            twitter={card.twitter}
          />
        ))}
      </div>
    </div>
  );
};

export default HomePage;
