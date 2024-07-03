import { useNavigate } from 'react-router-dom';
// @mui
import { Box, Card, CardContent, CardHeader, Container, List } from '@mui/material';
// routes
import { PATH_SETTING } from '../../routes/paths';
// components
import { Cover } from '../../components/Defaults/Cover';
import { StyledCardContainer } from '../../theme/styles/default-styles';
import { StyledSettingsCardContainer } from '../../theme/styles/machine-styles';
import ListItemsHeader from '../../components/ListTableTools/ListItemsHeader';
import ListItem from '../../components/ListTableTools/ListItem';
// constants
import { FORMLABELS } from '../../constants/default-constants';
import { ICONS } from '../../constants/icons/default-icons';
import { useAuthContext } from '../../auth/useAuthContext';
import PageCover from '../../components/Defaults/PageCover';
import { StyledCardHeader } from '../../components/settings/styles';

// ----------------------------------------------------------------------

export default function Setting() {

  const { isEmailAccessAllowed, isSettingAccessAllowed, isAllAccessAllowed, isDeveloper } = useAuthContext()

  const navigate = useNavigate();

  const linkItemCategory = () => navigate(PATH_SETTING.item_category.list);
  const linkItem = () => navigate(PATH_SETTING.item.list);
  const linkRole = () => navigate(PATH_SETTING.role.list);
  
return (
    <Container maxWidth={false}>
      <PageCover title='Settings'/>
      <Box
          rowGap={1}
          columnGap={4}
          display="grid"
          gridTemplateColumns={{
            xs: 'repeat(1, 1fr)',
            sm: 'repeat(1, 1fr)',
            lg: 'repeat(3, 1fr)',
          }}
        >
          <Card>
            <StyledCardHeader subheader title="Item Setting" />
            <CardContent sx={{p:0, color:'text.disabled'}}>
              <ListItem onClick={linkItemCategory} icon={ICONS.ITEM_CATEGORY.icon} content={ICONS.ITEM_CATEGORY.heading} />
              <ListItem onClick={linkItem} icon={ICONS.ITEM_LIST.icon} content={ICONS.ITEM_LIST.heading} />
            </CardContent>
          </Card>
          <Card>
            <StyledCardHeader subheader title="Security Settings" />
            <CardContent sx={{p:0, color:'text.disabled'}}>
              <ListItem onClick={linkRole} icon={ICONS.SECURITY_ROLES.icon} content={ICONS.SECURITY_ROLES.heading} />
            </CardContent>
          </Card>
      </Box>
    </Container>
  );
}
