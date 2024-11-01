import React, { useState, useMemo } from "react";
import toast, { Toaster } from "react-hot-toast";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip as TooltipDash,
  ResponsiveContainer,
  Label,
  Legend,
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
import FormControlLabel from "@mui/material/FormControlLabel";

//Icons
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import TipsAndUpdatesOutlinedIcon from "@mui/icons-material/TipsAndUpdatesOutlined";

const renderLegend = ({ payload }) => {
  const entryFormatted = (value) => {
    switch (value) {
      case "humanos_suscetiveis":
        return "Humanos Suscetíveis";
      case "humanos_infectados":
        return "Humanos Infectados";
      case "flebotomineos_suscetiveis":
        return "Flebotomíneos Suscetíveis";
      case "flebotomineos_infectados":
        return "Flebotomíneos Infectados";
      case "caes_suscetiveis":
        return "Cães Suscetíveis";
      case "caes_infectados":
        return "Cães Infectados";
      case "encoleirados_suscetiveis":
        return "Cães encoleirados suscetíveis";
      case "encoleirados_infectados":
        return "Cães encoleirados infectados";
      default:
        return value;
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexWrap: "wrap",
      }}
    >
      <ul
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexWrap: "wrap",
          marginTop: "40px",
        }}
      >
        {payload?.map((entry, index) => (
          <li
            key={`item-${index}`}
            style={{
              display: "flex",
              alignItems: "center",
              marginRight: "20px",
              color: entry.color,
            }}
          >
            <Box
              sx={{
                width: 24,
                height: 1,
                marginRight: 1,
                border: entry.payload.strokeDasharray
                  ? `1px dashed ${entry.color}`
                  : `1px solid ${entry.color}`,
              }}
            />
            {entryFormatted(entry.value)}
          </li>
        ))}
      </ul>
    </Box>
  );
};

