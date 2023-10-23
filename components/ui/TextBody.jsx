//Mui components
import Typography from "@mui/material/Typography";

export default function TextBody(props) {
  const { children } = props;

  return (
    <Typography
      {...props}
      //   variant="p"
      //   component="p"
      color="text.secondary"
      sx={{
        fontSize: { xs: 12, sm: 14 },
        lineHeight: "24px",
        fontWeight: props.bold ? 700 : 400,
        textAlign: props.textAlign == "center" ? "center" : "left",
      }}
    >
      {children}
    </Typography>
  );
}
