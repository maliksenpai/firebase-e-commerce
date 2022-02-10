import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Container,
  Grid,
  Rating,
  Typography
} from "@mui/material";
import {useDispatch, useSelector} from "react-redux";
import {cartReducer} from "../redux/reducer/CartReducer";
import {useState} from "react";
import {UnStyledLink} from "./UnStyledLink";
import {useTranslation} from "react-i18next";
import {t} from "i18next";

export function ItemListView({items}) {

  const cartState = useSelector(state => state.cartReducer);
  const dispatch = useDispatch();
  const { t } = useTranslation()
  const cartActions = cartReducer.actions;


  const handleCartButton = ({element, containCart}) => {
    if (containCart) {
      dispatch(cartActions.addCartItem({item: element}));
    } else {
      dispatch(cartActions.removeCartItem({item: element}));
    }
  }

  return <Container>
    <Box pt={10} px={2}>
      <Grid height={100} justifyContent={"center"} container columns={14} gap={2}>
        {items.map(element => {
          const containCart = cartState.cart.findIndex(item => item.id === element.data().id) === -1;
          return <ShopItemCard element={element} containCart={containCart} handleCartButton={handleCartButton}/>
        })
        }
      </Grid>
    </Box>
  </Container>

}

function ShopItemCard({element, containCart, handleCartButton}) {
  const [hover, setHover] = useState(false)
  return <Grid item key={element.id} xs={12} sm={6} md={4} lg={3}>
    <Card
      onMouseEnter={() => {
        setHover(true)
      }}
      onMouseLeave={() => {
        setHover(false)
      }}
    >
      <UnStyledLink to={`/item/${element.data().id}`}>
        <CardMedia
          component={"img"}
          image={element.data().image}
          alt={element.data().name}

        />
        <CardContent>
          <Typography>
            {element.data().name}
          </Typography>
          <Typography
            variant={"body2"}
            color={"text.secondary"}
            sx={{
              display: "-webkit-box",
              overflow: "hidden",
              WebkitBoxOrient: "vertical",
              WebkitLineClamp: 1,
            }}>
            {element.data().description}
          </Typography>
          <Typography color={"orange"}>
            {element.data().price} ₺
          </Typography>

        </CardContent>
      </UnStyledLink>
      <CardActions>
        {
          hover ?
            <Button
              color={"warning"}
              variant={containCart ? "contained" : "outlined"}
              onClick={() => handleCartButton({element: element.data(), containCart: containCart})}
            >
              {
                containCart ? t("addCart") : t("removeCart")
              }
            </Button> :
            <Rating value={element.data().rating} readOnly/>
        }

      </CardActions>
    </Card>
  </Grid>
}