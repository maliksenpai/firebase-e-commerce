import {useContext, useState} from "react";
import {ColorModeContext, UserContext} from "../App";
import {
  AppBar,
  Avatar,
  Badge,
  Box,
  Button,
  Container, FormControl,
  IconButton, InputLabel, MenuItem,
  Popover,
  Select, Switch,
  Toolbar,
  Typography
} from "@mui/material";
import {Person, Settings, ShoppingCart} from "@mui/icons-material";
import {useDispatch, useSelector} from "react-redux";
import {UnStyledLink} from "./UnStyledLink";
import {useTranslation} from "react-i18next";
import {app} from "../index";
import {authReducer} from "../redux/reducer/AuthReducer";

export function MainAppBar() {

  const {user} = useContext(UserContext)
  const colorMode = useContext(ColorModeContext)
  const {t, i18n} = useTranslation()
  const cartState = useSelector(state => state.cartReducer)
  const dispatch = useDispatch()
  const authActions = authReducer.actions
  const [anchorEl, setAnchorEl] = useState(null)
  const [settingsAnchor, setSettingsAnchor] = useState(null)
  const [selectedLanguage, setLanguage] = useState(localStorage.getItem("language") ? localStorage.getItem("language") : "en")
  const [theme, setTheme] = useState(!!localStorage.getItem("theme"))

  const handleProfileClick = (event) => {
    setAnchorEl(event.currentTarget)
  };

  const handleProfileClose = () => {
    setAnchorEl(null)
  };

  const handleSettingsClick = (event) => {
    setSettingsAnchor(event.currentTarget)
  };

  const handleSettingsClose = () => {
    setSettingsAnchor(null)
  };


  const handleLogout = () => {
    setAnchorEl(null)
    app.auth().signOut()
    dispatch(authActions.clear())
  }

  const handleLanguageChange = (event) => {
    setLanguage(event.target.value)
    i18n.changeLanguage(event.target.value)
  }

  const handleThemeChange = (event) => {
    setTheme(event.target.checked)
    colorMode.toggleColorMode()
    localStorage.setItem("theme", event.target.checked)
  }

  const settingsOpen = Boolean(settingsAnchor)
  const settingsId = settingsOpen ? 'settings-popover' : undefined

  const open = Boolean(anchorEl)
  const id = open ? 'user-popover' : undefined

  return <Box sx={{flexGrow: 1}}>
    <AppBar position={"static"}>
      <Container>
        <Toolbar>
          <Typography color={"orange"} sx={{flexGrow: 1}} underline={"none"}>
            <UnStyledLink to={"/"}>
              E-Comm
            </UnStyledLink>
          </Typography>
          <Box>
            <UnStyledLink to={"/statistic"}>
              {t("statistic")}
            </UnStyledLink>
          </Box>
          <Box>
            <IconButton onClick={handleSettingsClick}>
              <Settings />
            </IconButton>
            <Popover
              id={settingsId}
              open={settingsOpen}
              anchorEl={settingsAnchor}
              onClose={handleSettingsClose}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'center'
              }}
            >
              <Box p={3}>
                <Box>
                  <FormControl>
                    <InputLabel id={"language-select"}> {t("language")} </InputLabel>
                    <Select
                      labelId={"language-select"}
                      value={selectedLanguage}
                      label={t("language")}
                      onChange={handleLanguageChange}
                    >
                      <MenuItem value={"en"}> English </MenuItem>
                      <MenuItem value={"tr"}> Türkçe </MenuItem>
                    </Select>
                  </FormControl>
                </Box>
                <Box>
                  <Typography>
                    {t("theme")}
                  </Typography>
                  <Switch
                    checked={theme}
                    onChange={handleThemeChange}
                    inputProps={{ 'aria-label': 'controlled' }}
                  />
                </Box>
              </Box>
            </Popover>
          </Box>
          <Box px={2}>
            <UnStyledLink to={"/cart"}>
              <Badge
                overlap="circular"
                anchorOrigin={{vertical: "bottom", horizontal: "right"}}
                color={"warning"}
                badgeContent={cartState.itemCount}
              >
                <IconButton>
                  <ShoppingCart/>
                </IconButton>
              </Badge>
            </UnStyledLink>
          </Box>
          {
            user ?
              <Box>
                <Button onClick={handleProfileClick}>
                  <Avatar sx={{backgroundColor: "grey"}}>
                    <Person/>
                  </Avatar>
                </Button>
                <Popover
                  id={id}
                  open={open}
                  anchorEl={anchorEl}
                  onClose={handleProfileClose}
                  anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'center'
                  }}
                >
                  <Box p={3}>
                    <Typography>
                      {user.email}
                    </Typography>
                    <Box py={2}/>
                    <Button variant={"contained"} color={"error"} onClick={handleLogout}>
                      {t("logout")}
                    </Button>
                  </Box>
                </Popover>
              </Box>
              :
              <UnStyledLink to={"/login"}>
                <Typography underline={"none"} color={"orange"}>
                  Login
                </Typography>
              </UnStyledLink>

          }
        </Toolbar>
      </Container>
    </AppBar>
  </Box>

}