import React from 'react';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import Avatar from '@mui/material/Avatar';

import { Navigate } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import {useForm} from "react-hook-form"
import { fetchRegister, selectIsAuth } from "../redux/slices/auth";
import { Header } from '../components/Header';

export const Registration = () => {
    const dispatch = useDispatch()
    const isAuth = useSelector(selectIsAuth)

    const {register, handleSubmit, formState:{errors, isValid}} = useForm({
        defaultValues:{
            username: "",
            email: "",
            password: ""
        },
        mode: "onChange"
    })

    const onSubmit = (values) =>{
       dispatch(fetchRegister(values))
    }
    if(isAuth){
        return <Navigate to="/"/>
    }
  return (
    <>
        <Header/>
        <div  className="register-container">
            <Paper  elevation={4} sx={{p:5}}>
            <Typography variant="h5">
                Создание аккаунта
            </Typography>
            <div style={{padding: "10px"}}>
                <Avatar sx={{ width: 100, height: 100 }} />
            </div>
                <form onSubmit={handleSubmit(onSubmit)} sx={{height:  200}}>
                    <TextField
                        margin="dense"
                        error={Boolean(errors.username?.message)}
                        helperText={errors.username?.message}
                        { ...register("username", { required: "Укажите имя пользователя"})}
                        fullWidth
                        label="Полное имя"/>
                    <TextField
                        margin="dense"
                        error={Boolean(errors.email?.message)}
                        helperText={errors.email?.message}
                        { ...register("email", { required: "Укажите почту"})}
                        fullWidth
                    label="E-Mail" />
                    <TextField
                        type="password"
                        margin="dense"
                        error={Boolean(errors.password?.message)}
                        helperText={errors.password?.message}
                        { ...register("password", { required: "Укажите пароль"})}
                        fullWidth
                        label="Пароль"/>
                    <Button type="submit" size="large" variant="contained" fullWidth>
                        Зарегистрироваться
                    </Button>
                </form>
            </Paper>
        </div>
    </>
   
  );
};
