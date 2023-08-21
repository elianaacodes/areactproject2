import React from 'react'
import Modal from '@mui/base/Modal';
import { styled, Box } from '@mui/system';
import { Button, TextField } from '@mui/material';
import { useForm } from 'react-hook-form';
import apiCalls from '../backend/apiCalls';
import PropTypes from 'prop-types';
import clsx from 'clsx';

const StyledModal = styled(Modal)`
  position: fixed;
  z-index: 1300;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const style = (theme) => ({
    width: 400,
    borderRadius: '12px',
    padding: '16px 32px 24px 32px',
    backgroundColor: 'white',
    boxShadow: `0px 2px 24px ${'#383838'}`,
});

const BooksModal = (props) => {
    const { register, handleSubmit, reset } = useForm();
    
    const handleClose = () => props.setOpen(false);

    const onSubmit = async (data, event) => {

        if (props.id) {
        apiCalls.update(props.id, data).then(() => { 
            props.getMyBooks()
        })
        .catch((err) => {
            let errorMessage = 'Updating Book Failed';
            if (err.response && err.response.status === 401) {
                errorMessage = 'Token Expired';
            }
            props.setAlertType('error');
            props.setAlertMessage(errorMessage);
        });
          reset();
          handleClose();
        } else {
            // props.setMyBooks([...props.myBooks, data]);
            await apiCalls.create(data)
            .then(() => { 
                props.getMyBooks()
            })
            .catch((err) => {
                let errorMessage = 'Adding Book Failed';
                if (err.response && err.response.status === 401) {
                    errorMessage = 'Token Expired';
                }
                props.setAlertType('error');
                props.setAlertMessage(errorMessage);
            });
            
            reset();
            handleClose();
        }
    };
    return (
        <StyledModal
            aria-labelledby="unstyled-modal-title"
            aria-describedby="unstyled-modal-description"
            open={props.open}
            onClose={handleClose}
            slots={{ backdrop: StyledBackdrop }}
        >
            <Box sx={style}>
                <div>
                    <form onSubmit={handleSubmit(onSubmit)} className="flex-wrap min-w-full min-h-full">
                        <TextField
                            variant="outlined"
                            margin="normal"
                            fullWidth
                            label="ISBN Number"
                            {...register('isbn', { required: true })}
                            type="text" // Specify the input type
                        ></TextField>
                        <TextField
                            variant="outlined"
                            margin="normal"
                            fullWidth
                            label="Title"
                            {...register('title', { required: true })}
                            type="text" // Specify the input type
                        ></TextField>
                        <TextField
                            variant="outlined"
                            margin="normal"
                            fullWidth
                            label="Author"
                            {...register('author', { required: true })}
                            type="text" // Specify the input type
                        ></TextField>
                        <TextField
                            variant="outlined"
                            margin="normal"
                            fullWidth
                            label="No of Pages"
                            {...register('pages', { required: true })}
                            type="number" // Specify the input type
                        ></TextField>
                        <TextField
                            variant="outlined"
                            margin="normal"
                            fullWidth
                            label="Year"
                            {...register('year', { required: true })}
                            type="number" // Specify the input type
                        ></TextField>
                        <Button type="submit">{props.id ? 'Update Book' : 'Add Book'}</Button>
                    </form>
                </div>
            </Box>
        </StyledModal>
    )
}

const Backdrop = React.forwardRef((props, ref) => {
    const { open, className, ...other } = props;
    return (
        <div
            className={clsx({ 'MuiBackdrop-open': open }, className)}
            ref={ref}
            {...other}
        />
    );
});

Backdrop.propTypes = {
    className: PropTypes.string.isRequired,
    open: PropTypes.bool,
};

const StyledBackdrop = styled(Backdrop)`
  z-index: -1;
  position: fixed;
  inset: 0;
  background-color: rgb(0 0 0 / 0.5);
  -webkit-tap-highlight-color: transparent;
`;

export default BooksModal;