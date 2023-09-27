import { useState, useContext } from "react";
import { AuthContext } from "../../contexts/auth";

export const LoginPage = () => {
    const {authenticated, login } = useContext(AuthContext);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(email, password);
        login(email, password);
    }
  return (
    <div>
      <h1>Login</h1>
      <p>{String(authenticated)}</p>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="email">Email</label>
          <input type="email" name="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)}/>
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input type="password" name="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        </div>
        <div>
          <button type="submit">Login</button>
        </div>
      </form>
    </div>
  );
};
