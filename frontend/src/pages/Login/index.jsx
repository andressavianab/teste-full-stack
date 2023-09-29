import { useState, useContext } from "react";
import { AuthContext } from "../../contexts/auth";
import { Link } from "react-router-dom";
import * as yup from "yup";

export const LoginPage = () => {
  const { login, message, setMessage } = useContext(AuthContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const validate = async () => {
    let schema = yup.object().shape({
      password: yup.string({ message }).required({ message }),
      email: yup.string({ message }).email().required({ message }),
    });

    try {
      await schema.validate({
        email: email,
        password: password,
      });
      return true;
    } catch (error) {
      console.log(error);
      return false;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;
    setEmail(""), setPassword("");
    login(email, password);
  };

  const clearMessage = () => {
    setMessage("");
  };

  return (
    <div className="flex flex-col items-center w-[384px] max-w-sm">
      <form
        className="max-h-[550px] h-full w-full flex flex-col p-7 border rounded-lg bg-slate-950 border-slate-700"
        onSubmit={handleSubmit}
      >
        <div>
          <h1 className="text-3xl font-bold">Sing In</h1>
        </div>
        <div className="flex flex-col gap-3 pt-12 pb-9 max-h-80 relative">
          <label htmlFor="email">Email</label>
          <input
            className="h-14 p-5 border border-slate-500 text-slate-200  rounded-lg focus:outline focus:border-yellow-500 hover:bg-slate-800 bg-slate-800/70"
            type="email"
            name="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            onFocus={clearMessage}
          />
          {message[0] === "Please fill in all fields!" && (
            <p className="text-red-700 text-xs bottom-[0.5rem] absolute">
              {message[0]}
            </p>
          )}
        </div>
        <div className="flex flex-col gap-3 pb-9 max-h-80 relative">
          <label htmlFor="password">Password</label>
          <input
            className="h-14 p-5 rounded-lg text-slate-200 border border-slate-500 focus:outline focus:border-yellow-500 hover:bg-slate-800 bg-slate-800/70"
            type="password"
            name="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="********"
            onFocus={clearMessage}
          />
          {(message[0] === "Please fill in all fields!" ||
            message[0] === "Incorrect password.") && (
            <p className="text-red-700 text-xs bottom-[0.5rem] absolute">
              {message[0]}
            </p>
          )}
        </div>
        <div>
          <button
            className="w-full rounded-lg bg-yellow-500 h-16 mb-6 text-slate-200 font-bold"
            type="submit"
          >
            Login
          </button>
        </div>
        <p className="self-center text-sm text-slate-400">
          Don't you have an account?{" "}
          <Link to={"/d/register"} className="font-bold text-slate-200 underline">
            Register
          </Link>
        </p>
      </form>
      <div>
        {message[0] === "Sorry, we couldn't find your account." && (
          <div className="mt-5 p-2">
            <p className="text-red-700 text-sm">{message}</p>
          </div>
        )}
      </div>
    </div>
  );
};
