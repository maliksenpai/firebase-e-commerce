import {Box, Card, CardContent, CardMedia, IconButton, Typography} from "@mui/material";
import {useTranslation} from "react-i18next";
import {Close} from "@mui/icons-material";
import {useDispatch, useSelector} from "react-redux";
import {cartReducer} from "../redux/reducer/CartReducer";

export function CartListView({element}) {

  const {t} = useTranslation()
  const dispatch = useDispatch()
  const cartActions = cartReducer.actions

  const handleRemoveItem = () => {
    dispatch(cartActions.removeCartItem({item: element}))
  }

  return <Box>
    <Card sx={{display: "flex"}}>
      <CardMedia
        component={"img"}
        sx={{height: "100px", width: "100px", p:1}}
        image={element.image}
        alt={element.name}
      />
      <CardContent sx={{display: "flex", alignItems: "start", flexGrow: 1}}>
        <Box flexGrow={1}>
          <Typography>
            {element.name}
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
            {element.description}
          </Typography>
          <Typography color={"orange"}>
            {t("price") + ": " + element.price} ₺
          </Typography>
        </Box>
        <Box>
          <IconButton onClick={handleRemoveItem}>
            <Close color={"warning"} />
          </IconButton>
        </Box>
      </CardContent>
    </Card>
  </Box>
}