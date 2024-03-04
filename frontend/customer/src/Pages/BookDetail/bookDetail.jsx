import React from 'react';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';

const BookModal = ({ book, open, handleClose, addToCart, addToWishlist }) => {
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('md'));


  return (
    <Dialog
      fullScreen={fullScreen}
      open={open}
      onClose={handleClose}
      aria-labelledby="responsive-dialog-title"
    >
      <DialogTitle id="responsive-dialog-title">
        {book?.name}
        <IconButton
          aria-label="close"
          onClick={handleClose}
          sx={{
            position: 'absolute',
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent dividers>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <img src={book?.image} alt={book?.name} style={{ width: '100%' }} />
          </Grid>
          <Grid item xs={12} sm={6}>
            <Box>
              <Typography gutterBottom variant="h6" component="div" sx={{ fontWeight: 'bold' }}>
                Author: <Typography variant="subtitle1" component="span" sx={{ fontWeight: 'normal' }}>{book?.author}</Typography>
              </Typography>
              <Typography gutterBottom variant="h6" component="div" sx={{ fontWeight: 'bold' }}>
                Publisher: <Typography variant="subtitle1" component="span" sx={{ fontWeight: 'normal' }}>{book?.publisher}</Typography>
              </Typography>
              <Typography gutterBottom variant="h6" component="div" sx={{ fontWeight: 'bold' }}>
                Year of Publication: <Typography variant="subtitle1" component="span" sx={{ fontWeight: 'normal' }}>{book?.publishYear}</Typography>
              </Typography>
              <Typography gutterBottom variant="h6" component="div" sx={{ fontWeight: 'bold' }}>
                Genre: <Typography variant="subtitle1" component="span" sx={{ fontWeight: 'normal' }}>{book?.genre}</Typography>
              </Typography>
              <Typography gutterBottom variant="h6" component="div" sx={{ fontWeight: 'bold' }}>
                Rating: <Typography variant="subtitle1" component="span" sx={{ fontWeight: 'normal' }}>{book?.rating}</Typography>
              </Typography>
              <Typography gutterBottom variant="h6" component="div" sx={{ fontWeight: 'bold' }}>
                Price: <Typography variant="subtitle1" component="span" sx={{ fontWeight: 'normal' }}>{book?.price}</Typography>
              </Typography>
            </Box>
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button onClick={addToCart} color="primary">
          Add to Cart
        </Button>
        <Button onClick={addToWishlist} color="secondary">
          Add to Wishlist
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default BookModal;
