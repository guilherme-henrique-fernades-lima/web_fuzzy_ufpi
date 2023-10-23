import Typography from "@mui/material/Typography";

export default function TextTitle(props) {
  const { children } = props;

  return (
    <Typography
      {...props}
      variant="h3"
      component="h3"
      color="text.primary"
      sx={{
        fontSize: { xs: 16, sm: 20, md: 20, lg: 24 },
        fontWeight: 700,
        lineHeight: "36px",
      }}
    >
      {children}
    </Typography>
  );
}
