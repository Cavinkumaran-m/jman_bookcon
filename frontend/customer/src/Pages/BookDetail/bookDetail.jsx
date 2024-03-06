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
import Paper from '@mui/material/Paper';
import { useState } from 'react';
import BookIcon from '@mui/icons-material/Book';
import StarRateIcon from '@mui/icons-material/StarRate';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import LocalOfferIcon from '@mui/icons-material/LocalOffer';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import AccountCircleIcon from '@mui/icons-material/AccountCircle'; 

const BookModal = ({ book, open,handleClose, addToCart, addToWishlist }) => {
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('md'));
const displayRating = (rating) => {
    return rating > 0 ? new Array(rating).fill('⭐').join('') : "No rating";
  };

  return (
    <Dialog
      fullScreen={fullScreen}
      open={true}
      onClose={handleClose}
      aria-labelledby="responsive-dialog-title"
    >
      <DialogTitle id="responsive-dialog-title" sx={{ textAlign: 'center', fontWeight: 'bold' }}>
        {book?.name}
        <IconButton
          aria-label="close"
          onClick={()=>{
            handleClose();
            
          }}
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
              {[{icon: <AccountCircleIcon sx={{ verticalAlign: 'bottom', mr: 2 }} />, title: "Author", detail: book?.author},
                {icon: <CalendarTodayIcon sx={{ verticalAlign: 'bottom', mr: 2 }} />, title: "Year of Publication", detail: book?.publishYear},
                {icon: <LocalOfferIcon sx={{ verticalAlign: 'bottom', mr: 2 }} />, title: "Genre", detail: book?.genre},
                {icon: <StarRateIcon sx={{ verticalAlign: 'bottom', mr: 2 }} />, title: "Rating", detail: displayRating(book?.rating)},
                {icon: <AttachMoneyIcon sx={{ verticalAlign: 'bottom', mr: 2 }} />, title: "Price", detail: `₹${book?.price}`}].map((item, index) => (
                <Paper key={index} variant="outlined" sx={{ p: 1, mb: 2, mt: index === 0 ? 0 : 2 }}>
                  <Typography variant="subtitle1" component="div" sx={{ fontWeight: 'bold' }}>
                    {item.icon} {item.title}: <Typography variant="body1" component="span" sx={{ fontWeight: 'normal' }}>{item.detail}</Typography>
                  </Typography>
                </Paper>
              ))}
            </Box>
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions sx={{ justifyContent: 'space-between', padding: theme.spacing(3) }}>
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <Button
              onClick={addToCart}
              color="primary"
              variant="contained"
              fullWidth
              sx={{ backgroundColor: 'blue' }}
              startIcon={<ShoppingCartIcon />}
            >
              Add to Cart
            </Button>
          </Grid>
          <Grid item xs={6}>
            <Button
              onClick={addToWishlist}
              color="primary"
              variant="contained"
              fullWidth
              sx={{ backgroundColor: 'blue' }}
              startIcon={<StarRateIcon />}
            >
              Add to Wishlist
            </Button>
          </Grid>
        </Grid>
      </DialogActions>
    </Dialog>
  );
};

export default BookModal;
