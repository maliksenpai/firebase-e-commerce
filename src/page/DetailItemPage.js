import {useEffect, useState} from "react";
import {useParams} from "react-router";
import {Box, Button, CircularProgress, Container, Grid, Rating, Typography} from "@mui/material";
import {getSingleItem} from "../data/ItemsData";
import "../style/App.css"
import {useTranslation} from "react-i18next";
import {useDispatch, useSelector} from "react-redux";
import {cartReducer} from "../redux/reducer/CartReducer";

export function DetailItemPage() {

  const [loading, setLoading] = useState(true)
  const [item, setItem] = useState(null)
  const [containCart, setContainCart] = useState(null)
  const {id} = useParams()
  const {t} = useTranslation()
  const cartState = useSelector(state => state.cartReducer)
  const cartActions = cartReducer.actions
  const dispatch = useDispatch()

  useEffect(() => {
    setLoading(true)
    getSingleItem({id: id}).then(value => {
      setItem(value.data())
      setContainCart(cartState.cart.findIndex(item => value.data().id === item.id) === -1)
      setLoading(false)
    })
  }, [])

  useEffect(() => {
    setContainCart(cartState.cart.findIndex(item => item.id === item.id) === -1)
  }, [cartState])

  const handleCartButton = ({element, containCart}) => {
    if (containCart) {
      dispatch(cartActions.addCartItem({item: element}));
    } else {
      dispatch(cartActions.removeCartItem({item: element}));
    }
  }

  return <Container>
    {
      loading ?
        <Grid container justifyContent={"center"} alignItems={"center"} height={"90vh"}>
          <CircularProgress color={"warning"}/>
        </Grid> :
        <Box>
          <Box height={"500px"}>
            <Grid container flexDirection={"row"} columns={13} gap={1} height={"200%"}>
              <Grid item>
                <Grid container width={"80vw"} maxHeight={"200px"}>
                  <Grid item sm={6}>
                    <img src={item.image} className={"detail-image"} alt={item.name}/>
                  </Grid>
                  <Grid item sm={6}>
                    <Typography fontSize={"2rem"} fontWeight={"lighter"}>
                      {item.name}
                    </Typography>
                    <Box py={2} display={"flex"} alignItems={"center"} flexWrap={"wrap"} gap={1}>
                      <Rating value={item.rating} readOnly/>
                      <Typography p={0} display={"inline"}>
                        123 {t("rating")}
                      </Typography>
                    </Box>
                    <Typography color={"orange"} fontSize={"1.5rem"} fontWeight={"lighter"} py={2}>
                      {item.price}
                    </Typography>
                    <Box py={2}>
                      <Button
                        color={"warning"}
                        variant={containCart ? "contained" : "outlined"}
                        onClick={() => handleCartButton({element: item, containCart: containCart})}
                      >
                        {
                          containCart ? t("addCart") : t("removeCart")
                        }
                      </Button>
                    </Box>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Box>
          <Box pt={2}>
            <Typography>
              {item.description}
            </Typography>
            <Typography
              variant={"body2"}
              color={"text.secondary"}>
              {t("todaySales", {count: item.todaySales})}
            </Typography>
          </Box>
        </Box>
    }
  </Container>
}