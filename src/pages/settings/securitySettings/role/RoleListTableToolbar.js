import PropTypes from 'prop-types';
// @mui
import { Stack } from '@mui/material';
import { useNavigate } from 'react-router-dom';
// components
import SearchBarCombo from '../../../../components/ListTableTools/SearchBarCombo';
// routes
import { PATH_SETTING } from '../../../../routes/paths';
// constants
import { BUTTONS } from '../../../../constants/default-constants';
// styles
import { options } from '../../../../theme/styles/default-styles';

// ----------------------------------------------------------------------

RoleListTableToolbar.propTypes = {
  isFiltered: PropTypes.bool,
  filterName: PropTypes.string,
  onFilterName: PropTypes.func,
  onResetFilter: PropTypes.func,
  };

export default function RoleListTableToolbar({
  isFiltered,
  filterName,
  onFilterName,
  onResetFilter,
}) {
  const navigate = useNavigate();
  const toggleAdd = () => {
    navigate(PATH_SETTING.role.new);
  };
  return (
    <Stack {...options}>
      <SearchBarCombo
        isFiltered={isFiltered}
        filterName={filterName}
        onFilterName={onFilterName}
        onResetFilterName={onResetFilter}
        onAddButton={toggleAdd}
        addButtonName={BUTTONS.ADDROLE}
      />
    </Stack>
  );
}
