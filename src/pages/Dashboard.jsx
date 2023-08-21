import React, { useState, useEffect } from 'react';
import { styled } from '@mui/system';
import { Button } from '@mui/material';
import {
  Alert,
  AlertTitle,
} from '@mui/material';
import apiCalls from '../backend/apiCalls';
import DataTable from '../components/DataTable';
import BooksModal from '../components/Modal';

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
  gap: '10px',
  boxShadow: '0px 0px 15px #444',
  padding: "15px",
  borderRadius: '8px',
  minWidth: "88vw",
  backgroundColor: '#22252a',
});


function timeout(delay) {
  return new Promise(res => setTimeout(res, delay));
}


const Dashboard = () => {
  const [open, setOpen] = useState(false);
  const [myBooks, setMyBooks] = useState([]);
  const [selectionModel, setSelectionModel] = useState([])
  const [alertMessage, setAlertMessage] = useState('');
  const [alertType, setAlertType] = useState('');

  const handleCreate = () => {
    setOpen(true);
  }
  const handleUpdate = () => {
    if (selectionModel?.length > 0) {
      setOpen(true);
    }
  }

  const deleteBook = async () => {
    if (selectionModel?.length > 0) {
      await apiCalls.deleteBook(selectionModel[0]).then(() => {
        getMyBooks()
      })
        .catch((err) => {
          let errorMessage = 'Deleting Book Failed';
          if (err.response && err.response.status === 401) {
            errorMessage = 'Token Expired';
          }
          setAlertType('error');
          setAlertMessage(errorMessage);
        });
    }
  }

  const getMyBooks = async () => {
    // Perform API call and retrieve search results
    await apiCalls.myBooks()
      .then((data) => {
        setMyBooks(data.data);
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
    getMyBooks();
  }, []);

  useEffect(() => {
    if (alertMessage) {
      async function resetAlert() {
        const response = await timeout(3000);
        setAlertMessage('');
        setAlertType('');
      }
      resetAlert();
    }
  }, [alertMessage])

  return (
    <ContainerStyled>
      <BooksModal id={selectionModel[0]} open={open} setOpen={setOpen} myBooks={myBooks} setMyBooks={setMyBooks} setAlertMessage={setAlertMessage} setAlertType={setAlertType} getMyBooks={getMyBooks}></BooksModal>
      <SubHeaderStyled>
        <Button type="submit" variant="contained" color='inherit' onClick={handleCreate}>
          Add Book
        </Button>
        <Button type="submit" variant="contained" color='inherit' onClick={handleUpdate}>
          Update Book
        </Button>
        <Button type="submit" variant="contained" color='inherit' onClick={deleteBook}>
          Delete Book
        </Button>
      </SubHeaderStyled>
      {alertMessage && (
        <Alert style={{ marginTop: '20px' }} severity={alertType}>
          <AlertTitle>{alertType}</AlertTitle>
          {alertMessage}
        </Alert>
      )}
      <div style={{ paddingTop: 20 }}>
        <DataTable setSelectionModel={setSelectionModel} myBooks={myBooks} />
      </div>

    </ContainerStyled>
  );
};

export default Dashboard;
