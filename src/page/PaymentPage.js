import {
  Box,
  Button,
  Container,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  Modal,
  TextField
} from "@mui/material";
import {useValidatableForm} from "react-validatable-form";
import {useTranslation} from "react-i18next";
import Card from "react-credit-cards";
import InputMask from 'react-input-mask';
import {useDispatch, useSelector} from "react-redux";
import {cartReducer} from "../redux/reducer/CartReducer";
import {useState} from "react";
import {useNavigate} from "react-router";
import {Done} from "@mui/icons-material";

export function PaymentPage() {

  const {t} = useTranslation()
  const cartState = useSelector(state => state.cartReducer)
  const cartActions = cartReducer.actions
  const dispatch = useDispatch()
  const [openDialog, setOpenDialog] = useState(false)
  const navigator = useNavigate()

  const rules = [
    {
      path: "number",
      ruleSet: [
        {rule: "required", customMessage: t("required")},
      ],
      dependantPaths: ["comparisonValue"],
    },
    {
      path: "name",
      ruleSet: [
        {rule: "required", customMessage: t("required")},
      ],
      dependantPaths: ["comparisonValue"],
    },
    {
      path: "expiry",
      ruleSet: [
        {rule: "required", customMessage: t("required")},
      ]
    },
    {
      path: "cvc",
      ruleSet: [
        {rule: "required", customMessage: t("required")},
      ]
    }
  ]

  const {
    isValid,
    formData,
    setPathValue,
    setFormIsSubmitted,
    setPathIsBlurred,
    getValue,
    getError,
  } = useValidatableForm({
    rules,
    hideBeforeSubmit: true,
    showAfterBlur: true,
    focusToErrorAfterSubmit: true,
  })

  const handleDialogButton = () => {
    dispatch(cartActions.clear())
    navigator("/")
  }


  return <Container>
    <Box height={"90vh"} display={"flex"} alignItems={"center"} justifyItems={"center"} flexDirection={"column"}>
      <Box width={"40vw"}>
        <Box py={2}>
          <InputMask
            mask={"9999 9999 9999 9999"}
            value={getValue("number") || ""}
            onChange={(e) => setPathValue("number", e.target.value)}
            onBlur={() => setPathIsBlurred("number")}
          >
            {
              () => <TextField
                fullWidth
                placeholder={"Credit Number"}
                error={!!getError("number")}
                helperText={getError("number")}
                type={"text"}
                id="number" />
            }
          </InputMask>
        </Box>
        <Box py={2}>
          <TextField
            fullWidth
            placeholder={"Name"}
            error={!!getError("name")}
            helperText={getError("name")}
            type={"text"}
            value={getValue("name") || ""}
            onChange={(e) => setPathValue("name", e.target.value)}
            onBlur={() => setPathIsBlurred("name")}
            id="name" />
        </Box>
        <Box py={2}>
          <Grid container columns={13} columnGap={1}>
            <Grid item flex={6}>
              <InputMask
                mask={"99/99"}
                value={getValue("expiry") || ""}
                onChange={(e) => setPathValue("expiry", e.target.value)}
                onBlur={() => setPathIsBlurred("expiry")}
              >
                {
                  () => <TextField
                    fullWidth
                    placeholder={"Valid Thru"}
                    error={!!getError("expiry")}
                    helperText={getError("expiry")}
                    type={"text"}
                    id="expiry" />
                }
              </InputMask>
            </Grid>
            <Grid item flex={6}>
              <InputMask
                mask={"999"}
                value={getValue("cvc") || ""}
                onChange={(e) => setPathValue("cvc", e.target.value)}
                onBlur={() => setPathIsBlurred("cvc")}
              >
                {
                  () => <TextField
                    fullWidth
                    placeholder={"CVC"}
                    error={!!getError("cvc")}
                    helperText={getError("cvc")}
                    type={"text"}
                    id="cvc" />
                }
              </InputMask>
            </Grid>
          </Grid>
        </Box>
        <Button
          fullWidth
          variant={"contained"}
          color={"warning"}
          onClick={() => setOpenDialog(true)}
        >
          { cartState.totalPrice + "₺ " + t("pay") }
        </Button>
        <Dialog open={openDialog}>
         <Box p={3}>
           <DialogTitle> {t("paymentStatus")} </DialogTitle>
           <DialogContent>
             <Box textAlign={"center"}>
               <Done
                 color={"success"}
                 sx={{fontSize:"60px"}}
               />
             </Box>
             {t("paymentSucc")}
           </DialogContent>
           <DialogActions>
             <Button onClick={handleDialogButton} color={"warning"}>
               {t("close")}
             </Button>
           </DialogActions>
         </Box>
        </Dialog>
      </Box>
    </Box>
  </Container>
}

/*

 */