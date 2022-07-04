import React from 'react';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import Avatar from '@mui/material/Avatar';
import {useForm} from 'react-hook-form'
import styles from './Login.module.scss';
import { useDispatch, useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

import { fetchRegister, selectIsAuth } from "../../redux/slices/auth";

export const Registration = () => {
  const isAuth = useSelector(selectIsAuth)
  const {register, handleSubmit, setError, formState:{errors, isValid} } = useForm({
    defaultValues: {
      fullName:'Tom Cruze',
      email:'admi@mail.ru',
      password:'12345'
    },
    mode:'onChange'
  })
  const dispatch = useDispatch()
  console.log('isAuth',isAuth)

  const onSubmit = async (values) => {
    const data = await dispatch(fetchRegister(values))
    console.log(data)
    if(data.payload) {
      window.localStorage.setItem('token', data.payload.token)
    } else{
      alert('authorization error')
    }
  }

  if(isAuth) {
    return <Navigate to='/'/>
  }
  return (
    <Paper classes={{ root: styles.root }}>
      <Typography classes={{ root: styles.title }} variant="h5">
        Создание аккаунта
      </Typography>
      <div className={styles.avatar}>
        <Avatar sx={{ width: 100, height: 100 }} />
      </div>
      <form onSubmit={handleSubmit(onSubmit)}>
      <TextField 
        className={styles.field} 
        label="Полное имя" 
        fullWidth 
        error = {Boolean(errors.fullName?.message)}
        helperText={errors.fullName?.message}
        {...register('fullName', {required:' Enter fullName'})}
        type='fullname'/>
      <TextField 
        className={styles.field} 
        label="E-Mail" 
        type='email'
        error = {Boolean(errors.email?.message)}
        helperText={errors.email?.message}
        {...register('email', {required:' Enter email'})}
        fullWidth />
      <TextField 
        className={styles.field} 
        label="Пароль" 
        type='password'
        error = {Boolean(errors.password?.message)}
        helperText={errors.password?.message}
        {...register('password', {required:' Enter password'})}
        fullWidth />
      <Button size="large" disabled={!isValid} type = 'submit'variant="contained" fullWidth>
        Зарегистрироваться
      </Button>
      </form>
    </Paper>
  );
};
