import React, { useState, useEffect } from "react";
import {
  Box,
  Grid,
  Modal,
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
  const token = getCookie();
  const [userDetails, setUserDetails] = useState({
    email: "",
    password: "",
    full_name: "",
    gender: "",
    contact: "",
    pp: "",
    role: "",
    _id: "", // Include _id for resume URL
  });

  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [newJob, setNewJob] = useState({
    resume: null,
  });

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  useEffect(() => {
    axios
      .get("http://localhost:9000/user", {
        headers: {
          token,
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
          pp: userData.pp || "",
          role: userData.role,
          _id: userData._id, // Set _id
        });
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching user data:", error);
        setLoading(false);
      });
  }, [token]);

  const handleChange = (e) => {
    setUserDetails({ ...userDetails, [e.target.name]: e.target.value });
  };

  const handleCloseSnackbar = () => {
    setSnackbarOpen(false);
  };

  const handleUpdatePhoto = (e) => {
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append("pp", file);

    axios
      .put("http://localhost:9000/user/pic", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          token,
        },
      })
      .then((response) => {
        const updatedUserDetails = {
          ...userDetails,
          pp: response.data.pp,
        };
        setUserDetails(updatedUserDetails);
        setSnackbarMessage("Profile picture updated");
        setSnackbarOpen(true);
        window.location.reload();
      })
      .catch((error) => {
        console.error("Error updating profile picture:", error);
        setSnackbarMessage("Error updating profile picture");
        setSnackbarOpen(true);
      });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    axios
      .put("http://localhost:9000/user", userDetails, {
        headers: {
          token,
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

  const handleInputChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "resume") {
      setNewJob({ ...newJob, resume: files[0] });
    }
  };

  const handleResumeSubmit = async () => {
    if (newJob.resume) {
      const formData = new FormData();
      formData.append("resume", newJob.resume);

      try {
        const response = await axios.post(
          "http://localhost:9000/user/resume",
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
              token,
            },
          }
        );
        alert("Uploaded");
        setNewJob({ resume: null });
        setOpen(false);
        window.location.reload();
      } catch (err) {
        alert(err.response.data.message);
      }
    }
  };

  const openApplicantModal = () => {
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  return (
    <div style={{ padding: "0 400px", marginTop: "88px" }}>
      <Navbar toggleSignIn={null} />
      <Grid container direction="column" alignItems="center" spacing={3}>
        <Grid item>
          {loading ? (
            <CircularProgress />
          ) : userDetails.pp ? (
            <Avatar
              src={userDetails.pp}
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
                  <Grid item xs={12}>
                    <Grid container spacing={2}>
                      <Grid item xs={6}>
                        <Button
                          type="button"
                          variant="contained"
                          color="info"
                          fullWidth
                          onClick={openApplicantModal}
                        >
                          View Resume
                        </Button>
                      </Grid>
                      <Grid item xs={6}>
                        <Button
                          type="button"
                          variant="contained"
                          color="secondary"
                          fullWidth
                          onClick={handleOpen}
                        >
                          Update Resume
                        </Button>
                      </Grid>
                    </Grid>
                  </Grid>
                </>
              )}

              <Grid item xs={12}>
                <Button
                  type="submit"
                  variant="contained"
                  color="success"
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
      <Modal open={open} onClose={handleClose}>
        <Box className="modal-box">
          <input
            type="file"
            name="resume"
            onChange={handleInputChange}
            accept=".pdf,.doc,.docx"
            style={{ margin: "20px 0" }}
          />
          <Button
            style={{ marginLeft: "80px" }}
            variant="contained"
            color="success"
            onClick={handleResumeSubmit}
          >
            Add
          </Button>
        </Box>
      </Modal>
      {showModal && (
        <ResumeModal id={userDetails._id} closeModal={closeModal} />
      )}
    </div>
  );
};

const ResumeModal = ({ id, closeModal }) => {
  const [resumeUrl, setResumeUrl] = useState("");

  useEffect(() => {
    const fetchResumeUrl = async () => {
      try {
        const response = await axios.get(`http://localhost:9000/user/${id}`, {
          headers: {
            token: getCookie(),
          },
        });
        setResumeUrl(response.data.data);
      } catch (error) {
        console.error("Error fetching resume URL:", error);
      }
    };

    fetchResumeUrl();
  }, [id]);

  return (
    <div className="modal">
      <div
        className="modal-content"
        style={{
          background: "rgba(255, 255, 255, 0.7)",
          color: "black",
          backdropFilter: "blur(5px)",
          WebkitBackdropFilter: "blur(10px)",
          border: "1px solid #888",
          borderRadius: 8,
          width: 1050,
          height: 900,
        }}
      >
        <span
          className="close"
          style={{
            color: "black",
            float: "right",
            fontSize: "28",
            fontWeight: "bold",
            cursor: "pointer",
          }}
          onClick={closeModal}
        >
          &times;
        </span>
        {resumeUrl ? (
          <Avatar
            variant={"rounded"}
            alt="Resume"
            src={resumeUrl}
            style={{
              width: "100%",
              height: "100%",
            }}
          />
        ) : (
          <p>No resume</p>
        )}
      </div>
    </div>
  );
};

export default Account;
