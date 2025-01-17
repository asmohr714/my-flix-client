import{ useState } from "react";

export const LoginView = ({ onLoggedIn }) => {
  const [username, setUsername] = useState("null");
  const [password, setUserPassword] = useState("null");
  const handleSubmit = (event) => {
    //this prevents the default behavior of the form which is to reload the entire page
    event.preventDefault();

    const data = {
      Username: username,
      Password: password
    };

    fetch ("https://my-cinema-selector-55c96f84466e.herokuapp.com/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    })
      .then((response) => response.json())
      .then((data) => {
      console.log("Login response: ", data);
      if (data.user) {
        localStorage.setItem("user", JSON.stringify(data.user));
        localStorage.setItem("token", data.token);
        onLoggedIn(data.user, data.token);
      } else {
        alert("No Such User");
      }
  })
  .catch((e) => {
    console.error("Login error: ", e, username, password);
    alert("Something Went Wrong");
  });
};

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Username:
        <input type="text" 
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        required
        />
      </label>
      <label>
        Password:
        <input type="password"
        value={password}
        onChange={(e) => setUserPassword(e.target.value)}
        required
         />
      </label>
      <button type="submit">Submit</button>
    </form>
  );
};

export default LoginView;