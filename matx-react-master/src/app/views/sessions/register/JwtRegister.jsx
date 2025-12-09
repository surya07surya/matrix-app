import { NavLink } from "react-router-dom";
import { Formik } from "formik";
import * as Yup from "yup";

import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid2";
import Checkbox from "@mui/material/Checkbox";
import TextField from "@mui/material/TextField";
import styled from "@mui/material/styles/styled";
import useTheme from "@mui/material/styles/useTheme";
import LoadingButton from "@mui/lab/LoadingButton";

import useAuth from "app/hooks/useAuth";
import { Paragraph } from "app/components/Typography";

// WRAPPER
const Root = styled("div")(() => ({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  minHeight: "100vh",
  background: "#1A2038",
}));

const ContentBox = styled("div")(() => ({
  padding: "32px",
}));

// VALIDATION
const validationSchema = Yup.object().shape({
  username: Yup.string().required("Username required"),
  email: Yup.string().email("Invalid").required("Email required"),
  password: Yup.string().min(6).required("Password required"),
});

const initialValues = {
  username: "",
  email: "",
  password: "",
  remember: false,
};

export default function JwtRegister() {
  const theme = useTheme();
  const { register } = useAuth();

  const handleSubmit = async (values) => {
    const success = await register(values.email, values.username, values.password);

    if (success) {
      alert("Registration successful! Please login.");
      window.location.href = "/session/signin";
    }
  };

  return (
    <Root>
      <Card sx={{ maxWidth: 800 }}>
        <Grid container>
          <Grid size={{ md: 6 }}>
            <ContentBox>
              <img src="/assets/images/illustrations/posting_photo.svg" width="100%" alt="" />
            </ContentBox>
          </Grid>

          <Grid size={{ md: 6 }}>
            <Box p={4}>
              <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleSubmit}>
                {({
                  values,
                  errors,
                  touched,
                  handleChange,
                  handleSubmit,
                }) => (
                  <form onSubmit={handleSubmit}>
                    <TextField
                      fullWidth
                      label="Username"
                      name="username"
                      value={values.username}
                      onChange={handleChange}
                      error={Boolean(touched.username && errors.username)}
                      helperText={touched.username && errors.username}
                      sx={{ mb: 3 }}
                    />

                    <TextField
                      fullWidth
                      label="Email"
                      name="email"
                      value={values.email}
                      onChange={handleChange}
                      error={Boolean(touched.email && errors.email)}
                      helperText={touched.email && errors.email}
                      sx={{ mb: 3 }}
                    />

                    <TextField
                      fullWidth
                      type="password"
                      label="Password"
                      name="password"
                      value={values.password}
                      onChange={handleChange}
                      error={Boolean(touched.password && errors.password)}
                      helperText={touched.password && errors.password}
                      sx={{ mb: 3 }}
                    />

                    <LoadingButton type="submit" variant="contained" fullWidth>
                      Register
                    </LoadingButton>

                    <Paragraph textAlign="center" mt={2}>
                      Already have an account?
                      <NavLink to="/session/signin" style={{ color: theme.palette.primary.main, marginLeft: 5 }}>
                        Login
                      </NavLink>
                    </Paragraph>
                  </form>
                )}
              </Formik>
            </Box>
          </Grid>
        </Grid>
      </Card>
    </Root>
  );
}

