import { useState } from "react";
import * as yup from "yup";

import { Link } from "react-router-dom";
import { api } from "../../services/api";

export const CreateAccount = () => {
  const [message, setMessage] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const validate = async () => {
    let schema = yup.object().shape({
      firstName: yup.string({ message }).required({ message }),
      lastName: yup.string({ message }).required({ message }),
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
    await api
      .post("/users/save", {
        firstName: firstName,
        lastName: lastName,
        email: email,
        password: password,
      })
      .then((response) => {
        setMessage(response.data.message);
      })
      .catch((error) => {
        setMessage(error.response);
        if (error.response) {
          setMessage(error.response.data.message);
        }
      });
    setFirstName("");
    setLastName("");
    setEmail("");
    setPassword("");
  };

  const clearMessage = () => {
    setMessage("");
  };

  return (
    <div className="flex flex-col items-center max-w-sm">
      <form
        onSubmit={handleSubmit}
        className="max-h-[550px] gap-1 h-full w-full flex flex-col p-7 border rounded-lg bg-slate-950 border-slate-700"
      >
        <div>
          <h1 className="text-3xl font-bold">Sing Up</h1>
        </div>
        <div className="flex gap-3 pt-2 pb-6 max-h-80 relative">
          <div className="flex flex-col gap-2 max-w-[50%]">
            <label htmlFor="firstName">Fist Name</label>
            <input
              className="h-14 p-5 border border-slate-500 text-slate-200  rounded-lg focus:outline focus:border-yellow-500 hover:bg-slate-800 bg-slate-800/70"
              type="text"
              name="fistName"
              id="firstName"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              placeholder="Andressa"
              onFocus={clearMessage}
            />
            {message === "Please fill in all fields!" && (
              <p className="text-red-700 text-xs absolute bottom-[0.4rem]">
                {message}
              </p>
            )}
          </div>
          <div className="max-w-[47%] gap-2 flex flex-col relative">
            <label htmlFor="lastName">Last Name</label>
            <input
              className="h-14 p-5 border border-slate-500 text-slate-200  rounded-lg focus:outline focus:border-yellow-500 hover:bg-slate-800 bg-slate-800/70"
              type="text"
              name="lastName"
              id="lastName"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              placeholder="Viana"
              onFocus={clearMessage}
            />
            {message === "Please fill in all fields!" && (
              <p className="text-red-700 text-xs absolute bottom-[-1.1rem]">
                {message}
              </p>
            )}
          </div>
        </div>
        <div className="flex flex-col gap-2 relative">
          <label htmlFor="email">Email</label>
          <input
            className="h-14 p-5 rounded-lg text-slate-200 border border-slate-500 focus:outline focus:border-yellow-500 hover:bg-slate-800 bg-slate-800/70"
            type="email"
            name="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="example@email.com"
            onFocus={clearMessage}
          />
          {(message === "Please fill in all fields!" ||
            message === "This email is already being used.") && (
            <p className="text-red-700 text-xs absolute bottom-[-1.1rem]">
              {message}
            </p>
          )}
        </div>
        <div className="flex flex-col gap-2 pt-4 pb-4 max-h-80 relative">
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
          {message === "Please fill in all fields!" && (
            <p className="text-red-700 text-xs absolute bottom-[-0.2rem]">
              {message}
            </p>
          )}
        </div>
        <div className="pt-4 pb-3">
          <button
            className="w-full rounded-lg bg-yellow-500 h-16 text-slate-200 font-bold"
            type="submit"
          >
            Register
          </button>
        </div>
        <p className="self-center text-sm text-slate-400 pt-2">
          Already have an Account ? Register?{" "}
          <Link to={"/login"} className="font-bold text-slate-200 underline">
            Login
          </Link>
        </p>
      </form>
      <div>
        {message === "User created successfully." && (
          <div className="mt-5 p-2">
            <p className="text-green-700 text-sm">{message}</p>
          </div>
        )}
      </div>
    </div>
  );
};
