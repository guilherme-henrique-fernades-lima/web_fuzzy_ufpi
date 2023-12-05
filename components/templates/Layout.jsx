import React, { useState, useEffect } from "react";
import Image from "next/image";

//Mui components
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import MenuIcon from "@mui/icons-material/Menu";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Stack from "@mui/material/Stack";
import { styled } from "@mui/material/styles";
import Grow from "@mui/material/Grow";

//Ícones
import MoreVertIcon from "@mui/icons-material/MoreVert";
import YouTubeIcon from "@mui/icons-material/YouTube";
import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";
import TwitterIcon from "@mui/icons-material/Twitter";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import QuestionAnswerRoundedIcon from "@mui/icons-material/QuestionAnswerRounded";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import PersonIcon from "@mui/icons-material/Person";
import ExitToAppRoundedIcon from "@mui/icons-material/ExitToAppRounded";
import KeyboardArrowDownRoundedIcon from "@mui/icons-material/KeyboardArrowDownRounded";

//Custom components
import TextBody from "@/components/ui/TextBody";

const DRAWER_WIDTH = 320;

const CustomListButton = styled(ListItemButton)((props) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  flexDirection: "row",
  width: "100%",
  height: 44,
  borderRadius: "50px",

  "&:hover": {
    backgroundColor: "#ffdfdf",
  },
}));

import KeyboardArrowUpRoundedIcon from "@mui/icons-material/KeyboardArrowUpRounded";

function ButtonGoTopTop() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 100) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const goToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <Grow in={isVisible}>
      <Box
        onClick={goToTop}
        sx={{
          width: { xs: 45, sm: 50, md: 55 },
          height: { xs: 45, sm: 50, md: 55 },
          borderRadius: "50%",
          backgroundColor: "#232323",
          border: "1px solid #ccc",
          position: "fixed",
          bottom: 20,
          right: 20,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          cursor: "pointer",
          zIndex: 20,
          "&:hover": {
            backgroundColor: "#464646",
          },
        }}
      >
        <KeyboardArrowUpRoundedIcon
          sx={{ color: "#fff", fontSize: { xs: 30, sm: 38 } }}
        />
      </Box>
    </Grow>
  );
}

export default function Layout(props) {
  const { children, window } = props;

  const [anchorEl, setAnchorEl] = useState(null);
  const [mobileOpen, setMobileOpen] = useState(false);

  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleDrawerToggle = () => {
    setMobileOpen((prevState) => !prevState);
  };

  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: "center" }}>
      <Divider />

      <List sx={{ width: "100%" }}>
        <ListItem sx={{ a: { width: "100%" } }}>
          <CustomListButton>
            <ListItemText primary="TESTE" />
          </CustomListButton>
        </ListItem>
      </List>
    </Box>
  );

  const container =
    window !== undefined ? () => window().document.body : undefined;

  return (
    <Box
      sx={{
        width: "100vw",
        minHeight: "100vh",
        height: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "flex-start",
        flexDirection: "column",
      }}
    >
      <AppBar component="nav" elevation={0}>
        <Toolbar
          disableGutters
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "flex-start",
            paddingLeft: { xs: "20px", md: "30px" },
            paddingRight: { xs: "20px", md: "70px" },
          }}
        >
          <Image src="/img/logo_1.png" width={70} height={60} />
          <Image
            src="/img/logo_2.jpeg"
            width={80}
            height={40}
            style={{ borderRadius: "2px" }}
          />
          <Typography
            variant="h3"
            sx={{
              fontSize: { xs: 14, sm: 16, md: 16, lg: 18 },
              fontWeight: 400,
              ml: 1,
            }}
          >
            Universidade Federal do Piauí
          </Typography>
        </Toolbar>
      </AppBar>
      <Toolbar />
      <nav>
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: "block", md: "none" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: DRAWER_WIDTH,
            },
          }}
        >
          {drawer}
        </Drawer>
      </nav>
      <Box
        sx={{
          width: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          flexDirection: "column",
          flexGrow: 1,
        }}
      >
        <Box
          component="main"
          sx={{
            width: "100%",
            height: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "flex-start",
            flexDirection: "column",
            padding: "30px",

            ["@media (max-width:600px)"]: {
              padding: "10px",
            },
          }}
        >
          {children}
        </Box>
        <FooterPage />
      </Box>
      <ButtonGoTopTop />
    </Box>
  );
}

function FooterPage(props) {
  return (
    <Box
      component="footer"
      sx={{
        width: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "flex-start",
        flexDirection: "column",
      }}
    >
      <Box
        sx={{
          width: "100%",
          padding: "20px 10px",
          backgroundColor: "#ECECEC",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          pl: 3,
          pr: 3,
          flexDirection: { xs: "column", sm: "column", md: "row" },
        }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "flex-start",
            justifyContent: "center",
            flexDirection: "column",
          }}
        >
          <Typography
            variant="p"
            sx={{
              fontSize: { xs: 14, sm: 14, md: 16 },
              color: "#232323",
              textAlign: { xs: "center", sm: "center", md: "left" },
              span: { fontWeight: 700 },
              mb: { xs: 1, sm: 1, md: 0 },
            }}
          >
            <span>Doutorando:</span> Everaldo Araújo Ferreira
          </Typography>
          <Typography
            variant="p"
            sx={{
              fontSize: { xs: 14, sm: 14, md: 16 },
              color: "#232323",
              textAlign: { xs: "center", sm: "center", md: "left" },
              span: { fontWeight: 700 },
              mb: { xs: 1, sm: 1, md: 0 },
            }}
          >
            <span>Orientadora:</span> Dra. Maria do Socorro Pires e Cruz
          </Typography>
          <Typography
            variant="p"
            sx={{
              fontSize: { xs: 14, sm: 14, md: 16 },
              color: "#232323",
              textAlign: { xs: "center", sm: "center", md: "left" },
              span: { fontWeight: 700 },
              mb: { xs: 1, sm: 1, md: 0 },
            }}
          >
            <span>Coorientador:</span> Dr. Jefferson Cruz dos Santos Leite
          </Typography>
        </Box>
        <Typography
          variant="p"
          sx={{
            fontSize: { xs: 14, sm: 14, md: 16 },
            color: "#232323",
            textAlign: { xs: "center", sm: "center", md: "right" },
            span: { fontWeight: 700 },
          }}
        >
          Programa de Pós-Graduação em Tecnologias Aplicadas a Animais de
          Interesse Regional - <span>PPGTAIR</span>
        </Typography>
      </Box>
    </Box>
  );
}
