import React, { useState, PureComponent } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

import TextField from "@mui/material/TextField";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";

const data = [
  {
    name: "Page A",
    uv: 4000,
    pv: 2400,
    amt: 2400,
  },
  {
    name: "Page B",
    uv: 3000,
    pv: 1398,
    amt: 2210,
  },
  {
    name: "Page C",
    uv: 2000,
    pv: 9800,
    amt: 2290,
  },
  {
    name: "Page D",
    uv: 2780,
    pv: 3908,
    amt: 2000,
  },
  {
    name: "Page E",
    uv: 1890,
    pv: 4800,
    amt: 2181,
  },
  {
    name: "Page F",
    uv: 2390,
    pv: 3800,
    amt: 2500,
  },
  {
    name: "Page G",
    uv: 3490,
    pv: 4300,
    amt: 2100,
  },
];

function Example() {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <LineChart
        width={500}
        height={300}
        data={data}
        margin={{
          top: 5,
          right: 30,
          left: 20,
          bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Line
          type="monotone"
          dataKey="pv"
          stroke="#8884d8"
          activeDot={{ r: 8 }}
        />
        <Line type="monotone" dataKey="uv" stroke="#82ca9d" />
      </LineChart>
    </ResponsiveContainer>
  );
}

export default function MainPage() {
  const [humanosSuscetiveis, setHumanosSuscetiveis] = useState(0.7);
  const [humanosInfectados, setHumanosInfectados] = useState(0);
  const [vetoresSuscetiveis, setVetoresSuscetiveis] = useState(0.24);
  const [vetoresInfectados, setVetoresInfectados] = useState(0.01);
  const [caesSuscetiveis, setCaesSuscetiveis] = useState(0.6);
  const [caesInfectados, setCaesInfectados] = useState(0);

  //data [0.7, 0, 0.24, 0.01, 0.6, 0];

  function enableButton() {
    if (
      humanosSuscetiveis &&
      humanosInfectados &&
      vetoresSuscetiveis &&
      vetoresInfectados &&
      caesSuscetiveis &&
      caesInfectados
    ) {
      return false;
    } else {
      return true;
    }
  }

  const flagEnableButton = enableButton();

  return (
    <Container disableGutters>
      <Grid container spacing={1}>
        <Grid item xs={12} sm={6} md={4} lg={4} xl={4}>
          <TextField
            value={humanosSuscetiveis}
            onChange={(e) => setHumanosSuscetiveis(e.target.value)}
            size="small"
            label="Humanos suscetíveis"
            autoComplete="off"
            fullWidth
            InputProps={{
              style: {
                borderRadius: "2px",
                backgroundColor: "#fff",
              },
              onInput: (e) => {
                e.target.value = e.target.value.replace(/[^0-9]/g, "");
              },
            }}
          />
        </Grid>

        <Grid item xs={12} sm={6} md={4} lg={4} xl={4}>
          <TextField
            value={humanosInfectados}
            onChange={(e) => setHumanosInfectados(e.target.value)}
            size="small"
            label="Humanos infectados"
            autoComplete="off"
            fullWidth
            InputProps={{
              style: {
                borderRadius: "2px",
                backgroundColor: "#fff",
              },
              onInput: (e) => {
                e.target.value = e.target.value.replace(/[^0-9]/g, "");
              },
            }}
          />
        </Grid>

        <Grid item xs={12} sm={6} md={4} lg={4} xl={4}>
          <TextField
            value={vetoresSuscetiveis}
            onChange={(e) => setVetoresSuscetiveis(e.target.value)}
            size="small"
            label="Vetores suscetíveis"
            autoComplete="off"
            fullWidth
            InputProps={{
              style: {
                borderRadius: "2px",
                backgroundColor: "#fff",
              },
              onInput: (e) => {
                e.target.value = e.target.value.replace(/[^0-9]/g, "");
              },
            }}
          />
        </Grid>

        <Grid item xs={12} sm={6} md={4} lg={4} xl={4}>
          <TextField
            value={vetoresInfectados}
            onChange={(e) => setVetoresInfectados(e.target.value)}
            size="small"
            label="Vetores infectados"
            autoComplete="off"
            fullWidth
            InputProps={{
              style: {
                borderRadius: "2px",
                backgroundColor: "#fff",
              },
              onInput: (e) => {
                e.target.value = e.target.value.replace(/[^0-9]/g, "");
              },
            }}
          />
        </Grid>

        <Grid item xs={12} sm={6} md={4} lg={4} xl={4}>
          <TextField
            value={caesSuscetiveis}
            onChange={(e) => setCaesSuscetiveis(e.target.value)}
            size="small"
            label="Cães suscetíveis"
            autoComplete="off"
            fullWidth
            InputProps={{
              style: {
                borderRadius: "2px",
                backgroundColor: "#fff",
              },
              onInput: (e) => {
                e.target.value = e.target.value.replace(/[^0-9]/g, "");
              },
            }}
          />
        </Grid>

        <Grid item xs={12} sm={6} md={4} lg={4} xl={4}>
          <TextField
            value={caesInfectados}
            onChange={(e) => setCaesInfectados(e.target.value)}
            size="small"
            label="Cães infectados"
            autoComplete="off"
            fullWidth
            InputProps={{
              style: {
                borderRadius: "2px",
                backgroundColor: "#fff",
              },
              onInput: (e) => {
                e.target.value = e.target.value.replace(/[^0-9]/g, "");
              },
            }}
          />
        </Grid>

        <Grid item xs={12} sm={6} md={4} lg={4} xl={4}>
          <Button
            disableElevation
            variant="contained"
            disabled={flagEnableButton}
          >
            FUZZIFICAR
          </Button>
        </Grid>

        <Grid
          item
          xs={12}
          sm={12}
          md={12}
          lg={12}
          xl={12}
          sx={{ height: 400, mt: 4 }}
        >
          <Example />
        </Grid>
      </Grid>
    </Container>
  );
}
