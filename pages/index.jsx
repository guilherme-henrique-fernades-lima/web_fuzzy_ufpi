import React, { useState, useEffect, useMemo } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip as TooltipDash,
  ResponsiveContainer,
  Label,
} from "recharts";

//Mui components
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import Paper from "@mui/material/Paper";
import Tooltip from "@mui/material/Tooltip";
import Skeleton from "@mui/material/Skeleton";
import Switch from "@mui/material/Switch";

function PlotGrafico(props) {
  const CustomTooltip = ({ active, payload, label }) => {
    if (active) {
      return (
        <Box
          sx={{
            backgroundColor: "#ffffff",
            padding: "10px",
            display: "flex",
            alignItems: "flex-start",
            justifyContent: "flex-start",
            flexDirection: "column",
            boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px",
          }}
        >
          <Stack direction="row" spacing={1}>
            <Typography
              variant="span"
              sx={{
                color: "#242424",
                fontSize: { xs: 12, sm: 14, md: 16 },
                fontWeight: 700,
                mt: 1,
              }}
            >
              Dia número: {payload[0].payload.dia}
            </Typography>
          </Stack>
          <Typography
            variant="span"
            sx={{
              color: "#242424",
              fontSize: { xs: 12, sm: 14, md: 16 },
              mt: 1,
            }}
          >
            Humanos suscetíveis: {payload[0].payload.humanos_suscetiveis}
          </Typography>
          <Typography
            variant="span"
            sx={{
              color: "#242424",
              fontSize: { xs: 12, sm: 14, md: 16 },
              mt: 1,
            }}
          >
            Humanos infectados: {payload[0].payload.humanos_infectados}
          </Typography>
          <Typography
            variant="span"
            sx={{
              color: "#242424",
              fontSize: { xs: 12, sm: 14, md: 16 },
              mt: 1,
            }}
          >
            Flebotomíneos suscetíveis:{" "}
            {payload[0].payload.flebotomineos_suscetiveis}
          </Typography>
          <Typography
            variant="span"
            sx={{
              color: "#242424",
              fontSize: { xs: 12, sm: 14, md: 16 },
              mt: 1,
            }}
          >
            Flebotomíneos infectados:{" "}
            {payload[0].payload.flebotomineos_infectados}
          </Typography>

          <Typography
            variant="span"
            sx={{
              color: "#242424",
              fontSize: { xs: 12, sm: 14, md: 16 },
              mt: 1,
            }}
          >
            Cães suscetíveis: {payload[0].payload.caes_suscetiveis}
          </Typography>

          <Typography
            variant="span"
            sx={{
              color: "#242424",
              fontSize: { xs: 12, sm: 14, md: 16 },
              mt: 1,
            }}
          >
            Cães infectados: {payload[0].payload.caes_infectados}
          </Typography>
        </Box>
      );
    }
    return null;
  };

  return (
    <ResponsiveContainer width="100%" height="100%">
      <LineChart
        width={500}
        height={300}
        data={props.data}
        margin={{
          top: 0,
          right: 20,
          left: 20,
          bottom: 40,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis
          dataKey="dia"
          type="number"
          domain={[0, props?.data?.length - 1]}
          tickCount={11}
        >
          <Label
            style={{
              fontWeight: 700,
              fill: "#232323",
            }}
            dy={25}
            value="Tempo (em dias)"
          />
        </XAxis>
        <YAxis tickCount={11} domain={[0, 1]}>
          <Label
            style={{
              angle: -90,
              fontWeight: 700,
              fill: "#232323",
            }}
            dx={-35}
            angle={-90}
            value="Densidade Populacional"
          />
        </YAxis>

        {props.showTooltip && (
          <TooltipDash content={CustomTooltip} cursor={{ fill: "#ececec" }} />
        )}

        <Line
          type="monotone"
          dataKey="humanos_suscetiveis"
          isAnimationActive={false}
          stroke="#0a22fa"
          activeDot={{ r: 2 }}
          dot={false}
          strokeDasharray="4 4 4"
        />
        <Line
          type="monotone"
          dataKey="humanos_infectados"
          isAnimationActive={false}
          stroke="#0a22fa"
          dot={false}
          activeDot={{ r: 2 }}
        />
        <Line
          type="monotone"
          dataKey="flebotomineos_suscetiveis"
          isAnimationActive={false}
          stroke="#e31809"
          activeDot={{ r: 2 }}
          dot={false}
          strokeDasharray="4 4 4"
        />
        <Line
          type="monotone"
          dataKey="flebotomineos_infectados"
          isAnimationActive={false}
          stroke="#e31809"
          dot={false}
          activeDot={{ r: 2 }}
        />
        <Line
          type="monotone"
          dataKey="caes_suscetiveis"
          isAnimationActive={false}
          stroke="#000"
          activeDot={{ r: 2 }}
          dot={false}
          strokeDasharray="4 4 4"
        />
        <Line
          type="monotone"
          dataKey="caes_infectados"
          isAnimationActive={false}
          stroke="#000"
          activeDot={{ r: 2 }}
          dot={false}
        />
      </LineChart>
    </ResponsiveContainer>
  );
}

const NumberTextField = ({ label, value, onChange }) => {
  return (
    <Grid item xs={12} sm={6} md={4} lg={4} xl={4}>
      <TextField
        value={value}
        onChange={(e) => onChange(e.target.value)}
        size="small"
        label={label}
        autoComplete="off"
        fullWidth
        InputProps={{
          style: {
            borderRadius: "2px",
          },
          onInput: (e) => {
            e.target.value = e.target.value.replace(/[^0-9.]/g, "");
          },
        }}
      />
    </Grid>
  );
};

export default function MainPage() {
  const [dashData, setDashData] = useState([]);

  const [humanosSuscetiveis, setHumanosSuscetiveis] = useState(0.7);
  const [humanosInfectados, setHumanosInfectados] = useState(0);
  const [flebotomineosSuscetiveis, setFlebotomineosSuscetiveis] =
    useState(0.24);
  const [flebotomineosInfectados, setFlebotomineosInfectados] = useState(0.01);
  const [caesSuscetiveis, setCaesSuscetiveis] = useState(0.6);
  const [caesInfectados, setCaesInfectados] = useState(0);

  const [showTooltip, setShowTooltip] = useState(false);

  useEffect(() => {
    loadData();
  }, []);

  const data = useMemo(() => {
    if (dashData) {
      return dashData?.map((item, index) => ({
        dia: index,
        humanos_suscetiveis: item[0],
        humanos_infectados: item[1],
        flebotomineos_suscetiveis: item[2],
        flebotomineos_infectados: item[3],
        caes_suscetiveis: item[4],
        caes_infectados: item[5],
      }));
    } else {
      return [];
    }
  }, [dashData]);

  async function loadData() {
    const res = await fetch(`/api/fuzzy`, {
      method: "GET",
    });

    if (res.ok) {
      const json = await res.json();
      setDashData(json);
    }
  }

  const handleInputChange = (value, setStateFunction) => {
    // Verificar se o valor inserido é um número ou contém apenas um ponto
    if (/^\d*\.?\d*$/.test(value)) {
      setStateFunction(parseFloat(value));
    }
  };

  console.log("humanosSuscetiveis: ", humanosSuscetiveis);
  console.log("humanosInfectados: ", humanosInfectados);
  console.log("flebotomineosSuscetiveis: ", flebotomineosSuscetiveis);
  console.log("flebotomineosInfectados: ", flebotomineosInfectados);
  console.log("caesSuscetiveis: ", caesSuscetiveis);
  console.log("caesInfectados: ", caesInfectados);

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
          {/* <Grid item xs={12} sm={6} md={4} lg={4} xl={4}>
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
          </Grid> */}

          <NumberTextField
            label="Humanos suscetíveis"
            value={humanosSuscetiveis}
            onChange={(value) =>
              handleInputChange(value, setHumanosSuscetiveis)
            }
          />
          <NumberTextField
            label="Humanos infectados"
            value={humanosInfectados}
            onChange={(value) => handleInputChange(value, setHumanosInfectados)}
          />
          <NumberTextField
            label="Flebotomíneos suscetíveis"
            value={flebotomineosSuscetiveis}
            onChange={(value) =>
              handleInputChange(value, setFlebotomineosSuscetiveis)
            }
          />
          <NumberTextField
            label="Vetores flebotomíneos infectados"
            value={flebotomineosInfectados}
            onChange={(value) =>
              handleInputChange(value, setFlebotomineosInfectados)
            }
          />
          <NumberTextField
            label="Cães suscetíveis"
            value={caesSuscetiveis}
            onChange={(value) => handleInputChange(value, setCaesSuscetiveis)}
          />
          <NumberTextField
            label="Cães infectados"
            value={caesInfectados}
            onChange={(value) => handleInputChange(value, setCaesInfectados)}
          />

          <Grid item xs={12} sm={6} md={4} lg={4} xl={4}>
            <Button
              disableElevation
              variant="contained"
              disabled={flagEnableButton}
            >
              Computar dados
            </Button>
          </Grid>

          <Grid
            item
            xs={12}
            sm={12}
            md={12}
            lg={12}
            xl={12}
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "flex-end",
              flexDirection: "row",
              width: "100%",
            }}
          >
            <Tooltip placement="top" title="Exibir detalhes">
              <Switch
                checked={showTooltip}
                onChange={() => {
                  setShowTooltip((showTooltip) => !showTooltip);
                }}
                sx={{ mb: 1 }}
              />
            </Tooltip>
          </Grid>

          <Grid
            item
            xs={12}
            sm={12}
            md={12}
            lg={12}
            xl={12}
            sx={{ height: 430, mb: 2 }}
          >
            {dashData?.length > 0 ? (
              <PlotGrafico data={data} showTooltip={showTooltip} />
            ) : (
              <Skeleton variant="rectangular" width={"100%"} height={"100%"} />
            )}
          </Grid>
        </Grid>
      </Paper>
    </Container>
  );
}
