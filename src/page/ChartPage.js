import {useSelector} from "react-redux";
import {Box, Container, Grid} from "@mui/material";
import {Cell, Legend, Pie, PieChart} from "recharts";
import {useEffect, useState} from "react";
import {useTranslation} from "react-i18next";

export function ChartPage(){

  const state = useSelector(state => state.itemsReducer)
  const {t} = useTranslation()
  const [data, setData] = useState([
    {
      type: "electronic",
      count: 0,
      color: "#3f9f4b"
    },
    {
      type: "game",
      count: 0,
      color: "#3f529f"
    },
    {
      type: "accessories",
      count: 0,
      color: "#c20e36"
    },
    {
      type: "clothes",
      count: 0,
      color: "#c96717"
    },
  ])

  useEffect(() => {
    const copyData = [...data]
    state.items.forEach(element => {
      copyData.forEach(item => {
        if(element.data().type.includes(item.type)){
          item.count++
        }
      })
    })
    setData(copyData)
  },[])

  return <Container>
    <Grid
      container
      spacing={0}
      direction="column"
      alignItems="center"
      justifyContent="center"
      style={{ minHeight: '90vh' }}
    >
      <Grid item xs={3}>
        <PieChart width={400} height={400}>
          <Legend verticalAlign="top"/>
          <Pie data={data} nameKey={"type"} dataKey={"count"} cx={200} cy={200} innerRadius={80} outerRadius={100}>
            {
              data.map((element, index) => {
                return <Cell key={`ìndex ${index}`} fill={element.color} />
              })
            }
          </Pie>
        </PieChart>
        <PieChart width={400} height={400}>
          <Legend verticalAlign="top"/>
          <Pie data={data} nameKey={t("type")} dataKey={"count"}>
            {
              data.map((element, index) => {
                return <Cell key={`ìndex ${index}`} fill={element.color} />
              })
            }
          </Pie>
        </PieChart>
      </Grid>
    </Grid>
  </Container>
}