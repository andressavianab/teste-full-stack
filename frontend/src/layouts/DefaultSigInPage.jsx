import { Outlet } from "react-router-dom";
import { Header } from "../components/Header";
import  beer_celebration  from '../assets/beer_celebration.svg'

export const DefaultSignInPage = () => {
  return (
    <>
      <Header />
      <main className="max-w-5xl m-auto h-screen flex my-32 justify-center gap-5 text-slate-200 font-Poppins">
        <Outlet />
        <div className="hidden lg:flex w-505 h-505">
          <img className="w-full" src={beer_celebration} alt="" />
        </div>
      </main>
    </>
  );
};
