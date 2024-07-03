import { useNavigate } from 'react-router';
import { useEffect, useLayoutEffect, useState } from 'react';
// @mui
import { Grid, Card, Divider, TextField, Autocomplete, CardHeader, IconButton, Typography } from '@mui/material';
import { StyledBg, StyledContainer, StyledGlobalCard } from '../../theme/styles/default-styles';
// sections
// assets & hooks
import { useDispatch, useSelector } from '../../redux/store';
import { getUsers } from '../../redux/slices/user/user';
import ProductionLog from '../../components/Charts/ProductionLog';
import OperatorsWidget from '../../components/DashboardWidgets/OperatorsWidget';
import { _appAuthors } from '../../_mock/arrays';
import WelcomeWidget from '../../components/DashboardWidgets/WelcomeWidget';
import { CONFIG } from '../../config-global';

// ----------------------------------------------------------------------

export default function Dashboard() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { users, isLoading } = useSelector((state) => state.user);

  useLayoutEffect(()=>{
    dispatch(getUsers());
  },[dispatch])

  return (
    <StyledContainer maxWidth={false}>
      <Grid container>
        <Grid container spacing={3} mt={2}>
            <Grid item xs={12}>
              <WelcomeWidget title={CONFIG.APP_NAME} description={CONFIG.APP_TITLE} />
            </Grid>
            <Grid item xs={12} md={6} lg={8}>
              <ProductionLog
                title="Orders Log"
                chart={{
                  categories: [
                    '2:00:00PM',
                    '2:30:00PM',
                    '2:45:00PM',
                    '4:00:00PM',
                    '7:00:00AM',
                    '10:05:00AM',
                  ],
                  series: [
                    {
                      day: '28-June-2024',
                      data: [
                        { name: 'Completed', data: [5000, 0, 3000, 0, 2000, 0] },
                        { name: 'In Que', data: [5000, 0, 4000, 0, 3000, 0] },
                        { name: 'Cancled', data: [5500, 0, 2500, 0, 1500, 0] },
                      ],
                    },
                  ],
                }}
                sx={{ bg: 'transparent' }}
              />
              <StyledBg />
            </Grid>
            <Grid item xs={12} lg={4}>
              <Grid item>
                <OperatorsWidget title="Operators" list={users} />
              </Grid>
            </Grid>
            </Grid>
          </Grid>
        </StyledContainer>
  );
}
