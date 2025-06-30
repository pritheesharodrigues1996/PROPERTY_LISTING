import React, { useState, useEffect } from 'react';
import { TextField, Button, MenuItem, Box, Typography, TextFieldProps } from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers';
import { fetchProjects } from '../services/propertyapi';
import { Project, PropertyFormData } from '../types/property';
import { format } from 'date-fns';


interface PropertyFormProps {
  onSubmit: (data: PropertyFormData) => void;
  onChange: (data: PropertyFormData) => void;
}
const PropertyForm: React.FC<PropertyFormProps> = ({ onSubmit , onChange }) => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [formData, setFormData] = useState<PropertyFormData>({
    projectId: '',
    title: '',
    size: 0,
    price: 0,
    handoverDate: null,
  });
  const [isValid, setIsValid] = useState(false);

  useEffect(() => {
    fetchProjects().then(setProjects);
  }, []);

  useEffect(() => {
    const { projectId, title, size, price, handoverDate } = formData;
    setIsValid(
      !!projectId &&
      title.trim().length > 0 &&
      size > 0 &&
      price > 0 &&
      (handoverDate ? handoverDate > new Date() : false)
    );
  }, [formData]);

  const handleChange = (field: keyof PropertyFormData, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isValid) onSubmit(formData);
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
      <TextField
        select
        fullWidth
        label="Project"
        value={formData.projectId}
        onChange={(e) => handleChange('projectId', e.target.value)}
        margin="normal"
        required
      >
        {projects.map((project) => (
          <MenuItem key={project.id} value={project.id}>
            {project.name}
          </MenuItem>
        ))}
      </TextField>

      <TextField
        fullWidth
        label="Title"
        value={formData.title}
        onChange={(e) => handleChange('title', e.target.value)}
        margin="normal"
        required
      />

      <TextField
        fullWidth
        type="number"
        label="Size (sq. ft.)"
        value={formData.size || ''}
        onChange={(e) => handleChange('size', parseFloat(e.target.value) || 0)}
        margin="normal"
        required
        inputProps={{ min: 1 }}
      />

      <TextField
        fullWidth
        type="number"
        label="Price"
        value={formData.price || ''}
        onChange={(e) => handleChange('price', parseFloat(e.target.value) || 0)}
        margin="normal"
        required
        InputProps={{ startAdornment: '$' }}
        inputProps={{ min: 1 }}
      />

      <DatePicker
        label="Handover Date"
        value={formData.handoverDate}
        onChange={(date) => handleChange('handoverDate', date)}
        minDate={new Date()}
        slotProps={{
          textField: {
            fullWidth: true,
            margin: 'normal',
            required: true
          }
        }}
      />

      <Button
        type="submit"
        variant="contained"
        color="primary"
        disabled={!isValid}
        sx={{ mt: 3 }}
      >
        Save Property
      </Button>
    </Box>
  );
};

export default PropertyForm;