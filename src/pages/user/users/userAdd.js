// import { useParams } from 'react-router-dom';
import PropTypes from 'prop-types';
// @mui
import { Container, Card } from '@mui/material';
// sections
import UserAddForm from './userAddForm';
import { Cover } from '../../../components/Defaults/Cover';
import { StyledCardContainer } from '../../../theme/styles/default-styles';
// ----------------------------------------------------------------------

UserAdd.propTypes = {
  isInvite: PropTypes.bool,
};

export default function UserAdd({isInvite}) {
  const title = isInvite?"Invite User":"Create User";
  return (
    <Container maxWidth={false}>
      <StyledCardContainer>
        <Cover name={title}/>
      </StyledCardContainer>
      <UserAddForm />
    </Container>
  );
}