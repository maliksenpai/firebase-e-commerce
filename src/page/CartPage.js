import {useContext} from "react";
import {UserContext} from "../App";
import {useSelector} from "react-redux";
import {Box, Button, Container, Typography} from "@mui/material";
import {useTranslation} from "react-i18next";
import {CartListView} from "../view/CartListView";
import {useNavigate} from "react-router";

export function CartPage() {

  const {user} = useContext(UserContext)
  const cartState = useSelector(state => state.cartReducer)
  const {t} = useTranslation()
  const navigator = useNavigate()

  const handleBuy = () => {
    if(user){
      navigator("/payment")
    }else{
      navigator("/login", {state: { targetNavigation: "/payment" }} )
    }
  }

  return <Container>
    <Box pt={2}>
      <Typography variant={"h4"} color={"orange"}>
        {t("cartTitle")}
      </Typography>
      {
        cartState.cart.length > 0 ?
          <Box>
            {cartState.cart.map(element => <Box py={1} key={element.id}>
              <CartListView element={element}/>
            </Box>)}
            <Box>
              <Typography display={"inline"}>
                {t("totalPrice")}:&nbsp;
                <Typography
                  display={"inline"}
                  fontWeight={"bolder"}
                  color={"orange"}>
                  {cartState.totalPrice}
                  ₺
                </Typography>
              </Typography>
            </Box>
            <Box py={1}>
              {user ? null : <Typography>
                {t("needLogin")}
              </Typography>}
            </Box>
            <Box display={"flex"} py={2}>
              <Box flexGrow={1}/>
              <Button variant={"contained"} color={"warning"} onClick={handleBuy}>
                {t("buy")}
              </Button>
            </Box>
          </Box> :
          <Box minHeight={"80vh"} display={"flex"} justifyContent={"center"} alignItems={"center"}>
            <Typography variant={"h5"}>
              {t("emptyCart")}
            </Typography>
          </Box>
      }
    </Box>
  </Container>
}