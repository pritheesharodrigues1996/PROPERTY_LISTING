import React from 'react';
import { Card, CardContent, Typography, Box } from '@mui/material';
import { PropertyFormData,Project } from '../types/property';
import { format } from 'date-fns';

interface PropertyPreviewProps {
  data: PropertyFormData;
  projects: Project[];  
}
const PropertyPreview: React.FC<PropertyPreviewProps> = ({ data, projects }) => {
  console.log(`data ${data.projectId} , projects ${projects}`);

  return (
    <Card sx={{ minWidth: 275, mt: 4 }}>
      <CardContent>
        <Typography variant="h6" gutterBottom>
          Property Preview
        </Typography>
        <Box sx={{ mb: 2 }}>
          <Typography color="text.secondary">Project:</Typography>
          <Typography>
            {data.projectId ? 
              projects.find((p: { id: string; }) => p.id === data.projectId)?.name : 
              'Not selected'}
          </Typography>
        </Box>
        <Box sx={{ mb: 2 }}>
          <Typography color="text.secondary">Title:</Typography>
          <Typography>{data.title || 'Not specified'}</Typography>
        </Box>
        <Box sx={{ mb: 2 }}>
          <Typography color="text.secondary">Size:</Typography>
          <Typography>
            {data.size > 0 ? `${data.size} sq. ft.` : 'Not specified'}
          </Typography>
            <Typography color="text.secondary">Price:</Typography>
          <Typography>
            {data.price > 0 ? `$${data.price.toLocaleString()}` : 'Not specified'}
          </Typography>
        </Box>
        <Box sx={{ mb: 2 }}>
          <Typography color="text.secondary">Handover Date:</Typography>
          <Typography>
            {data.handoverDate ? 
              format(data.handoverDate, 'dd MMMM yyyy') : 
              'Not specified'}
          </Typography>
        </Box>
      </CardContent>
    </Card>
  );
};

export default PropertyPreview;