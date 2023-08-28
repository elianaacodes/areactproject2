import React, { useState, useEffect } from 'react';
import { styled } from '@mui/system';
import { ImageList, ImageListItem, ImageListItemBar } from '@material-ui/core'
import {
  Alert,
  AlertTitle,
  Button,
  TextField,
  IconButton
} from '@mui/material';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import apiCalls from '../backend/apiCalls';

const ContainerStyled = styled('div')({
  marginTop: '20px',
  minHeight: 'calc(100vh - 120px)', // Adjust the height based on your header and footer heights
  minWidth: '90vw',
  maxWidth: '90vw',
  marginLeft: '4vw',
});

const FormContainerStyled = styled('form')({
  marginTop: '20px',
  display: 'flex',
  flexDirection: 'column',
  gap: '10px',
  backgroundColor: "#FFFFFF",
  boxShadow: '0px 0px 10px #D5D5D5',
  padding: "12px",
  borderRadius: '8px',
});


function timeout(delay) {
  return new Promise(res => setTimeout(res, delay));
}

const FieldContainerStyled = styled('div')({
  display: 'flex',
  gap: '10px',
  minWidth: '200px',
});

const SearchForm = ({ onSubmit }) => {
  const [name, setName] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    onSubmit(name);
  };

  return (
    <FormContainerStyled onSubmit={handleSubmit}>
      <FieldContainerStyled>
        <TextField
          label="Enter Charater Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          variant="outlined"
          InputLabelProps={{
            sx: {
              '&.Mui-focused': {
                color: 'black' // Black label color on focus
              }
            }
          }}
          sx={{
            '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': {
              borderColor: 'black' // Black outline on focus
            }
          }}
          fullWidth
        />
        <Button type="submit" variant="contained" sx={{
          backgroundColor: '#22252a', '&:hover': {
            backgroundColor: '#22252d' // Same color on hover
          }
        }}>
          Search
        </Button>
      </FieldContainerStyled>
    </FormContainerStyled>
  );
};


const Home = () => {
  const [searchResults, setSearchResults] = useState([]);
  const [alertMessage, setAlertMessage] = useState('');
  const [alertType, setAlertType] = useState('');

  const borrowBook = async (book) => {
    // Perform API call and retrieve search results
    await apiCalls.borrowBook(book)
      .then(() => {
        setAlertType("info");
        setAlertMessage("Book Borrowed");
      })
      .catch((err) => {
        let errorMessage = 'Data Fetching Failed';
        let errorType = "error"
        if (err.response && err.response.status === 401) {
          errorMessage = 'Token Expired';
        }
        if (err.response && err.response.status === 409) {
          errorMessage = 'Book Already Borrowed';
          errorType = "warning"
        }
        setAlertType(errorType);
        setAlertMessage(errorMessage);

      });
  };
  const handleSearch = async (name) => {
    // Perform API call and retrieve search results
    await apiCalls.searchBooks(name)
      .then((data) => {
        setSearchResults(data.data);
        if (data.data.length === 0) {
          setAlertType('info');
          setAlertMessage('No Data Found.');
        } else {
          setAlertMessage('');
          setAlertType('');
        }
      })
      .catch((err) => {
        let errorMessage = 'Data Fetching Failed';
        if (err.response && err.response.status === 401) {
          errorMessage = 'Token Expired';
        }
        setAlertType('error');
        setAlertMessage(errorMessage);
      });
  };

  useEffect(() => {
    if (alertMessage) {
      async function resetAlert() {
        // You can await here
        const response = await timeout(2000);
        setAlertMessage('');
        setAlertType('');
      }
      resetAlert();

    }
  }, [alertMessage])

  return (
    <ContainerStyled>
      <SearchForm onSubmit={handleSearch} />
      {alertMessage && (
        <Alert severity={alertType}>
          <AlertTitle>{alertType}</AlertTitle>
          {alertMessage}
        </Alert>
      )}
      {searchResults && (
        <div style={{ paddingTop: 20 }}>
          <ImageList cols={6} gap={30} rowHeight={350}>
            {searchResults.map((book, index) => (
              <ImageListItem key={index}>
                <img
                  src={book.image}
                  alt={book.title}
                />
                {localStorage.getItem("token") ?
                  <ImageListItemBar
                    title={book.title}
                    actionIcon={
                      <IconButton
                        onClick={() => borrowBook(book)}
                        sx={{ color: 'rgba(255, 255, 255, 0.54)' }}
                      >
                        <AddCircleIcon />
                      </IconButton>
                    }
                  />
                  :
                  <ImageListItemBar
                    title={book.title}
                  />
                }
              </ImageListItem>
            ))}
          </ImageList>
        </div>
      )
      }
    </ContainerStyled>
  );
};

export default Home;
