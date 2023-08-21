import React from 'react';
import { styled } from '@mui/system';
import Auth from './pages/Auth'
import Home from './pages/Home'
import Dashboard from './pages/Dashboard'
import Contact from './pages/Contact'
import About from './pages/About'
import { Routes, Route } from "react-router-dom";
import { Button } from '@mui/material';
import { auth } from './firebase';
import { signOut } from "firebase/auth";

const HeaderStyled = styled('header')({
  textAlign: 'center',
  backgroundColor: '#22252a',
  color: '#FFFFFF',
  padding: '15px',
  display: 'flex',
  justifyContent: 'space-between',
  boxShadow: '0px 0px 10px #444',
});


const App = () => {

  return (
    <>
      {localStorage.getItem("token")
        ?
        <HeaderStyled>
          <span style={{ fontSize: '23px', marginLeft: 30, alignSelf: 'center'}}>The Library App</span>
          <div style={{ marginRight: 30 }}>
          <Button variant='text' color='inherit' size='large' onClick={() => { window.location = "/"; }}>
            Home
          </Button>
          <Button variant='text' color='inherit' size='large' onClick={() => { window.location = "/dashboard"; }}>
            Dashboard
          </Button>
          <Button variant='text' color='inherit' size='large' onClick={() => { window.location = "/about"; }}>
            About
          </Button>
          <Button variant='text' color='inherit' size='large' onClick={() => { window.location = "/contact"; }}>
            Contact
          </Button>
          <Button variant='text' color="error" size='large' onClick={() => { localStorage.removeItem("token"); window.location = "/"; signOut(auth); }}>
            Log Out
          </Button>
          </div>
        </HeaderStyled>
        :
        <HeaderStyled>
          <span style={{ fontWeight: 'bold', fontSize: '23px' }}>The Library App</span>
          <div style={{ marginRight: 30 }}>
          <Button variant='text' color='inherit' size='large' onClick={() => { window.location = "/home"; }}>
            Home
          </Button>
          <Button variant='text' color='inherit' size='large' onClick={() => { window.location = "/about"; }}>
            About
          </Button>
          <Button variant='text' color='inherit' size='large' onClick={() => { window.location = "/contact"; }}>
            Contact
          </Button>
          <Button variant='text' color="inherit" size='large' onClick={() => { localStorage.removeItem("token"); window.location = "/"; }}>
            Sign In
          </Button>
          </div>
        </HeaderStyled>
      }

      <Routes>
        {localStorage.getItem("token")
          ?
          <>
          <Route path="*" element={<Home />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          </>
          :
          <>
          <Route path="/home" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="*" element={<Auth />} />
          </>
        }
      </Routes>
    </>
  );
};

export default App;