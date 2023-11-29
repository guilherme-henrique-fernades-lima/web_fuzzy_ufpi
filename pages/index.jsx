import React, { useState, useEffect } from "react";
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
import Paper from "@mui/material/Paper";

const data = [
  {
    name: "p1",
    humanos_suscetiveis: 244,
    humanos_infectados: 1333,
    flebotomineos_suscetiveis: 100,
    flebotomineos_infectados: 333,
    caes_suscetiveis: 533,
    caes_infectados: 2333,
  },
  {
    name: "p2",
    humanos_suscetiveis: 244,
    humanos_infectados: 1333,
    flebotomineos_suscetiveis: 100,
    flebotomineos_infectados: 333,
    caes_suscetiveis: 533,
    caes_infectados: 2333,
  },
  {
    name: "p3",
    humanos_suscetiveis: 244,
    humanos_infectados: 1333,
    flebotomineos_suscetiveis: 100,
    flebotomineos_infectados: 333,
    caes_suscetiveis: 533,
    caes_infectados: 2333,
  },
  {
    name: "p4",
    humanos_suscetiveis: 244,
    humanos_infectados: 1333,
    flebotomineos_suscetiveis: 100,
    flebotomineos_infectados: 333,
    caes_suscetiveis: 533,
    caes_infectados: 2333,
  },
  {
    name: "p5",
    humanos_suscetiveis: 244,
    humanos_infectados: 1333,
    flebotomineos_suscetiveis: 100,
    flebotomineos_infectados: 333,
    caes_suscetiveis: 533,
    caes_infectados: 2333,
  },
  {
    name: "p6",
    humanos_suscetiveis: 244,
    humanos_infectados: 1333,
    flebotomineos_suscetiveis: 100,
    flebotomineos_infectados: 333,
    caes_suscetiveis: 533,
    caes_infectados: 2333,
  },
];

function PlotGrafico() {
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
        <XAxis
          dataKey="name"
          label={{
            value: "Tempo (em dias)",
          }}
          tick={false}
        />
        <YAxis
          label={{
            value: "Densidade Populacional",
            angle: -90,
            padding: 20,
            // position: "insideLeft",
          }}
          tick={false}
        />
        {/* <Tooltip /> */}
        <Legend />
        <Line
          type="monotone"
          dataKey="humanos_suscetiveis"
          stroke="#0a22fa"
          activeDot={{ r: 2 }}
          dot={false}
          strokeDasharray="4 4 4"
        />
        <Line
          type="monotone"
          dataKey="humanos_infectados"
          stroke="#0a22fa"
          dot={false}
          activeDot={{ r: 2 }}
        />
        <Line
          type="monotone"
          dataKey="flebotomineos_suscetiveis"
          stroke="#e31809"
          activeDot={{ r: 2 }}
          dot={false}
          strokeDasharray="4 4 4"
        />
        <Line
          type="monotone"
          dataKey="flebotomineos_infectados"
          stroke="#e31809"
          dot={false}
          activeDot={{ r: 2 }}
        />
        <Line
          type="monotone"
          dataKey="caes_suscetiveis"
          stroke="#000"
          activeDot={{ r: 2 }}
          dot={false}
          strokeDasharray="4 4 4"
        />
        <Line
          type="monotone"
          dataKey="caes_infectados"
          stroke="#000"
          activeDot={{ r: 2 }}
          dot={false}
        />
      </LineChart>
    </ResponsiveContainer>
  );
}

export default function MainPage() {
  const [P, setP] = useState();
  const [humanosSuscetiveis, setHumanosSuscetiveis] = useState(0.7);
  const [humanosInfectados, setHumanosInfectados] = useState(0);
  const [flebotomineosSuscetiveis, setFlebotomineosSuscetiveis] =
    useState(0.24);
  const [flebotomineosInfectados, setFlebotomineosInfectados] = useState(0.01);
  const [caesSuscetiveis, setCaesSuscetiveis] = useState(0.6);
  const [caesInfectados, setCaesInfectados] = useState(0);

  useEffect(() => {
    loadData();
  }, []);

  async function loadData() {
    const res = await fetch(`/api/fuzzy`, {
      method: "GET",
      // headers: {
      //   "X-Requested-With": "XMLHttpRequest",
      //   "Content-Type": "application/json;charset=UTF-8",
      // },
    });

    if (res.ok) {
      const json = await res.json();
      setP(json);
    }
  }

  //data [0.7, 0, 0.24, 0.01, 0.6, 0];

  function enableButton() {
    if (
      humanosSuscetiveis &&
      humanosInfectados &&
      flebotomineosSuscetiveis &&
      flebotomineosInfectados &&
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
      <Paper elevation={24} sx={{ p: 2 }}>
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
                },
                onInput: (e) => {
                  e.target.value = e.target.value.replace(/[^0-9]/g, "");
                },
              }}
            />
          </Grid>

          <Grid item xs={12} sm={6} md={4} lg={4} xl={4}>
            <TextField
              value={flebotomineosSuscetiveis}
              onChange={(e) => setFlebotomineosSuscetiveis(e.target.value)}
              size="small"
              label="Flebotomíneos suscetíveis"
              autoComplete="off"
              fullWidth
              InputProps={{
                style: {
                  borderRadius: "2px",
                },
                onInput: (e) => {
                  e.target.value = e.target.value.replace(/[^0-9]/g, "");
                },
              }}
            />
          </Grid>

          <Grid item xs={12} sm={6} md={4} lg={4} xl={4}>
            <TextField
              value={flebotomineosInfectados}
              onChange={(e) => setFlebotomineosInfectados(e.target.value)}
              size="small"
              label="Vetores flebotomíneos infectados"
              autoComplete="off"
              fullWidth
              InputProps={{
                style: {
                  borderRadius: "2px",
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
            <PlotGrafico />
          </Grid>
        </Grid>
      </Paper>
    </Container>
  );
}
