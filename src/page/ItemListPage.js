import {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {getItems} from "../redux/action/ItemsActions";
import {
  Box,
  Button,
  CircularProgress,
  Container,
  FormControl,
  Grid,
  IconButton,
  InputAdornment,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Select, TextField
} from "@mui/material";
import {Close, Search} from "@mui/icons-material";
import {itemTypes, sortItems} from "../utils/itemTypes";
import {useTranslation} from "react-i18next";
import {ItemListView} from "../view/ItemListView";

export function ItemListPage() {

  const state = useSelector(state => state.itemsReducer)
  const dispatch = useDispatch()
  const [itemType, setItemType] = useState(null)
  const [sortPrice, setSortPrice] = useState(null)
  const [filter, setFilter] = useState("")
  const {t} = useTranslation()

  useEffect(() => {
    if (state.loading === null) {
      dispatch(getItems({filter: null, type: null, sortPrice: null}))
    }
  }, []);

  const handleChangePrice = (event) => {
    setSortPrice(event.target.value)
    dispatch(getItems({filter: filter, type: itemType, sortPrice: event.target.value}))
  }

  const handleChangeItem = (event) => {
    setItemType(event.target.value)
    dispatch(getItems({filter: filter, type: event.target.value, sortPrice: sortPrice}))
  }

  const handleChangeFilter = () => {
    dispatch(getItems({filter: filter, type: itemType, sortPrice: sortPrice}))
  }

  const handleClearFilter = () => {
    setFilter("")
    dispatch(getItems({filter: null, type: itemType, sortPrice: sortPrice}))
  }

  const handleClearItem = () => {
    setItemType(null)
    dispatch(getItems({filter: filter, type: null, sortPrice: sortPrice}))
  }

  const handleClearSort = () => {
    setSortPrice(null)
    dispatch(getItems({filter: filter, type: itemType, sortPrice: null}));
  }

  return <Container>
    <Box height={"90vh"}>
      <Grid container alignItems={"center"} justifyContent={"center"} pt={2} pb={5}>
        <Grid item sm={10} px={2}>
          <OutlinedInput
            fullWidth
            size={"small"}
            value={filter}
            onChange={(event) => setFilter(event.target.value)}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  onClick={handleClearFilter}
                  edge="end"
                >
                  <Close/>
                </IconButton>
              </InputAdornment>
            }
          />
        </Grid>
        <Grid item>
          <Button onClick={handleChangeFilter} variant={"contained"} color={"warning"}>
            <Search/>
          </Button>
        </Grid>
      </Grid>
      <Grid container columns={13} gap={1} justifyContent={"center"} alignItems={"center"}>
        <Grid item xs={12} sm={6}>
          <FormControl fullWidth>
            <TextField
              select
              label={t("category")}
              value={itemType}
              onChange={handleChangeItem}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="start" sx={{paddingX:1}}>
                    <IconButton
                      onClick={handleClearItem}
                      edge="end"
                    >
                      <Close/>
                    </IconButton>
                  </InputAdornment>
                )
              }}
            >
              {itemTypes.map(element => <MenuItem value={element}> {t(element)} </MenuItem>)}
            </TextField>
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={6}>
          <FormControl fullWidth>
            <TextField
              select
              label={t("sortPrice")}
              value={sortPrice}
              onChange={handleChangePrice}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="start" sx={{paddingX:1}}>
                    <IconButton
                      onClick={handleClearSort}
                      edge="end"
                    >
                      <Close/>
                    </IconButton>
                  </InputAdornment>
                )
              }}
            >
              {sortItems.map(element => <MenuItem value={element}> {t(element)} </MenuItem>)}
            </TextField>
          </FormControl>
        </Grid>
      </Grid>
      {
        state.loading ?
          <Box display={"flex"} alignItems={"center"} height={"100%"} justifyContent={"center"}>
            <CircularProgress/>
          </Box>
          :
          <ItemListView items={state.items}/>
      }
    </Box>
  </Container>

}