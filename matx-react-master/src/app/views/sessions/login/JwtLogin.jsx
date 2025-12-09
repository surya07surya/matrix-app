import { NavLink } from "react-router-dom";
import { Formik } from "formik";
import * as Yup from "yup";

import Card from "@mui/material/Card";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid2";
import styled from "@mui/material/styles/styled";
import useTheme from "@mui/material/styles/useTheme";
import LoadingButton from "@mui/lab/LoadingButton";

import useAuth from "app/hooks/useAuth";
import { Paragraph } from "app/components/Typography";

// ============================
// CENTER THE WHOLE PAGE
// ============================
const Root = styled("div")(() => ({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  minHeight: "100vh",
  backgroundColor: "#1A2038",
  padding: "20px",
}));

// ============================
// CARD WRAPPER
// ============================
const StyledCard = styled(Card)(() => ({
  maxWidth: 900,
  width: "100%",
  borderRadius: 16,
  overflow: "hidden",
  display: "flex",
}));

// ============================
// IMAGE BOX
// ============================
const ImageBox = styled("div")(() => ({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  background: "#ffffff",
  height: "100%",
  padding: "2rem",
}));

// ============================
// FORM BOX
// ============================
const FormBox = styled("div")(() => ({
  padding: "40px 30px",
}));

// ============================
// VALIDATION SCHEMA
// ============================
const validationSchema = Yup.object().shape({
  email: Yup.string().email("Invalid Email").required("Email required"),
  password: Yup.string().min(6).required("Password required"),
});

// ============================
// INITIAL VALUES (EMPTY FIELDS)
// ============================
const initialValues = {
  email: "",
  password: "",
};
 
export default function JwtLogin() {
  const theme = useTheme();
  const { login } = useAuth();

  const handleFormSubmit = async (values) => {
    const success = await login(values.email, values.password);

    if (success) {
      window.location.href = "/";
    } else {
      alert("Invalid email or password");
    }
  };

  return (
    <Root>
      <StyledCard>
        <Grid container>
          {/* LEFT SIDE IMAGE */}
          <Grid size={{ md: 6, xs: 12 }}>
            <ImageBox>
              <img
                src="/assets/images/illustrations/dreamer.svg"
                width="100%"
                alt="Login"
              />
            </ImageBox>
          </Grid>

          {/* RIGHT SIDE FORM */}
          <Grid size={{ md: 6, xs: 12 }}>
            <FormBox>
              <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={handleFormSubmit}
              >
                {({
                  values,
                  errors,
                  touched,
                  handleChange,
                  handleBlur,
                  handleSubmit,
                }) => (
                  <form onSubmit={handleSubmit} autoComplete="off">
                    
                    {/* EMAIL FIELD */}
                    <TextField
                      fullWidth
                      size="small"
                      name="email"
                      label="Email"
                      variant="outlined"
                      value={values.email}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      autoComplete="new-email"
                      error={touched.email && Boolean(errors.email)}
                      helperText={touched.email && errors.email}
                      sx={{ mb: 3 }}
                    />

                    {/* PASSWORD FIELD */}
                    <TextField
                      fullWidth
                      size="small"
                      type="password"
                      name="password"
                      label="Password"
                      variant="outlined"
                      value={values.password}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      autoComplete="new-password"
                      error={touched.password && Boolean(errors.password)}
                      helperText={touched.password && errors.password}
                      sx={{ mb: 3 }}
                    />

                    {/* LOGIN BUTTON */}
                    <LoadingButton
                      fullWidth
                      type="submit"
                      color="primary"
                      variant="contained"
                      sx={{ mb: 3 }}
                    >
                      Login
                    </LoadingButton>

                    {/* REGISTER LINK */}
                    <Paragraph textAlign="center">
                      Don’t have an account?
                      <NavLink
                        to="/session/signup"
                        style={{
                          color: theme.palette.primary.main,
                          marginLeft: 5,
                        }}
                      >
                        Register
                      </NavLink>
                    </Paragraph>
                  </form>
                )}
              </Formik>
            </FormBox>
          </Grid>
        </Grid>
      </StyledCard>
    </Root>
  );
}



