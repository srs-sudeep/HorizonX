import { useState } from 'react';
import { createFileRoute } from '@tanstack/react-router';
import { 
  Box, 
  Typography, 
  Grid, 
  Card, 
  CardContent, 
  CardMedia, 
  CardActions,
  Button,
  TextField,
  InputAdornment,
  IconButton,
  Chip,
  Rating,
  CircularProgress,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Tooltip
} from '@mui/material';
import { 
  Add as AddIcon, 
  Search as SearchIcon,
  FilterList as FilterIcon,
  ShoppingCart as CartIcon
} from '@mui/icons-material';
import { useProducts } from '@hooks/useProducts';

export const Route = createFileRoute('/ecommerce/products')({
  component: ProductsPage,
});

function ProductsPage() {
  const { data: products, isLoading, error } = useProducts();
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  
  // Get unique categories
  const categories = products ? ['all', ...new Set(products.map(p => p.category))] : ['all'];
  
  // Filter products based on search term and category
  const filteredProducts = products?.filter(product => {
    const matchesSearch = 
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.description.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesCategory = categoryFilter === 'all' || product.category === categoryFilter;
    
    return matchesSearch && matchesCategory;
  });
  
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
        <Typography color="error">Error loading products: {error.toString()}</Typography>
      </Box>
    );
  }
  
  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h4" component="h1" fontWeight="bold">
          Products
        </Typography>
        <Button 
          variant="contained" 
          startIcon={<AddIcon />}
          sx={{ borderRadius: '10px' }}
        >
          Add Product
        </Button>
      </Box>
      
      <Box sx={{ display: 'flex', gap: 2, mb: 4, flexWrap: 'wrap' }}>
        <TextField
          placeholder="Search products..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          sx={{ flexGrow: 1, minWidth: '250px' }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
        />
        
        <FormControl sx={{ minWidth: '200px' }}>
          <InputLabel id="category-filter-label">Category</InputLabel>
          <Select
            labelId="category-filter-label"
            value={categoryFilter}
            label="Category"
            onChange={(e) => setCategoryFilter(e.target.value)}
            startAdornment={
              <InputAdornment position="start">
                <FilterIcon fontSize="small" />
              </InputAdornment>
            }
          >
            {categories.map((category) => (
              <MenuItem key={category} value={category}>
                {category.charAt(0).toUpperCase() + category.slice(1)}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>
      
      {filteredProducts?.length === 0 ? (
        <Box sx={{ py: 8, textAlign: 'center' }}>
          <Typography variant="h6" color="text.secondary">
            No products found matching your criteria
          </Typography>
        </Box>
      ) : (
        <Grid container spacing={3}>
          {filteredProducts?.map((product) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={product.id}>
              <Card sx={{ 
                height: '100%', 
                display: 'flex', 
                flexDirection: 'column',
                transition: 'transform 0.2s, box-shadow 0.2s',
                '&:hover': {
                  transform: 'translateY(-4px)',
                  boxShadow: '0 12px 20px rgba(0,0,0,0.1)'
                }
              }}>
                <CardMedia
                  component="img"
                  height="200"
                  image={product.image}
                  alt={product.name}
                  sx={{ objectFit: 'contain', p: 2, bgcolor: 'background.paper' }}
                />
                <CardContent sx={{ flexGrow: 1 }}>
                  <Box sx={{ mb: 1 }}>
                    <Chip 
                      label={product.category} 
                      size="small" 
                      sx={{ borderRadius: '4px', textTransform: 'capitalize' }} 
                    />
                  </Box>
                  <Typography variant="h6" component="h2" gutterBottom>
                    {product.name}
                  </Typography>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                    <Rating value={product.rating?.rate || 0} precision={0.5} readOnly size="small" />
                    <Typography variant="body2" color="text.secondary" sx={{ ml: 1 }}>
                      ({typeof product.rating === 'object' ? product.rating.count : 0})
                    </Typography>
                  </Box>
                  <Typography variant="body2" color="text.secondary" sx={{ 
                    mb: 2,
                    display: '-webkit-box',
                    WebkitLineClamp: 3,
                    WebkitBoxOrient: 'vertical',
                    overflow: 'hidden'
                  }}>
                    {product.description}
                  </Typography>
                  <Typography variant="h6" color="primary" fontWeight="bold">
                    ${product.price.toFixed(2)}
                  </Typography>
                </CardContent>
                <CardActions sx={{ p: 2, pt: 0 }}>
                  <Tooltip title="Add to cart">
                    <Button 
                      variant="contained" 
                      fullWidth 
                      startIcon={<CartIcon />}
                      sx={{ 
                        borderRadius: '8px',
                        backgroundImage: 'var(--mui-palette-gradient)',
                      }}
                    >
                      Add to Cart
                    </Button>
                  </Tooltip>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}
    </Box>
  );
}
