import React, { useEffect, useState } from 'react';
import { Box, Container, Grid, Paper, Typography } from '@mui/material';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import PropertyForm from './components/PropertyForm';
import PropertyPreview from './components/PropertyPreview';
import { PropertyFormData, Project } from './types/property';
import { fetchProjects, saveProperty } from './services/propertyapi';

const App: React.FC = () => {
  const [formData, setFormData] = useState<PropertyFormData>({
    projectId: '',
    title: '',
    size: 0,
    price: 0,
    handoverDate: null,
  });
  const [projects, setProjects] = useState<Project[]>([]);

  useEffect(() => {
    const loadProjects = async () => {
      const fetchedProjects = await fetchProjects();
      setProjects(fetchedProjects);
    };
    loadProjects();
  }, []);

  const handleSubmit = async (data: PropertyFormData) => {
    try {
      const submissionData = {
        ...data,
        handoverDate: data.handoverDate?.toISOString()
      };
      let properties= await saveProperty(submissionData);
      setFormData(properties);
      console.log(properties);
      alert('Property saved successfully!');
    } catch (error) {
      console.error('Failed to save property:', error);
      alert('Failed to save property. Please try again.');
    }

  };

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Property Listing
        </Typography>

        <Box
          sx={{
            display: 'flex',
            flexDirection: { xs: 'column', md: 'row' },
            gap: 3,
            p: 2
          }}
        >
          <Box sx={{ width: { xs: '100%', md: '50%' } }}>
            <Paper sx={{ p: 2 }}>
              <PropertyForm
                onSubmit={handleSubmit}
                onChange={(data: PropertyFormData) => setFormData(data)}
              />
            </Paper>
          </Box>

          <Box sx={{ width: { xs: '100%', md: '50%' } }}>
            <Paper sx={{ p: 2 }}>
              <PropertyPreview data={formData} projects={projects} />
            </Paper>
          </Box>
        </Box>
      </Container>
    </LocalizationProvider>
  );
};

export default App;