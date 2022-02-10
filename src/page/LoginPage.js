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
import {useTranslation} from "react-i18next";
import {useValidatableForm} from "react-validatable-form";
import {Visibility, VisibilityOff} from "@mui/icons-material";
import {useEffect, useState} from "react";
import {UnStyledLink} from "../view/UnStyledLink";
import {useDispatch, useSelector} from "react-redux";
import {authReducer} from "../redux/reducer/AuthReducer";
import {loginUser} from "../redux/action/AuthActions";
import {useLocation, useNavigate} from "react-router";

export function LoginPage() {

  const {t} = useTranslation()
  const [showPassword, setShowPassword] = useState(false)
  const authState = useSelector(state => state.authReducer)
  const authActions = authReducer.actions
  const dispatch = useDispatch()
  const navigator = useNavigate()
  const {state} = useLocation()
  const {targetNavigation} = state ? state : {}
  const rules = [
    {
      path: "email",
      ruleSet: [
        {rule: "required", customMessage: t("required")},
        {rule: "email", customMessage: t("emailNotValid")},
      ],
      dependantPaths: ["comparisonValue"],
    },
    {
      path: "password",
      ruleSet: [
        {rule: "required", customMessage: t("required")},
        {
          rule: "length",
          greaterThan: 8,
          customMessage: t("shortPassword"),
        },
      ],
      dependantPaths: ["comparisonValue"],
    },
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
    if (authState.user) {
      if (targetNavigation) {
        navigator(targetNavigation)
      } else {
        navigator("/")
      }
    }
  }, [authState.user])

  const handleSubmit = (event) => {
    if (isValid) {
      const email = formData.email
      const password = formData.password
      dispatch(loginUser({email: email, password: password}))
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
                    {showPassword ? <VisibilityOff/> : <Visibility/>}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
        </Box>
        <Box width={"40vw"} p={1}>
          <Button type={"submit"} onSubmit={handleSubmit} variant={"contained"} color={"warning"} fullWidth>
            {t("login")}
          </Button>
        </Box>
        <Box width={"40vw"} textAlign={"center"} p={3}>
          <UnStyledLink to={"/register"}>
            <Typography fontWeight={"bolder"} color={"orange"}>
              {t("needAccount")}
            </Typography>
          </UnStyledLink>
        </Box>
        {
          authState.loading ? <CircularProgress color={"warning"}/> : null
        }
      </Box>
    </form>
  </Container>
}