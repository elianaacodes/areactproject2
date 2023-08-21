import React, { useState } from 'react';
import { styled } from '@mui/system';
import {
  Card,
  Button,
  TextField,
  Typography,
  Container,
  Alert,
  AlertTitle
} from '@mui/material';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from '../firebase';
import apiCalls from '../backend/apiCalls';

const ContainerStyled = styled(Container)({
  marginTop: '20px',
  backgroundColor: "#FFFFFF",
  display: 'flex',
  flexDirection: 'column',
  minHeight: 'calc(100vh - 120px)', // Adjust the height based on your header and footer heights
  justifyContent: 'center',
});

const CardStyled = styled(Card)({
  padding: '20px',
  boxShadow: '0px 0px 10px #D5D5D5'
});

const ButtonStyled = styled(Button)({
  marginTop: '16px',
});


const Auth = () => {
  const [alertMessage, setAlertMessage] = useState('');
  const [alertType, setAlertType] = useState('');
  const [activeForm, setActiveForm] = useState('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleFormChange = (form) => {
    setAlertMessage('');
    setAlertType('');
    setActiveForm(form);
  };

  const handleLogin = async (e) => {
    setAlertMessage('');
    setAlertType('');
    e.preventDefault();
    signInWithEmailAndPassword(auth, email, password).then(async (userCredential) => {
      await apiCalls.syncFirebaseLogin({ uid: userCredential.user.uid, email: userCredential.user.email })
        .then((data) => {
          console.log(data)
          localStorage.setItem("token", data.data.token);
          window.location = "/";
        })
        .catch((err) => {
          let errorMessage = 'Error syncing user with backend';
          setAlertType('error');
          setAlertMessage(errorMessage);
        });
    }).catch((error) => {
      // Handle login error
      setAlertType('error');
      setAlertMessage(error.message);
      console.error('Error logging in:', error.message);
    })
  };

  const handleSignUp = async (e) => {
    setAlertMessage('');
    setAlertType('');
    e.preventDefault();
    createUserWithEmailAndPassword(auth, email, password).then(async (userCredential) => {
      setAlertMessage('User Created');
      setAlertType('info');
      setActiveForm("login");
    }).catch((error) => {
      // Handle login error
      setAlertType('error');
      setAlertMessage(error.message);
      console.error('Error logging in:', error.message);
    })
  };


  const renderForm = () => {
    switch (activeForm) {
      case 'login':
        return (
          <form id='login' onSubmit={handleLogin}>
            <TextField
              key={'login1'}
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="username"
              label="Email"
              name="username"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              autoFocus
            />
            <TextField
              key={'login2'}
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            {alertMessage && (
              <Alert severity={alertType}>
                <AlertTitle>{alertType}</AlertTitle>
                {alertMessage}
              </Alert>
            )}
            <ButtonStyled
              key={3}
              type="submit"
              fullWidth
              variant="contained"
            >
              Login
            </ButtonStyled>
            <ButtonStyled
              key={5}
              onClick={() => handleFormChange('register')}
              fullWidth
              variant="text"
            >
              Sign Up
            </ButtonStyled>
          </form>
        );
      case 'register':
        return (
          <form id='signup' onSubmit={handleSignUp}>
            <TextField
              key={'signup1'}
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="username"
              label="Email"
              name="username"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              autoFocus
            />
            <TextField
              key={'signup2'}
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            {alertMessage && (
              <Alert severity={alertType}>
                <AlertTitle>{alertType}</AlertTitle>
                {alertMessage}
              </Alert>
            )}
            <ButtonStyled
              key={3}
              type="submit"
              fullWidth
              variant="contained"
            >
              Sign Up
            </ButtonStyled>
            <ButtonStyled
              key={5}
              onClick={() => handleFormChange('register')}
              fullWidth
              variant="text"
            >
              Sign In
            </ButtonStyled>
          </form>
        );
      }
    };

    return (
      <>
        <ContainerStyled maxWidth="xs">
          <CardStyled>
            <Typography variant="h5" component="h1" align="center">
              {activeForm === 'login' ? "Sign In" : "Sign Up"}
            </Typography>
            {renderForm()}
          </CardStyled>
        </ContainerStyled>
      </>
    );
  };

export default Auth;