import {useTranslation} from "react-i18next";
import {useEffect, useState} from "react";
import {useValidatableForm} from "react-validatable-form";
import {
  Box,
  Button,
  CircularProgress,
  Container,
  IconButton,
  InputAdornment,
  TextField,
  Typography
} from "@mui/material";
import {Visibility, VisibilityOff} from "@mui/icons-material";
import InputMask from 'react-input-mask';
import {useDispatch, useSelector} from "react-redux";
import {authReducer} from "../redux/reducer/AuthReducer";
import {useNavigate} from "react-router";
import {loginUser, registerUser} from "../redux/action/AuthActions";

export function RegisterPage() {

  const { t } = useTranslation()
  const [showPassword, setShowPassword] = useState(false)
  const authState = useSelector(state => state.authReducer)
  const authActions = authReducer.actions
  const dispatch = useDispatch()
  const navigator = useNavigate()
  const rules = [
    {
      path: "email",
      ruleSet: [
        { rule: "required", customMessage: t("required")},
        { rule: "email", customMessage: t("emailNotValid") },
      ],
      dependantPaths: ["comparisonValue"],
    },
    {
      path: "password",
      ruleSet: [
        { rule: "required", customMessage: t("required")},
        {
          rule: "length",
          greaterThan: 8,
          customMessage: t("shortPassword"),
        },
      ],
      dependantPaths: ["comparisonValue"],
    },
    {
      path: "phone",
      ruleSet: [
        {rule: "required", customMessage: t("required")},
        {
          rule: "length",
          equalTo: 15,
          customMessage: t("shortPhoneNumber")
        },
        {
          rule: "regex",
          regex: /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im
        }
      ],
      dependantPaths: ["comparisonValue"]
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

  useEffect(() => {
    dispatch(authActions.clear());
  }, [])

  useEffect(() => {
    if(authState.user){
      navigator("/")
    }
  }, [authState.user])

  const handleSubmit = (event) => {
    if(isValid){
      const email = formData.email
      const password = formData.password
      dispatch(registerUser({email: email, password: password}))
    }
    event.preventDefault()
  }

  const handleShowPassword = () => {
    setShowPassword(!showPassword)
  };

  return <Container>
    <form onSubmit={handleSubmit}>
      <Box display={"flex"} alignItems={"center"} justifyContent={"center"} flexDirection={"column"} height={"90vh"}>
        <Box width={"40vw"} p={1}>
          <TextField
            fullWidth
            placeholder={"Email"}
            error={!!getError("email")}
            helperText={getError("email")}
            type={"text"}
            value={getValue("email") || ""}
            onChange={(e) => setPathValue("email", e.target.value)}
            onBlur={() => setPathIsBlurred("email")}
            id="email"
          />
        </Box>
        <Box width={"40vw"} p={1}>
          <InputMask
            mask={"(999) 999-9999"}
            value={getValue("phone") || ""}
            onChange={(e) => setPathValue("phone", e.target.value)}
            onBlur={() => setPathIsBlurred("phone")}
          >
            {
              () => <TextField
                fullWidth
                placeholder={"Phone Number"}
                error={!!getError("phone")}
                helperText={getError("phone")}
                type={"tel"}
                id="phone" />
            }
          </InputMask>
        </Box>
        <Box width={"40vw"} p={1}>
          <TextField
            fullWidth
            placeholder={"Password"}
            error={!!getError("password")}
            type={showPassword ? "text" : "password"}
            helperText={getError("password")}
            value={getValue("password") || ""}
            onChange={(e) => setPathValue("password", e.target.value)}
            onBlur={() => setPathIsBlurred("password")}
            id="password"
            InputProps={{
              endAdornment: (
                <InputAdornment position={"end"}>
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleShowPassword}
                    edge="end"
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
        </Box>
        <Box width={"40vw"} p={1}>
          <Button type={"submit"} onSubmit={handleSubmit} variant={"contained"} color={"warning"} fullWidth>
            {t("register")}
          </Button>
        </Box>
        {
          authState.loading ? <CircularProgress color={"warning"} /> : null
        }
      </Box>
    </form>
  </Container>
}