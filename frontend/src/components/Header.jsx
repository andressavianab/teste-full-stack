import beerToast from "../assets/beer_toast.png";

export const Header = () => {
  return (
    <header className="w-full h-20 text-slate-200 flex  justify-between items-center font-bold uppercase px-8">
      <div className="flex items-center">
        <div className="w-20 h-20">
          <img className="w-full h-full" src={beerToast} alt="" />
        </div>
        <div>
          <h1>Beer App</h1>
        </div>
      </div>
    </header>
  );
};
