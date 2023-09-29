import { Outlet } from "react-router-dom";
import { Header } from "../components/Header";

export const DefaultHomePage = () => {
  return (
    <>
      <Header />
      <main className="max-w-5xl m-auto h-screen flex my-32 justify-center gap-5 text-slate-200 font-Poppins">
        <Outlet />
      </main>
    </>
  );
};
