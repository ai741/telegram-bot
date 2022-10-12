import {Route, Routes} from "react-router-dom"
import "./style.css"
import { Home } from "./pages/Home";
import { Login } from "./pages/Login";
import { Registration } from "./pages/Registration";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectIsAuth, fetchAuthMe } from "./redux/slices/auth";
import { Navigate } from "react-router-dom";

function App() {
  const dispatch = useDispatch()
  const isAuth = useSelector(selectIsAuth)
   
  useEffect(()=>{
    dispatch(fetchAuthMe())  
  },[])

  useEffect(()=>{
    if(!isAuth) return <Navigate to="/login"/>
  }, [])
  
  return (
        <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path="/register" element={<Registration/>}/>
          <Route path="/login" element={<Login/>}/>
        </Routes>
  );
}

export default App;
