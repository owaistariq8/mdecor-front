import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
// @mui
import { Stack } from '@mui/material';
// redux
import { useDispatch } from '../../../redux/store';
// components
import SearchBarCombo from '../../../components/ListTableTools/SearchBarCombo';
import { PATH_SECURITY } from '../../../routes/paths';
import { options } from '../../../theme/styles/default-styles';

// ----------------------------------------------------------------------

UserTableToolbar.propTypes = {
  isFiltered: PropTypes.bool,
  filterName: PropTypes.string,
  onFilterName: PropTypes.func,
  onResetFilter: PropTypes.func,
  onReload: PropTypes.func,
};

export default function UserTableToolbar({
  isFiltered,
  filterName,
  onFilterName,
  onResetFilter,
  onReload
}) {
  
  const navigate = useNavigate();
  const toggleAdd = () => {
    navigate(PATH_SECURITY.user.new);
  };

  return (
    <Stack {...options}>
      <SearchBarCombo
        isFiltered={isFiltered}
        filterName={filterName}
        onFilterName={onFilterName}
        onResetFilterName={onResetFilter}
        onAddButton={toggleAdd}
        addButtonName="New User"
        onReload={onReload}
      />
    </Stack>
  );
}
