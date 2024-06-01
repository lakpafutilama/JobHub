import React, { useState, useEffect } from "react";
import {
  Grid,
  Typography,
  TextField,
  Button,
  MenuItem,
  Snackbar,
  Avatar,
  CircularProgress,
} from "@mui/material";
import axios from "axios";
import { getCookie } from "../../helper/AccessToken";
import PersonIcon from "@mui/icons-material/Person";
import Navbar from "../Navbar/Navbar";

const genders = [
  { value: "male", label: "Male" },
  { value: "female", label: "Female" },
  { value: "other", label: "Other" },
];

const Account = () => {
  const [userDetails, setUserDetails] = useState({
    email: "",
    password: "",
    full_name: "",
    gender: "",
    contact: "",
    photo: "",
    role: "",
    resume: "",
  });

  const [loading, setLoading] = useState(true);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");

  useEffect(() => {
    axios
      .get("http://localhost:9000/user", {
        headers: {
          token: getCookie(),
        },
      })
      .then((response) => {
        const userData = response.data.data;
        setUserDetails({
          email: userData.email || "",
          password: userData.password || "",
          full_name: userData.full_name || "",
          gender: userData.gender || "",
          contact: userData.contact || "",
          photo: userData.photo || "",
          role: userData.role,
          resume: userData.resume || "",
        });
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching user data:", error);
        setLoading(false);
      });
  }, []);

  const handleChange = (e) => {
    setUserDetails({ ...userDetails, [e.target.name]: e.target.value });
  };

  const handleCloseSnackbar = () => {
    setSnackbarOpen(false);
  };

  const handleUpdatePhoto = (e) => {
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append("photo", file);

    axios
      .put("http://localhost:9000/user/pic", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          token: getCookie(),
        },
      })
      .then((response) => {
        const updatedUserDetails = {
          ...userDetails,
          photo: response.data.photo,
        };
        setUserDetails(updatedUserDetails);
        setSnackbarMessage("Profile picture updated");
        setSnackbarOpen(true);
      })
      .catch((error) => {
        console.error("Error updating profile picture:", error);
        setSnackbarMessage("Error updating profile picture");
        setSnackbarOpen(true);
      });
  };

  const handleUploadResume = (e) => {
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append("resume", file);

    axios
      .post("http://localhost:9000/user/resume", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          token: getCookie(),
        },
      })
      .then((response) => {
        const updatedUserDetails = {
          ...userDetails,
          resume: response.data.resume,
        };
        setUserDetails(updatedUserDetails);
        setSnackbarMessage("Resume updated");
        setSnackbarOpen(true);
      })
      .catch((error) => {
        console.error("Error uploading resume:", error);
        setSnackbarMessage("Error uploading resume");
        setSnackbarOpen(true);
      });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    axios
      .put("http://localhost:9000/user", userDetails, {
        headers: {
          token: getCookie(),
        },
      })
      .then((response) => {
        setSnackbarMessage("Account details updated");
        setSnackbarOpen(true);
      })
      .catch((error) => {
        console.error("Error updating account details:", error);
        setSnackbarMessage("Error updating account details");
        setSnackbarOpen(true);
      });
  };

  return (
    <div style={{ padding: "0 400px", marginTop: "88px" }}>
      <Navbar toggleSignIn={null} />
      <Grid container direction="column" alignItems="center" spacing={3}>
        {userDetails.resume && (
          <Grid item xs={12}>
            <Button
              variant="contained"
              color="secondary"
              fullWidth
              onClick={() => {
                window.open(userDetails.resume, "_blank");
              }}
            >
              View Resume
            </Button>
          </Grid>
        )}
        {userDetails.role === "user" && (
          <Grid item xs={12}>
            <input
              accept=".pdf"
              style={{ display: "none" }}
              id="upload-resume"
              type="file"
              onChange={handleUploadResume}
            />
            <label htmlFor="upload-resume">
              <Button variant="contained" component="span" fullWidth>
                Upload Resume
              </Button>
            </label>
          </Grid>
        )}
        <Grid item>
          {loading ? (
            <CircularProgress />
          ) : userDetails.photo ? (
            <Avatar
              src={userDetails.photo}
              sx={{ width: 100, height: 100 }}
              style={{ marginLeft: "60px" }}
            />
          ) : (
            <Avatar
              sx={{ width: 100, height: 100 }}
              style={{ marginLeft: "60px" }}
            >
              <PersonIcon />
            </Avatar>
          )}
          <input
            accept="image/*"
            style={{ display: "none" }}
            id="upload-photo"
            type="file"
            onChange={handleUpdatePhoto}
          />
          <label htmlFor="upload-photo">
            <Button
              variant="contained"
              component="span"
              sx={{ marginTop: 1, marginBottom: 1 }}
            >
              Update Profile Picture
            </Button>
          </label>
        </Grid>
        <Grid item xs={10} sm={8} md={6} lg={4}>
          <form onSubmit={handleSubmit}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  name="email"
                  label="Email"
                  value={userDetails.email}
                  onChange={handleChange}
                  fullWidth
                  disabled
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  name="full_name"
                  label="Full Name"
                  value={userDetails.full_name}
                  onChange={handleChange}
                  fullWidth
                />
              </Grid>
              {userDetails.role !== "organization" && (
                <>
                  <Grid item xs={12}>
                    <TextField
                      name="gender"
                      select
                      label="Gender"
                      value={userDetails.gender}
                      onChange={handleChange}
                      fullWidth
                    >
                      {genders.map((option) => (
                        <MenuItem key={option.value} value={option.value}>
                          {option.label}
                        </MenuItem>
                      ))}
                    </TextField>
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      name="contact"
                      label="Contact"
                      value={userDetails.contact}
                      onChange={handleChange}
                      fullWidth
                    />
                  </Grid>
                </>
              )}
              <Grid item xs={12}>
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  fullWidth
                  onClick={handleSubmit}
                >
                  Update
                </Button>
              </Grid>
            </Grid>
          </form>
          <Snackbar
            open={snackbarOpen}
            autoHideDuration={6000}
            onClose={handleCloseSnackbar}
            message={snackbarMessage}
          />
        </Grid>
      </Grid>
    </div>
  );
};
export default Account;
