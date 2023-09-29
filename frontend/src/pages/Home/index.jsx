import { useContext, useEffect, useState } from "react";

import { api } from "../../services/api";
import { Card } from "../../components/Card";
import { AuthContext } from "../../contexts/auth";

export const HomePage = () => {
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchBeerName, setSearchBeerName] = useState("");
  const [abvGt, setAbvGt] = useState("");
  const [hasMorePages, setHasMorePages] = useState(true);

  const fetchBeers = async (page) => {
    try {
      const formattedBeerName = searchBeerName.replace(/ /g, "_");
      const response = await api.get(
        `/all-pages?page=${page}&beer_name=${encodeURIComponent(
          formattedBeerName
        )}&abv_gt=${encodeURIComponent(abvGt)}`
      );
      const jsonData = await response.data;
      if (jsonData.length === 0) {
        setHasMorePages(false);
      } else {
        setData(jsonData);
        setCurrentPage(page);
        setHasMorePages(true);
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchBeers(currentPage);
  }, [currentPage, searchBeerName, abvGt]);

  const { logout } = useContext(AuthContext);
  const handleLogout = () => {
    logout();
  };

  return (
    <div className="w-full h-fit flex flex-col items-center">
      <div className="w full flex self-end mb-3 rounded-xl p-3 bg-slate-950 border focus:outline text-slate-200 border-slate-700 focus:border-yellow-500 hover:bg-slate-800 bg-slate-800/70">
        <button onClick={handleLogout}>logout</button>
      </div>
      <div className="w-full flex justify-between items-center gap-1 relative">
        <input
          className="max-w-96 w-96 h-12 rounded-xl p-3 bg-slate-950 border focus:outline text-slate-200 border-slate-700 focus:border-yellow-500 hover:bg-slate-800 bg-slate-800/70"
          type="text"
          placeholder="Search for a beer name"
          value={searchBeerName}
          onChange={(e) => setSearchBeerName(e.target.value)}
        />
        {searchBeerName && (
          <button
            className="text-[0.500rem] absolute left-[22rem] w-6 p-1 rounded-full bg-slate-950 border focus:outline text-yellow-500 border-slate-700 focus:border-yellow-500 hover:bg-slate-800 bg-slate-800/70"
            onClick={() => setSearchBeerName("")}
          >
            x
          </button>
        )}

        <select
          className="rounded-xl p-3 bg-slate-950 border focus:outline text-slate-400 border-slate-700 focus:border-yellow-500 hover:bg-slate-800 bg-slate-800/70"
          value={abvGt}
          onChange={(e) => setAbvGt(e.target.value)}
        >
          <option className="text-slate-400" value="" selected>
            Filter by abv
          </option>
          <option className="text-slate-200" value="5">
            greater than 5%
          </option>
          <option className="text-slate-200" value="10">
            greater than 10%
          </option>
          <option className="text-slate-200" value="15">
            greater than 15%
          </option>
          <option className="text-slate-200" value="20">
            greater than 20%
          </option>
        </select>
      </div>
      <div>
        <main className="flex flex-wrap gap-9 justify-center mt-4 mb-10">
          {data.map((beer) => (
            <div className="w-56 h-56 flex" key={beer.id}>
              <Card
                name={beer.name}
                first_brewed={beer.first_brewed}
                abv={beer.abv}
                tagline={beer.tagline}
                ibu={beer.ibu}
                ph={beer.ph}
                ebc={beer.ebc}
              />
            </div>
          ))}
        </main>
        <div className="w-full flex justify-between text-slate-300">
          <button
            onClick={() => currentPage > 1 && fetchBeers(currentPage - 1)}
            disabled={currentPage === 1}
          >
            Previous
          </button>
          <span>Page {currentPage}</span>
          <button
            onClick={() => fetchBeers(currentPage + 1)}
            disabled={!hasMorePages}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};
