import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { Link, useNavigate } from "react-router-dom";
import { Alert, Container } from "@mui/material";
import axios from "../config/axios";

export default function Register() {
  const navigate = useNavigate();
  const [formData, setFormData] = React.useState({
    name: "",
    email: "",
    password: "",
    phone: "",
    mobile: "",
    zipCode: "",
    profilePic: null,
  });

  const [errors, setErrors] = React.useState({});
  const [submitError, setSubmitError] = React.useState("");

  const handleChange = (e) => {
    if (e.target.name === "profilePic") {
      setFormData({ ...formData, profilePic: e.target.files[0] });
    } else {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    // Validate form fields
    const errors = {};
    if (!formData.email.trim()) {
      errors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = "Email is invalid";
    }
    if (!formData.password.trim()) {
      errors.password = "Password is required";
    }
    if (!formData.mobile.trim()) {
      errors.mobile = "Mobile is required";
    }
    if (!formData.zipCode.trim()) {
      errors.zipCode = "Zip Code is required";
    }

    if (Object.keys(errors).length === 0) {
      try {
        await axios.post("auth/register", formData, {
          headers: {
            "Content-Type": "multipart/form-datas",
          },
        });
        navigate("/login");
      } catch (e) {
        console.log("Error", e.response.data);
        setSubmitError(
          e.response.data?.error ??
            e.response.data?.message ??
            "Something went wrong!"
        );
      }
    } else {
      setErrors(errors);
    }
  };

  return (
    <Container maxWidth="sm">
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Typography component="h1" variant="h5">
          Sign up
        </Typography>
        <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
          {submitError && <Alert severity="error">{submitError}</Alert>}
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                autoComplete="name"
                name="name"
                fullWidth
                id="name"
                label="Name"
                autoFocus
                value={formData.name}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                value={formData.email}
                onChange={handleChange}
                error={errors.email ? true : false}
                helperText={errors.email}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="new-password"
                value={formData.password}
                onChange={handleChange}
                error={errors.password ? true : false}
                helperText={errors.password}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                id="phone"
                label="Phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                fullWidth
                id="mobile"
                label="Mobile"
                name="mobile"
                value={formData.mobile}
                onChange={handleChange}
                error={errors.mobile ? true : false}
                helperText={errors.mobile}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                id="zipCode"
                label="Zip Code"
                name="zipCode"
                value={formData.zipCode}
                onChange={handleChange}
                error={errors.zipCode ? true : false}
                helperText={errors.zipCode}
              />
            </Grid>
            <Grid item xs={12}>
              <input
                accept="image/*"
                id="profilePic"
                type="file"
                name="profilePic"
                onChange={handleChange}
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Sign Up
          </Button>
          <Grid container justifyContent="flex-end">
            <Grid item>
              <Link to={"/login"}>Already have an account? Sign in</Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
}
