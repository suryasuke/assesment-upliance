import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import {
  TextField, Checkbox, Radio, RadioGroup, FormControlLabel, Select, MenuItem,
  InputLabel, FormControl, Button, Typography, Box
} from '@mui/material';

function PreviewForm() {
  const { fields, formName } = useSelector(state => state.form);
  const [formData, setFormData] = useState({});
  const [errors, setErrors] = useState({});

  // Initialize formData when fields change
  useEffect(() => {
    const initialData = {};
    fields.forEach(field => {
      initialData[field.id] = field.type === 'checkbox' ? false : '';
    });
    setFormData(initialData);
  }, [fields]);

  // Handle input change
  const handleChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field.id]: value }));
  };

  // Simple validation (only required fields)
 const validate = () => {
  const newErrors = {};

  fields.forEach(field => {
    const val = formData[field.id] || '';

    // Required
    if (field.required && !val) {
      newErrors[field.id] = `${field.label} is required`;
      return;
    }

    // Min length
    if (field.validations?.minLength && val.length < field.validations.minLength) {
      newErrors[field.id] = `${field.label} must be at least ${field.validations.minLength} characters`;
      return;
    }

    // Max length
    if (field.validations?.maxLength && val.length > field.validations.maxLength) {
      newErrors[field.id] = `${field.label} must be less than ${field.validations.maxLength} characters`;
      return;
    }

    // Email format
    if (field.validations?.email) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(val)) {
        newErrors[field.id] = `Invalid email format`;
        return;
      }
    }

    // Password rule
    if (field.validations?.password) {
      const passwordRegex = /^(?=.*[0-9]).{8,}$/;
      if (!passwordRegex.test(val)) {
        newErrors[field.id] = `Password must be at least 8 chars and contain a number`;
        return;
      }
    }
  });

  setErrors(newErrors);
  return Object.keys(newErrors).length === 0;
};

  // Handle form submit
  const handleSubmit = () => {
    if (validate()) {
      alert('Form submitted successfully! ✅');
    }
  };

  // Render each field
  const renderField = (field) => {
    switch (field.type) {
      case 'text':
      case 'number':
      case 'date':
        return (
          <TextField
            key={field.id}
            label={field.label}
            type={field.type}
            fullWidth
            margin="normal"
            value={formData[field.id] || ''}
            onChange={e => handleChange(field, e.target.value)}
            error={!!errors[field.id]}
            helperText={errors[field.id] || ''}
          />
        );

      case 'textarea':
        return (
          <TextField
            key={field.id}
            label={field.label}
            multiline
            rows={4}
            fullWidth
            margin="normal"
            value={formData[field.id] || ''}
            onChange={e => handleChange(field, e.target.value)}
            error={!!errors[field.id]}
            helperText={errors[field.id] || ''}
          />
        );

      case 'checkbox':
        return (
          <FormControlLabel
            key={field.id}
            control={
              <Checkbox
                checked={formData[field.id] || false}
                onChange={e => handleChange(field, e.target.checked)}
              />
            }
            label={field.label}
          />
        );

      case 'radio':
        return (
          <Box key={field.id} mt={2}>
            <Typography>{field.label}</Typography>
            <RadioGroup
              value={formData[field.id] || ''}
              onChange={e => handleChange(field, e.target.value)}
            >
              {(field.options || []).map(opt => (
                <FormControlLabel key={opt} value={opt} control={<Radio />} label={opt} />
              ))}
            </RadioGroup>
          </Box>
        );

      case 'select':
        return (
          <FormControl fullWidth margin="normal" key={field.id}>
            <InputLabel>{field.label}</InputLabel>
            <Select
              value={formData[field.id] || ''}
              onChange={e => handleChange(field, e.target.value)}
            >
              {(field.options || []).map(opt => (
                <MenuItem key={opt} value={opt}>{opt}</MenuItem>
              ))}
            </Select>
          </FormControl>
        );

      default:
        return null;
    }
  };

  return (
    <Box p={4}>
      <Typography variant="h4" gutterBottom>
        {formName || 'Preview Form'}
      </Typography>

      {fields.length === 0 ? (
        <Typography>No fields found. Please create a form first.</Typography>
      ) : (
        <>
          {fields.map(field => renderField(field))}
          <Button
            variant="contained"
            onClick={handleSubmit}
            sx={{ mt: 3 }}
          >
            Submit
          </Button>
        </>
      )}
    </Box>
  );
}

export default PreviewForm;
