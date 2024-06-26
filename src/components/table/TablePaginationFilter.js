import { memo, useEffect, useState } from 'react'
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
// @mui
import { Box, Switch, TablePagination, FormControlLabel, Button, Grid, Select, OutlinedInput, MenuItem, Checkbox, ListItemText, Menu, IconButton } from '@mui/material';
import Iconify from '../iconify';

// ----------------------------------------------------------------------

const ITEM_HEIGHT = 48;

TablePaginationFilter.propTypes = {
  rowsPerPageOptions: PropTypes.arrayOf(PropTypes.number),
  columns:PropTypes.array,
  sx: PropTypes.object,
};

function TablePaginationFilter({
  rowsPerPageOptions = [10, 20,50,100],
  columns,
  sx,
  ...other
}) {

  const dispatch = useDispatch();
  
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedOptions, setSelectedOptions] = useState([]);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  useEffect(()=>{
    
    const newHiddenColumns = {};
    columns.forEach((column) => {
      if(column?.hideable!==false){
        newHiddenColumns[column.id] = selectedOptions.includes(column);
      }  
    });
  },[dispatch, columns, selectedOptions])

  const handleOptionClick = (option) => {

    if (selectedOptions.includes(option)) {
      setSelectedOptions(selectedOptions.filter((item) => item !== option));
    } else {
      setSelectedOptions([...selectedOptions, option]);
    }
  };
  
  return (
    <Box rowGap={2} columnGap={2} display="grid" sx={{borderTop:'1px solid #919eab3d'}}
        gridTemplateColumns={{ xs: 'repeat(2, 1fr)', sm: 'repeat(2, 1fr)' }}>
          <Grid item sx={{py:1, px:2}}>
            <Button startIcon={<Iconify icon='flowbite:column-solid'/>} variant={selectedOptions.length===0?"":"outlined"} onClick={handleClick}>Columns</Button>
            <Menu
              id="long-menu"
              MenuListProps={{
                'aria-labelledby': 'long-button',
              }}
              anchorEl={anchorEl}
              open={open}
              onClose={handleClose}
              PaperProps={{
                style: {
                  maxHeight: ITEM_HEIGHT * 4.5,
                  width: '20ch',
                },
              }}
            >
              {columns.map((column) => column?.hideable!==false && (
                <MenuItem dense sx={{p:0}} key={column.id} onClick={() => handleOptionClick(column)}>
                  <Checkbox checked={!selectedOptions.includes(column)} />
                  {column.label}
                </MenuItem>
              ))}
            </Menu>
          </Grid>
          <TablePagination labelRowsPerPage="Rows:" colSpan={2} rowsPerPageOptions={rowsPerPageOptions} component="div" showLastButton showFirstButton {...other} 
            sx={{
              borderTop:'none !important',
              '.MuiTablePagination-toolbar': {
                height: '20px',
                width: '!important 200px',
              },
            }}
          />
    
    </Box>
  );
}
export default memo(TablePaginationFilter)
