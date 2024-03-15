import React from "react";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import Paper from "@mui/material/Paper";
import { useState } from "react";
import { useContext } from "react";
import { UserContext } from "../../CustomFunctionalities/Context/UserContext";
import BookIcon from "@mui/icons-material/Book";
import StarRateIcon from "@mui/icons-material/StarRate";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import LocalOfferIcon from "@mui/icons-material/LocalOffer";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import FavoriteIcon from "@mui/icons-material/Favorite"; // Import the heart icon
import RatingWindow from "./RatingWindow";
import { toast } from "react-toastify";

const BookModal = ({
  book,
  loggedIn,
  open,
  handleClose,
  addToCart,
  addToWishlist,
}) => {
  const { Store } = useContext(UserContext);
  const [showRater, setShowRater] = useState(false);
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));

  const displayRating = (rating) => {
    return rating > 0 ? new Array(rating).fill("⭐").join("") : "No rating";
  };
  const detailElements = [
    { icon: AccountCircleIcon, title: "Author", detail: book?.author },
    {
      icon: CalendarTodayIcon,
      title: "Year of Publication",
      detail: book?.publishYear,
    },
    { icon: LocalOfferIcon, title: "Genre", detail: book?.genre },
    {
      icon: StarRateIcon,
      title: "Rating",
      detail: displayRating(book?.rating) + " (" + book?.RatingCount + ")",
    },
    { icon: AttachMoneyIcon, title: "Price", detail: `₹${book?.price}` },
  ];
  return (
    <Dialog
      fullScreen={fullScreen}
      open={true}
      onClose={handleClose}
      aria-labelledby="responsive-dialog-title"
    >
      <DialogTitle
        id="responsive-dialog-title"
        sx={{ textAlign: "center", fontWeight: "bold", margin: 1 }}
      >
        {book?.name}
        <IconButton
          aria-label="close"
          onClick={() => {
            handleClose();
          }}
          sx={{
            position: "absolute",
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
            <img src={book?.image} alt={book?.name} style={{ width: "100%" }} />
          </Grid>
          <Grid item xs={12} sm={6}>
            {showRater && (
              <RatingWindow
                id={book.id}
                close={() => {
                  setShowRater(false);
                }}
              ></RatingWindow>
            )}
            <Box>
              {detailElements.map((item, index) => (
                <Paper
                  key={index}
                  variant="outlined"
                  sx={{ p: 1, mb: 2, display: "flex", alignItems: "center" }}
                >
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      width: "100%",
                    }}
                  >
                    <item.icon sx={{ mr: 2 }} />
                    <Box
                      sx={{
                        display: "flex",
                        flexDirection: "column",
                        flexGrow: 1,
                      }}
                    >
                      <Typography
                        variant="subtitle1"
                        sx={{ fontWeight: "bold", mr: 1 }}
                      >
                        {item.title}
                      </Typography>

                      <Typography variant="body1">{item.detail}</Typography>
                    </Box>
                  </Box>
                </Paper>
              ))}
            </Box>
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions sx={{ justifyContent: "center", padding: theme.spacing(3) }}>
      <Grid container justifyContent="center" spacing={2}> 
        <Grid item>
          <Button
            onClick={addToCart}
            color="primary"
            variant="contained"
            sx={{ backgroundColor: "blue" }}
            startIcon={<ShoppingCartIcon />}
          >
            Add to Cart
          </Button>
        </Grid>
        <Grid item>
          <Button
            onClick={addToWishlist}
            color="primary"
            variant="contained"
            sx={{ backgroundColor: "blue" }}
            startIcon={<FavoriteIcon />}
          >
            Add to Wishlist
          </Button>
        </Grid>
        <Grid item>
          <Button
            onClick={() => {
              if (!loggedIn) {
                toast.error("Please Log in first", {
                  position: "top-center",
                  autoClose: 2000,
                  hideProgressBar: false,
                  closeOnClick: true,
                  pauseOnHover: true,
                  draggable: true,
                  progress: undefined,
                });
                return;
              }
              setShowRater((prev) => !prev);
            }}
            color="primary"
            variant="contained"
            sx={{ backgroundColor: "blue" }}
            startIcon={<StarRateIcon />}
          >
            Give Rating
          </Button>
        </Grid>
      </Grid>
    </DialogActions>

    </Dialog>
  );
};

export default BookModal;