function PlotGrafico(props) {
  const CustomTooltip = ({ active, payload, label }) => {
    if (active) {
      return (
        <Box
          sx={{
            padding: 2,
            backgroundColor: "#fff",
            display: "flex",
            alignItems: "flex-start",
            justifyContent: "flex-start",
            flexDirection: "column",
            borderRadius: "2px",
            boxShadow: "rgba(0, 0, 0, 0.56) 0px 22px 70px 4px",
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

          <Typography
            variant="span"
            sx={{
              color: "#242424",
              fontSize: { xs: 12, sm: 14, md: 16 },
              mt: 1,
            }}
          >
            Cães encoleirados suscetíveis:{" "}
            {payload[0].payload.encoleirados_suscetiveis}
          </Typography>

          <Typography
            variant="span"
            sx={{
              color: "#242424",
              fontSize: { xs: 12, sm: 14, md: 16 },
              mt: 1,
            }}
          >
            Cães encoleirados infectados:{" "}
            {payload[0].payload.encoleirados_infectados}
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
        <YAxis
          tickCount={11}
          domain={[0, 1]}
          tickFormatter={(tick) => tick.toFixed(1)}
        >
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

        <Legend content={renderLegend} />

        <Line
          type="monotone"
          dataKey="humanos_suscetiveis"
          isAnimationActive={false}
          stroke="#1303ee"
          activeDot={{ r: 2 }}
          dot={false}
          strokeDasharray="4 4 4"
          strokeWidth={1}
        />
        <Line
          type="monotone"
          dataKey="humanos_infectados"
          isAnimationActive={false}
          stroke="#0a7afa"
          dot={false}
          activeDot={{ r: 2 }}
          strokeWidth={1}
        />
        <Line
          type="monotone"
          dataKey="flebotomineos_suscetiveis"
          isAnimationActive={false}
          stroke="#ff1100"
          activeDot={{ r: 2 }}
          dot={false}
          strokeDasharray="4 4 4"
          strokeWidth={1}
        />
        <Line
          type="monotone"
          dataKey="flebotomineos_infectados"
          isAnimationActive={false}
          stroke="#ff1100"
          dot={false}
          activeDot={{ r: 2 }}
          strokeWidth={1}
        />
        <Line
          type="monotone"
          dataKey="caes_suscetiveis"
          isAnimationActive={false}
          stroke="#000"
          activeDot={{ r: 2 }}
          dot={false}
          strokeDasharray="4 4 4"
          strokeWidth={1}
        />
        <Line
          type="monotone"
          dataKey="caes_infectados"
          isAnimationActive={false}
          stroke="#000"
          activeDot={{ r: 2 }}
          dot={false}
          strokeWidth={1}
        />

        <Line
          type="monotone"
          dataKey="encoleirados_suscetiveis"
          isAnimationActive={false}
          stroke="#fa01c4"
          activeDot={{ r: 2 }}
          dot={false}
          strokeDasharray="4 4 4"
          strokeWidth={1}
        />

        <Line
          type="monotone"
          dataKey="encoleirados_infectados"
          isAnimationActive={false}
          stroke="#fa01c4"
          activeDot={{ r: 2 }}
          dot={false}
          strokeWidth={1}
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
    <Grid item xs={12} sm={6} md={6} lg={6} xl={6}>
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
        inputProps={{
          maxLength: 7,
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
  const [encoleiramentoCaesSuscetiveis, setEncoleiramentoCaesSuscetiveis] =
    useState("0");
  const [encoleiramentoCaesInfectados, setEncoleiramentoCaesInfectados] =
    useState("0");
  const [gammaC, setGammaC] = useState("0.001");
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
        encoleirados_suscetiveis: item[6],
        encoleirados_infectados: item[7],
      }));
    } else {
      return [];
    }
  }, [dashData]);

  async function loadData() {
    setLoading(true);

    try {
      const res = await fetch(
        `/api/fuzzy/?tempo=${tempo}&humanos_suscetiveis=${humanosSuscetiveis}&humanos_infectados=${humanosInfectados}&flebotomineos_suscetiveis=${flebotomineosSuscetiveis}&flebotomineos_infectados=${flebotomineosInfectados}&caes_suscetiveis=${caesSuscetiveis}&caes_infectados=${caesInfectados}&encoleiramento_caes_suscetiveis=${encoleiramentoCaesSuscetiveis}&encoleiramento_caes_infectados=${encoleiramentoCaesInfectados}&gamma_c=${gammaC}`,
        {
          method: "GET",
        }
      );

      if (res.ok) {
        const json = await res.json();
        setDashData(json);
        setLoading(false);
        toast.success("Fuzzyficação realizada com sucesso");
      } else {
        toast.error(
          "Erro ao fuzzyficar, verifique os valores do input e tente novamente"
        );
        setDashData([]);
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
      caesInfectados.trim() === "." ||
      encoleiramentoCaesInfectados === undefined ||
      encoleiramentoCaesInfectados.trim() === "" ||
      encoleiramentoCaesInfectados.trim() === "." ||
      encoleiramentoCaesSuscetiveis === undefined ||
      encoleiramentoCaesSuscetiveis.trim() === "" ||
      encoleiramentoCaesSuscetiveis.trim() === "." ||
      gammaC === undefined ||
      gammaC.trim() === "" ||
      gammaC.trim() === "."
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
    setEncoleiramentoCaesSuscetiveis("");
    setEncoleiramentoCaesInfectados("");
    setGammaC("");
    setDashData([]);
    setLoading(false);
  }

  function fillInitialCondition() {
    setHumanosSuscetiveis("0.7");
    setHumanosInfectados("0");
    setFlebotomineosSuscetiveis("0.24");
    setFlebotomineosInfectados("0.01");
    setCaesSuscetiveis("0.6");
    setCaesInfectados("0");
    setEncoleiramentoCaesSuscetiveis("0");
    setEncoleiramentoCaesInfectados("0");
    setGammaC("0.001");
    setTempo(5);
  }

  return (
    <Container disableGutters>
      <Toaster position="bottom-center" reverseOrder={false} />
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
            label="Flebotomíneos infectados"
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

          <NumberTextField
            label="Encoleiramento de cães suscetíveis"
            value={encoleiramentoCaesSuscetiveis}
            onChange={(value) =>
              handleInputChange(value, setEncoleiramentoCaesSuscetiveis)
            }
          />

          <NumberTextField
            label="Encoleiramento de cães infectados"
            value={encoleiramentoCaesInfectados}
            onChange={(value) =>
              handleInputChange(value, setEncoleiramentoCaesInfectados)
            }
          />

          <NumberTextField
            label="Gamma C"
            value={gammaC}
            onChange={(value) => handleInputChange(value, setGammaC)}
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
              max={15}
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
                <FormControlLabel
                  control={
                    <Switch
                      checked={showTooltip}
                      onChange={() => {
                        setShowTooltip((state) => !state);
                      }}
                    />
                  }
                  label="Exibir detalhes"
                  labelPlacement="start"
                />
              </Grid>

              <Grid
                item
                xs={12}
                sm={12}
                md={12}
                lg={12}
                xl={12}
                sx={{ height: 460, mb: 2 }}
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
