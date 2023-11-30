import React, { useState, useMemo } from "react";
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
import LoadingButton from "@mui/lab/LoadingButton";
import Slider from "@mui/material/Slider";

//Icons
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import TipsAndUpdatesOutlinedIcon from "@mui/icons-material/TipsAndUpdatesOutlined";

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
            borderRadius: "2px",
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

  const memoizedChart = useMemo(() => {
    return (
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
          stroke="#0a7afa"
          activeDot={{ r: 2 }}
          dot={false}
          strokeDasharray="4 4 4"
        />
        <Line
          type="monotone"
          dataKey="humanos_infectados"
          isAnimationActive={false}
          stroke="#0a7afa"
          dot={false}
          activeDot={{ r: 2 }}
        />
        <Line
          type="monotone"
          dataKey="flebotomineos_suscetiveis"
          isAnimationActive={false}
          stroke="#ff1100"
          activeDot={{ r: 2 }}
          dot={false}
          strokeDasharray="4 4 4"
        />
        <Line
          type="monotone"
          dataKey="flebotomineos_infectados"
          isAnimationActive={false}
          stroke="#ff1100"
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
    );
  }, [props.data, props.showTooltip]);

  return (
    <ResponsiveContainer width="100%" height="100%">
      {memoizedChart}
    </ResponsiveContainer>
  );
}

const NumberTextField = ({ label, value, onChange }) => {
  return (
    <Grid item xs={12} sm={6} md={4} lg={4} xl={4}>
      <TextField
        value={value}
        onChange={(e) => onChange(e)}
        size="small"
        label={label}
        autoComplete="off"
        fullWidth
        InputProps={{
          style: {
            borderRadius: "2px",
          },
        }}
      />
    </Grid>
  );
};

export default function MainPage() {
  //Dados retornados pela API
  const [dashData, setDashData] = useState([]);

  //Estados com as variáveis para 'fuzzificação'
  const [humanosSuscetiveis, setHumanosSuscetiveis] = useState("0.7");
  const [humanosInfectados, setHumanosInfectados] = useState("0");
  const [flebotomineosSuscetiveis, setFlebotomineosSuscetiveis] =
    useState("0.24");
  const [flebotomineosInfectados, setFlebotomineosInfectados] =
    useState("0.01");
  const [caesSuscetiveis, setCaesSuscetiveis] = useState("0.6");
  const [caesInfectados, setCaesInfectados] = useState("0");
  const [tempo, setTempo] = useState(5);

  //Flags para controle de UI
  const [showTooltip, setShowTooltip] = useState(false);
  const [loading, setLoading] = useState(false);

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
    setLoading(true);

    try {
      const res = await fetch(
        `/api/fuzzy/?tempo=${tempo}&humanos_suscetiveis=${humanosSuscetiveis}&humanos_infectados=${humanosInfectados}&flebotomineos_suscetiveis=${flebotomineosSuscetiveis}&flebotomineos_infectados=${flebotomineosInfectados}&caes_suscetiveis=${caesSuscetiveis}&caes_infectados=${caesInfectados}`,
        {
          method: "GET",
        }
      );

      if (res.ok) {
        const json = await res.json();
        setDashData(json);
        setLoading(false);
      }
    } catch (e) {
      console.log("Erro: ", e);
    } finally {
      setLoading(false);
    }
  }

  const handleInputChange = (e, setStateFunction) => {
    // Substitui tudo que não for número ou ponto por uma string vazia
    let sanitizedValue = e.target.value.replace(/[^0-9.,]/g, "");
    // Se a vírgula estiver no final, substitua por ponto
    sanitizedValue = sanitizedValue.replace(",", ".");
    // Garante que exista apenas um ponto decimal
    const dots = sanitizedValue.split(".").length - 1;
    if (dots <= 1) {
      setStateFunction(sanitizedValue);
    }
  };

  function enableButton() {
    // A função agora verifica se todos os valores são undefined, vazios ou contêm apenas espaços ou apenas "."
    if (
      humanosSuscetiveis === undefined ||
      humanosSuscetiveis.trim() === "" ||
      humanosSuscetiveis.trim() === "." ||
      humanosInfectados === undefined ||
      humanosInfectados.trim() === "" ||
      humanosInfectados.trim() === "." ||
      flebotomineosSuscetiveis === undefined ||
      flebotomineosSuscetiveis.trim() === "" ||
      flebotomineosSuscetiveis.trim() === "." ||
      flebotomineosInfectados === undefined ||
      flebotomineosInfectados.trim() === "" ||
      flebotomineosInfectados.trim() === "." ||
      caesSuscetiveis === undefined ||
      caesSuscetiveis.trim() === "" ||
      caesSuscetiveis.trim() === "." ||
      caesInfectados === undefined ||
      caesInfectados.trim() === "" ||
      caesInfectados.trim() === "."
    ) {
      return true;
    } else {
      return false;
    }
  }

  const flagEnableButton = enableButton();

  function cleanDisplayData() {
    setHumanosSuscetiveis("");
    setHumanosInfectados("");
    setFlebotomineosSuscetiveis("");
    setFlebotomineosInfectados("");
    setCaesSuscetiveis("");
    setCaesInfectados("");
    setDashData([]);
  }

  function fillInitialCondition() {
    setHumanosSuscetiveis("0.7");
    setHumanosInfectados("0");
    setFlebotomineosSuscetiveis("0.24");
    setFlebotomineosInfectados("0.01");
    setCaesSuscetiveis("0.6");
    setCaesInfectados("0");
    setTempo(5);
  }

  return (
    <Container disableGutters>
      <Paper elevation={24} sx={{ p: 2 }}>
        <Grid container spacing={1}>
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

          <Grid item xs={12}>
            <Typography
              sx={{
                color: "#242424",
                fontSize: { xs: 12, sm: 14, md: 16 },
                fontWeight: 700,
                mt: 1,
              }}
            >
              Tempo (Em anos) {tempo}
            </Typography>
            <Slider
              value={tempo}
              valueLabelDisplay="auto"
              step={1}
              marks
              min={1}
              max={10}
              onChange={(event, newValue) => {
                setTempo(newValue);
              }}
            />
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
              justifyContent: "flex-start",
              flexDirection: "row",
            }}
          >
            <LoadingButton
              loading={loading}
              disableElevation
              variant="contained"
              disabled={flagEnableButton}
              onClick={loadData}
              sx={{ textTransform: "unset ! important", fontWeight: 700 }}
            >
              Defuzzyficação
            </LoadingButton>
            <Tooltip
              placement="top"
              title="Preencher com condição inicial padrão"
            >
              <Button
                disableElevation
                sx={{ ml: 1 }}
                variant="contained"
                onClick={fillInitialCondition}
              >
                <TipsAndUpdatesOutlinedIcon />
              </Button>
            </Tooltip>

            <Tooltip placement="top" title="Apagar dados">
              <Button
                disableElevation
                sx={{ ml: 1 }}
                color="error"
                variant="contained"
                onClick={cleanDisplayData}
              >
                <DeleteOutlineIcon />
              </Button>
            </Tooltip>
          </Grid>
          {dashData?.length != 0 && (
            <>
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
                  <Skeleton
                    variant="rectangular"
                    width={"100%"}
                    height={"100%"}
                  />
                )}
              </Grid>
            </>
          )}
        </Grid>
      </Paper>
    </Container>
  );
}
