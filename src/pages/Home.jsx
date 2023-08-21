import React from 'react';
import { styled } from '@mui/system';

const ContainerStyled = styled('div')({
  marginTop: '20px',
  minHeight: 'calc(100vh - 120px)', // Adjust the height based on your header and footer heights
  minWidth: '90vw',
  maxWidth: '90vw',
  marginLeft: '4vw',
  backgroundColor: "#FFFFFF",
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  flexDirection: 'column',
  fontSize: '24px',
  fontWeight: 'bold'
});

const Home = () => {
  return (
    <ContainerStyled>
      The Library App
    </ContainerStyled>
  );
};

export default Home;
