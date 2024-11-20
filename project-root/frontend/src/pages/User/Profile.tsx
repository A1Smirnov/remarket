import React, { useEffect, useState } from 'react';
import { Box, Typography, Button, TextField, CssBaseline, Avatar, Container } from '@mui/material';
import { styled } from '@mui/system';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const ProfileContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  padding: theme.spacing(4),
  backgroundColor: theme.palette.background.paper,
  borderRadius: theme.shape.borderRadius,
  width: '100%',
  maxWidth: 400,
  marginTop: theme.spacing(4),
}));

const AvatarStyled = styled(Avatar)(({ theme }) => ({
  width: theme.spacing(12),
  height: theme.spacing(12),
  marginBottom: theme.spacing(2),
  backgroundColor: theme.palette.primary.main,
}));

const ProfileButton = styled(Button)(({ theme }) => ({
  marginTop: theme.spacing(2),
  width: '100%',
}));

const InfoContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-start', // Align text to the left
  width: '100%',
  marginBottom: theme.spacing(2),
}));

const InfoItem = styled(Box)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'space-between', // To align the labels and data in a row
  width: '100%',
  marginBottom: theme.spacing(1),
}));

export default function Profile() {
  const navigate = useNavigate();
  const [user, setUser] = useState<{ name: string; email: string } | null>(null);
  const [editMode, setEditMode] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      axios
        .get('http://localhost:5000/api/auth/profile', {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((response) => {
          setUser(response.data);
          setName(response.data.name);
          setEmail(response.data.email);
        })
        .catch((err) => console.log(err));
    } else {
      navigate('/login');
    }
  }, [navigate]);

  const handleSave = async () => {
    const token = localStorage.getItem('token');
    if (token) {
      try {
        await axios.put(
          'http://localhost:5000/api/auth/profile',
          { name, email },
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        setEditMode(false);
        setUser({ name, email });
      } catch (err) {
        console.error('Error updating profile', err);
      }
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  if (!user) return <Typography>Loading...</Typography>;

  return (
    <Container maxWidth="xs">
      <CssBaseline />
      <ProfileContainer>
        <AvatarStyled>
          {/* Здесь можно добавить изображение или иконку */}
        </AvatarStyled>
        <Typography component="h1" variant="h5" gutterBottom>
          Profile
        </Typography>
        <InfoContainer>
          {editMode ? (
            <>
              <TextField
                fullWidth
                label="Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                margin="normal"
                variant="outlined"
              />
              <TextField
                fullWidth
                label="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                margin="normal"
                variant="outlined"
              />
              <ProfileButton variant="contained" color="primary" onClick={handleSave}>
                Save Changes
              </ProfileButton>
            </>
          ) : (
            <>
              <InfoItem>
                <Typography variant="body1">Name:</Typography>
                <Typography variant="body1">{user.name}</Typography>
              </InfoItem>
              <InfoItem>
                <Typography variant="body1">Email:</Typography>
                <Typography variant="body1">{user.email}</Typography>
              </InfoItem>
              <ProfileButton variant="contained" style={{ backgroundColor: 'orange' }} onClick={() => setEditMode(true)}>
                Edit Profile
              </ProfileButton>
            </>
          )}
        </InfoContainer>
        <ProfileButton
          variant="outlined"
          color="error"
          onClick={handleLogout}
          style={{ marginTop: '16px', width: '100%' }}
        >
          Logout
        </ProfileButton>
      </ProfileContainer>
    </Container>
  );
}
