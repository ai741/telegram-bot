import { Route, Routes, Navigate, useNavigate } from "react-router-dom";
import "./style.css";
import { Home } from "./pages/Home";
import { Login } from "./pages/Login";
import { Registration } from "./pages/Registration";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectIsAuth, fetchAuthMe } from "./redux/slices/auth";
import { Commands } from "./pages/Commands";

function App() {
  const dispatch = useDispatch();
  const isAuth = useSelector(selectIsAuth);

  const navigate = useNavigate();
  useEffect(() => {
    dispatch(fetchAuthMe());
    if (!isAuth) navigate("/login");
    console.log("da");
  }, []);

  //Основная ветка роутов
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/register" element={<Registration />} />
      <Route path="/login" element={<Login />} />
      <Route path="/commands" element={<Commands />} />
    </Routes>
  );
}

export default App;
