import { useState } from 'react';
import { createFileRoute } from '@tanstack/react-router';
import { 
  Box, 
  Typography, 
  Paper, 
  Table, 
  TableBody, 
  TableCell, 
  TableContainer, 
  TableHead, 
  TableRow,
  Chip,
  Button,
  TextField,
  InputAdornment,
  IconButton,
  Tooltip,
  CircularProgress
} from '@mui/material';
import { 
  Add as AddIcon, 
  Search as SearchIcon,
  FilterList as FilterIcon,
  PersonAdd as PersonAddIcon
} from '@mui/icons-material';
import { useLeads, type Lead } from '@hooks/useLeads';

export const Route = createFileRoute('/crm/leads')({
  component: LeadsPage,
});

function LeadsPage() {
  const { data: leads, isLoading, error } = useLeads();
  const [searchTerm, setSearchTerm] = useState('');
  
  // Filter leads based on search term
  const filteredLeads = leads?.filter(lead => 
    lead.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    lead.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    lead.source.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  // Status chip color mapping
  const getStatusColor = (status: Lead['status']) => {
    switch (status) {
      case 'new': return 'info';
      case 'contacted': return 'warning';
      case 'qualified': return 'success';
      case 'lost': return 'error';
      default: return 'default';
    }
  };
  
  if (isLoading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '50vh' }}>
        <CircularProgress />
      </Box>
    );
  }
  
  if (error) {
    return (
      <Box sx={{ p: 3 }}>
        <Typography color="error">Error loading leads: {error.toString()}</Typography>
      </Box>
    );
  }
  
  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h4" component="h1" fontWeight="bold">
          Leads Management
        </Typography>
        <Button 
          variant="contained" 
          startIcon={<AddIcon />}
          sx={{ borderRadius: '10px' }}
        >
          Add New Lead
        </Button>
      </Box>
      
      <Box sx={{ display: 'flex', mb: 3, gap: 2 }}>
        <TextField
          placeholder="Search leads..."
          variant="outlined"
          fullWidth
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
          sx={{ maxWidth: 500 }}
        />
        <Tooltip title="Filter leads">
          <IconButton>
            <FilterIcon />
          </IconButton>
        </Tooltip>
      </Box>
      
      <Paper sx={{ borderRadius: '12px', overflow: 'hidden' }}>
        <TableContainer>
          <Table>
            <TableHead sx={{ backgroundColor: theme => theme.palette.background.default }}>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell>Email</TableCell>
                <TableCell>Phone</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Source</TableCell>
                <TableCell>Created</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredLeads?.map((lead) => (
                <TableRow key={lead.id} hover>
                  <TableCell>{lead.name}</TableCell>
                  <TableCell>{lead.email}</TableCell>
                  <TableCell>{lead.phone}</TableCell>
                  <TableCell>
                    <Chip 
                      label={lead.status.charAt(0).toUpperCase() + lead.status.slice(1)} 
                      color={getStatusColor(lead.status) as any}
                      size="small"
                    />
                  </TableCell>
                  <TableCell>{lead.source}</TableCell>
                  <TableCell>{new Date(lead.createdAt).toLocaleDateString()}</TableCell>
                </TableRow>
              ))}
              {filteredLeads?.length === 0 && (
                <TableRow>
                  <TableCell colSpan={6} align="center" sx={{ py: 3 }}>
                    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2 }}>
                      <PersonAddIcon sx={{ fontSize: 40, color: 'text.secondary' }} />
                      <Typography variant="body1" color="text.secondary">
                        No leads found. Try adjusting your search or add a new lead.
                      </Typography>
                      <Button variant="outlined" startIcon={<AddIcon />}>
                        Add New Lead
                      </Button>
                    </Box>
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </Box>
  );
}