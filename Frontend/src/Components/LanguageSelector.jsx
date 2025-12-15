import React, { useState, useEffect } from 'react'
import { Select, MenuItem, FormControl, Box, Typography } from '@mui/material'
import { LANGUAGES, getCurrentLanguage, getCurrentText } from '../utilities/constants'

const LanguageSelector = ({ onLanguageChange }) => {
  const [selectedLanguage, setSelectedLanguage] = useState(getCurrentLanguage())
  const currentText = getCurrentText()

  useEffect(() => {
    // Save language preference to localStorage
    localStorage.setItem('selectedLanguage', selectedLanguage)
    if (onLanguageChange) {
      onLanguageChange(selectedLanguage)
    }
  }, [selectedLanguage, onLanguageChange])

  const handleLanguageChange = (event) => {
    setSelectedLanguage(event.target.value)
  }

  return (
    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
      <Typography variant="body2" sx={{ color: 'white', fontSize: '0.875rem' }}>
        {currentText.LANGUAGE_SELECTOR}:
      </Typography>
      <FormControl size="small" sx={{ minWidth: 100 }}>
        <Select
          value={selectedLanguage}
          onChange={handleLanguageChange}
          sx={{
            color: 'white',
            fontSize: '0.875rem',
            '& .MuiOutlinedInput-notchedOutline': {
              borderColor: 'rgba(255, 255, 255, 0.3)',
            },
            '&:hover .MuiOutlinedInput-notchedOutline': {
              borderColor: 'rgba(255, 255, 255, 0.5)',
            },
            '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
              borderColor: 'white',
            },
            '& .MuiSvgIcon-root': {
              color: 'white',
            },
          }}
        >
          {Object.entries(LANGUAGES).map(([code, name]) => (
            <MenuItem key={code} value={code}>
              {name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  )
}

export default LanguageSelector