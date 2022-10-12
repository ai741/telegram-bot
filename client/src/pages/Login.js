import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import { Navigate } from "react-router-dom";

import { useForm } from "react-hook-form";
import { fetchAuth, selectIsAuth } from "../redux/slices/auth";
import { Header } from "../components/Header";

export const Login = () => {
  const dispatch = useDispatch();
  const isAuth = useSelector(selectIsAuth);

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isValid },
  } = useForm({
    defaultValues: {
      username: "admin",
      password: "1234",
    },
    mode: "onSubmit",
  });

  useEffect(() => {}, []);

  const onSubmit = async (values) => {
    const data = await dispatch(fetchAuth(values));

    if (!data.payload) {
      return alert("NEa");
    }

    if ("token" in data.payload) {
      window.localStorage.setItem("token", data.payload.token);
    }
  };
  if (isAuth) {
    return <Navigate to="/" />;
  }

  return (
    <>
      <Header />
      <div className="Login register-container">
        <Paper elevation={4} sx={{p:5}}>
          <Typography variant="h5">Вход в аккаунт</Typography>
          <form onSubmit={handleSubmit(onSubmit)}>
            <TextField
              label="E-Mail"
              margin="dense"
              error={Boolean(errors.username?.message)}
              helperText={errors.username?.message}
              {...register("username", {
                required: "Укажите имя пользователя",
              })}
              fullWidth
            />
            <TextField
              margin="dense"
              label="Пароль"
              type="password"
              error={Boolean(errors.password?.message)}
              {...register("password", { required: "Укажите пароль" })}
              helperText={errors.password?.message}
              fullWidth
            />
            <Button type="submit" size="large" variant="contained" fullWidth>
              Войти
            </Button>
          </form>
        </Paper>
      </div>
    </>
  );
};
