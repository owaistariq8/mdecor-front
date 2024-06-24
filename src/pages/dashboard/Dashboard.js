import { useNavigate } from 'react-router';
import { useEffect, useLayoutEffect, useState } from 'react';
// @mui
import { Grid, Card, Divider, TextField, Autocomplete, CardHeader, IconButton, Typography } from '@mui/material';
import { StyledBg, StyledContainer, StyledGlobalCard } from '../../theme/styles/default-styles';
// sections
// assets & hooks
import { useDispatch, useSelector } from '../../redux/store';

// ----------------------------------------------------------------------

export default function Dashboard() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  return (
    <StyledContainer maxWidth={false}>
      <Grid container>
        <Grid container spacing={3} mt={2}>
            <Grid item xs={12}>
              <h1>Hello Main DashBoard</h1> 
            </Grid>
        </Grid>
      </Grid>
    </StyledContainer>
  );
}
