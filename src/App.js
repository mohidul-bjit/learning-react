import './App.css';
import React from 'react';
import ProductList from './components/products/productList';
import Login from './components/auth/signin';

export const AuthContext = React.createContext();

const initialState = {
  isAuthenticated: false,
  user: null,
  token: null,
};


const  reducer = (state, action) => {
  switch (action.type) {
    case "LOGIN":
      localStorage.setItem("user", JSON.stringify({
        username: action.payload.username,
        image: action.payload.image,
      }));
      localStorage.setItem("token", JSON.stringify(action.payload.token));
      return {
        ...state,
        isAuthenticated: true,
        user: action.payload.user,
        token: action.payload.token,
      };
    case "LOGOUT":
      localStorage.clear();
      return {
        ...state,
        isAuthenticated: false,
        user: null
      };
    default:
      return state;
  }
};

function App() {

  const [state, dispatch] = React.useReducer(reducer, initialState);

  return (
    <AuthContext.Provider value={{state, dispatch}}>
      <div className="App">
        {!state.isAuthenticated ? <Login/>: <ProductList/>}
      </div>
    </AuthContext.Provider>
  );
}

export default App;
