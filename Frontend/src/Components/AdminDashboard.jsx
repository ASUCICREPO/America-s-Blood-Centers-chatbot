import React, { useState, useEffect } from 'react'
import {
  Box,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Chip,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Alert
} from '@mui/material'

const AdminDashboard = ({ open, onClose }) => {
  const [logs, setLogs] = useState([])
  const [showOriginal, setShowOriginal] = useState(true) // Show original messages by default

  // Mock data for demonstration - in production, this would fetch from CloudWatch or a logging service
  const mockLogs = [
    {
      id: 1,
      timestamp: new Date().toISOString(),
      question: "How many people donate blood?",
      response: "Approximately 6.8 million people in the United States donate blood annually...",
      originalQuestion: "How many people donate blood?",
      originalResponse: "Approximately 6.8 million people in the United States donate blood annually...",
      language: "en",
      sources: ["Blood-101-Snapshot-Americas-Blood-Supply-Donors.pdf"],
      responseTime: "1.2s"
    },
    {
      id: 2,
      timestamp: new Date(Date.now() - 300000).toISOString(),
      question: "¿Dónde puedo donar sangre?",
      response: "Puede encontrar un centro de donación de sangre cerca de usted...",
      originalQuestion: "¿Dónde puedo donar sangre?",
      originalResponse: "Puede encontrar un centro de donación de sangre cerca de usted...",
      language: "es",
      sources: ["https://americasblood.org/for-donors/find-a-blood-center/"],
      responseTime: "0.9s"
    },
    {
      id: 3,
      timestamp: new Date(Date.now() - 600000).toISOString(),
      question: "Am I eligible to donate blood?",
      response: "Blood donation eligibility depends on several factors...",
      originalQuestion: "Am I eligible to donate blood?",
      originalResponse: "Blood donation eligibility depends on several factors...",
      language: "en",
      sources: ["ABC-Promoting-Awareness-New-Eligibility-Criteria.pdf"],
      responseTime: "1.5s"
    }
  ]

  useEffect(() => {
    if (open) {
      // In production, fetch real logs from CloudWatch or logging service
      setLogs(mockLogs)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open])

  const formatTimestamp = (timestamp) => {
    return new Date(timestamp).toLocaleString()
  }

  const getLanguageChip = (language) => {
    return (
      <Chip
        label={language === 'en' ? 'English' : 'Español'}
        size="small"
        color={language === 'en' ? 'primary' : 'secondary'}
      />
    )
  }

  return (
    <Dialog open={open} onClose={onClose} maxWidth="lg" fullWidth>
      <DialogTitle>
        <Typography variant="h5" component="div">
          Admin Dashboard - Chat Logs
        </Typography>
      </DialogTitle>
      <DialogContent>
        <Box sx={{ mb: 2 }}>
          <Alert severity="info">
            This dashboard shows recent chatbot interactions. In production, this would connect to CloudWatch logs for real-time monitoring.
          </Alert>
          <Box sx={{ mt: 1, display: 'flex', alignItems: 'center', gap: 1 }}>
            <Typography variant="body2">Show:</Typography>
            <Button
              size="small"
              variant={showOriginal ? "contained" : "outlined"}
              onClick={() => setShowOriginal(true)}
            >
              Original Messages
            </Button>
            <Button
              size="small"
              variant={!showOriginal ? "contained" : "outlined"}
              onClick={() => setShowOriginal(false)}
            >
              Translated Messages
            </Button>
          </Box>
        </Box>
        
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Timestamp</TableCell>
                <TableCell>Language</TableCell>
                <TableCell>Question</TableCell>
                <TableCell>Response Preview</TableCell>
                <TableCell>Sources</TableCell>
                <TableCell>Response Time</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {logs.map((log) => (
                <TableRow key={log.id}>
                  <TableCell>{formatTimestamp(log.timestamp)}</TableCell>
                  <TableCell>{getLanguageChip(log.language)}</TableCell>
                  <TableCell sx={{ maxWidth: 200 }}>
                    <Typography variant="body2" noWrap>
                      {showOriginal ? (log.originalQuestion || log.question) : log.question}
                    </Typography>
                  </TableCell>
                  <TableCell sx={{ maxWidth: 300 }}>
                    <Typography variant="body2" noWrap>
                      {showOriginal ? (log.originalResponse || log.response).substring(0, 100) : log.response.substring(0, 100)}...
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                      {log.sources.map((source, index) => (
                        <Chip
                          key={index}
                          label={source.includes('http') ? 'Web' : 'PDF'}
                          size="small"
                          variant="outlined"
                        />
                      ))}
                    </Box>
                  </TableCell>
                  <TableCell>{log.responseTime}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Close</Button>
      </DialogActions>
    </Dialog>
  )
}

export default AdminDashboard