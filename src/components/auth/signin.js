import React from "react";
import { AuthContext } from "../../App";

export const Login = () => {

  const {dispatch} = React.useContext(AuthContext)

  const initialState = {
    username: "",
    password: "",
    isSubmitting: false,
    errorMessage: null
  };

  const [data, setData] = React.useState(initialState);

  const handleInputChange = event => {
    setData({
      ...data,
      [event.target.name]: event.target.value
    });
  };

  const handleSubmit = event => {
    event.preventDefault();
    setData({
      ...data,
      isSubmitting: true,
      errorMessage: null
    });

    console.log(data)

    const url = "https://dummyjson.com/auth/login"
    fetch(url, {
      method: "post",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        username: data.username,
        password: data.password
      })
    })
    .then(res => {
      if(res.ok) return res.json();
      throw res;
    })
    .then(resJson => {
      dispatch({
        type: "LOGIN",
        payload: resJson
      })
    })
    .catch(error => {
      setData({
        ...data,
        isSubmitting: false,
        errorMessage: error.message || error.statusText
      });
    });
  };

  return (
    <div className="container">
      <form onSubmit={handleSubmit}>
        <h1>Login</h1>
        <input
          type="text" 
          name="username"
          placeholder="username"
          value={data.username} 
          onChange={handleInputChange}
        />
        <input
         type="password"
          name="password"
          placeholder="password"
          value={data.password} 
          onChange={handleInputChange}
        />
        {data.errorMessage && <span>{data.errorMessage}</span>}
        <button disabled={data.isSubmitting}>
          {data.isSubmitting ? "Loading.....": "Login"}
        </button>
      </form>
    </div>
  );
};
export default Login;