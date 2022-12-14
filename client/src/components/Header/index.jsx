import React from "react";
import Button from "@mui/material/Button";

import styles from "./Header.module.scss";
import Container from "@mui/material/Container";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { selectIsAuth } from "../../redux/slices/auth";
import { logout } from "../../redux/slices/auth";
import { Typography } from "@mui/material";

export const Header = () => {
  const isAuth = useSelector(selectIsAuth);
  const dispath = useDispatch();

  const onClickLogout = () => {
    dispath(logout());
  };

  return (
    <div className={styles.root}>
      <Container maxWidth="lg">
        <div className={styles.inner}>
          <Link className={styles.logo} to="/">
            <div>Telegram Bot</div>
          </Link>
          <Link to="/commands">
            <Typography>Команды</Typography>
          </Link>
          <div className={styles.buttons}>
            {isAuth ? (
              <>
                <Button
                  onClick={onClickLogout}
                  variant="contained"
                  color="error"
                >
                  Выйти
                </Button>
              </>
            ) : (
              <>
                <Link to="/login">
                  <Button variant="outlined">Войти</Button>
                </Link>
                <Link to="/register">
                  <Button variant="contained">Создать аккаунт</Button>
                </Link>
              </>
            )}
          </div>
        </div>
      </Container>
    </div>
  );
};
