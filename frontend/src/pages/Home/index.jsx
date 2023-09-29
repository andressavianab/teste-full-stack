import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../contexts/auth";
import { api } from "../../services/api";

export const HomePage = () => {
  const [beers, setBeers] = useState([]);

  const { logout } = useContext(AuthContext);
  const handleLogout = () => {
    logout();
  };

  async function fetchBeers() {
    try {
      const response = await api.get("/beers");
      const data = response.data
      setBeers(data)
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  console.log(beers)

  useEffect(() => {
    fetchBeers();
  }, []);

  return (
    <div className="w-full">
      <h1>Home Page</h1>
      {beers.map((beer) => 
        <>
        <p>{beer.name}</p>
        <p>{}</p>
        </>
      )}
      <button onClick={handleLogout}>logout</button>
    </div>
  );
};
