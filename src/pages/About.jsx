import React from 'react';
import { styled } from '@mui/system';

const ContainerStyled = styled('div')({
    marginTop: '20px',
    minHeight: 'calc(100vh - 120px)', // Adjust the height based on your header and footer heights
    minWidth: '90vw',
    maxWidth: '90vw',
    marginLeft: '5vw',
});

const SubHeaderStyled = styled('div')({
    marginTop: '20px',
    display: 'flex',
    justifyContent: 'space-between',
    gap: '10px',
    boxShadow: '0px 0px 15px #444',
    padding: "15px",
    borderRadius: '8px',
    minWidth: "88vw",
    backgroundColor: '#22252a',
});

const About = () => {
  return (
        <ContainerStyled>
            <SubHeaderStyled>
                <div></div>
                <span style={{ fontWeight: 'bold', fontSize: '23px', color: 'white' }}>About</span>
                <div></div>
            </SubHeaderStyled>
        </ContainerStyled>
  );
};

export default About;