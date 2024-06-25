import { useLayoutEffect } from 'react';
import { useParams } from 'react-router-dom';
// @mui
import { Card, Container } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
// redux
import { getRole } from '../../../../redux/slices/user/role';
import { getUsers } from '../../../../redux/slices/user/user';
// sections
import { Cover } from '../../../../components/Defaults/Cover';
import RoleViewForm from './RoleViewForm';
import { StyledCardContainer } from '../../../../theme/styles/default-styles';

// ----------------------------------------------------------------------

export default function RoleView() {
  const dispatch = useDispatch();

  const { id } = useParams();
  useLayoutEffect(() => {
    dispatch(getRole(id));
    dispatch(getUsers(id));
  }, [id, dispatch]);

  const { role } = useSelector((state) => state.role);
  return (
    <Container maxWidth={false}>
      <StyledCardContainer>
        <Cover name={role?.name} generalSettings />
      </StyledCardContainer>
      <RoleViewForm />
    </Container>
  );
}
