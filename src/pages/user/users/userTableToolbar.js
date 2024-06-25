import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
// @mui
import { Stack } from '@mui/material';
// redux
import { useDispatch } from '../../../redux/store';
// components
import SearchBarCombo from '../../../components/ListTableTools/SearchBarCombo';
import { PATH_USER } from '../../../routes/paths';
import { setUserFormVisibility } from '../../../redux/slices/user/user';
import { BUTTONS } from '../../../constants/default-constants';
import { options } from '../../../theme/styles/default-styles';

// ----------------------------------------------------------------------

UserTableToolbar.propTypes = {
  isFiltered: PropTypes.bool,
  filterName: PropTypes.string,
  filterRole: PropTypes.string,
  onFilterName: PropTypes.func,
  onFilterRole: PropTypes.func,
  onResetFilter: PropTypes.func,
  optionsRole: PropTypes.arrayOf(PropTypes.string),
  filterListBy: PropTypes.string,
  onFilterListBy: PropTypes.func,
  employeeFilterListBy: PropTypes.string,
  onEmployeeFilterListBy: PropTypes.func,
  onFilterListByRegion: PropTypes.func,
  filterByRegion: PropTypes.object,
  onReload: PropTypes.func,
};

export default function UserTableToolbar({
  isFiltered,
  filterName,
  filterRole,
  filterListBy,
  onFilterListBy,
  employeeFilterListBy,
  onEmployeeFilterListBy,
  onFilterListByRegion,
  filterByRegion,
  optionsRole,
  onFilterName,
  onFilterRole,
  onResetFilter,
  onReload
}) {
  
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const formNewVisibleToggle = () => {
    dispatch(setUserFormVisibility(true));
    navigate(PATH_USER.users.new);
  };

  const formInviteVisibleToggle = () => {
    dispatch(setUserFormVisibility(true));
    navigate(PATH_USER.users.invite);
  };

  return (
    <Stack {...options}>
      <SearchBarCombo
        isFiltered={isFiltered}
        value={filterName}
        onChange={onFilterName}
        onClick={onResetFilter}
        SubOnClick={formNewVisibleToggle}
        inviteOnClick={formInviteVisibleToggle}
        filterListBy={filterListBy}
        onFilterListBy={onFilterListBy}
        employeeFilterListBy={employeeFilterListBy}
        onEmployeeFilterListBy={onEmployeeFilterListBy}
        onFilterListByRegion={onFilterListByRegion}
        filterByRegion={filterByRegion}
        addButton={BUTTONS.ADDUSER}
        inviteButton={BUTTONS.INVITEUSER}
        onReload={onReload}
        userPage
      />
    </Stack>
  );
}