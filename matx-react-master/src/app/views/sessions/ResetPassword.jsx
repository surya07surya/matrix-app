import { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import axios from "axios";
import Card from "@mui/material/Card";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { styled } from "@mui/material/styles";

// --------------------
// STYLES
// --------------------
const StyledRoot = styled("div")(() => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  backgroundColor: "#1A2038",
  minHeight: "100vh",
}));

// --------------------
// COMPONENT
// --------------------
export default function ResetPassword() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const token = searchParams.get("token"); // 👈 from email link
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  // --------------------
  // SUBMIT HANDLER
  // --------------------
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!token) {
      alert("Invalid or missing reset token");
      return;
    }

    setLoading(true);

    try {
      const res = await axios.post(
        "http://localhost:5232/api/auth/reset-password",
        {
          token,
          password,
        }
      );

      alert(res.data);
      navigate("/session/signin"); // go to login
    } catch (err) {
      const message =
        err.response?.data || "Reset link expired or invalid";
      alert(message);
      console.error("Reset password error:", message);
    } finally {
      setLoading(false);
    }
  };

  // --------------------
  // UI
  // --------------------
  return (
    <StyledRoot>
      <Card sx={{ p: 4, width: 400 }}>
        <form onSubmit={handleSubmit}>
          <TextField
            type="password"
            label="New Password"
            fullWidth
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            sx={{ mb: 3 }}
          />

          <Button
            fullWidth
            type="submit"
            variant="contained"
            disabled={loading}
          >
            {loading ? "Updating..." : "Reset Password"}
          </Button>

          <Button
            fullWidth
            variant="outlined"
            sx={{ mt: 2 }}
            onClick={() => navigate("/session/signin")}
          >
            Back to Login
          </Button>
        </form>
      </Card>
    </StyledRoot>
  );
}
