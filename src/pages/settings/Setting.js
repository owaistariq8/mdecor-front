import { useNavigate } from 'react-router-dom';
// @mui
import { Box, Container, List } from '@mui/material';
// routes
import { PATH_USER, PATH_SETTING } from '../../routes/paths';
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

// ----------------------------------------------------------------------

export default function Setting() {

  const { isEmailAccessAllowed, isSettingAccessAllowed, isAllAccessAllowed, isDeveloper } = useAuthContext()

  const navigate = useNavigate();

  const linkDocumentType = () => navigate(PATH_SETTING.documentType.list);
  const linkDocumentCategory = () => navigate(PATH_SETTING.documentCategory.list);
  const linkRole = () => navigate(PATH_SETTING.role.list);
  const linkSignInLogs = () => navigate(PATH_SETTING.signInLogs.list);
  const linkRegions = () => navigate(PATH_SETTING.regions.list);
  const linkConfigs = () => navigate(PATH_SETTING.configs.list);
  const linkEmails = () => navigate(PATH_SETTING.email.list);
  const linkUserInvites = () => navigate(PATH_SETTING.invite.list);
  const releases = () => navigate(PATH_SETTING.releases.list);
  const linkBlockedCustomer = () => navigate(PATH_USER.config.blockedCustomer.list);
  const linkBlockedUser = () => navigate(PATH_USER.config.blockedUser.list);
  const linkBlackListIP = () => navigate(PATH_USER.config.blacklistIP.list);
  const linkWhiteListIP = () => navigate(PATH_USER.config.whitelistIP.list);

return (
    <Container maxWidth={false}>
      <StyledCardContainer>
        <Cover name={FORMLABELS.COVER.SETTINGS} icon="mdi:cogs" />
      </StyledCardContainer>

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
            <StyledSettingsCardContainer>
                <List
                  component="nav"
                  aria-labelledby="nested-list-subheader"
                  subheader={<ListItemsHeader header={FORMLABELS.SECURITY_SETTINGS} />}
                >
                  <ListItem
                    onClick={linkRole}
                    icon={ICONS.SECURITY_ROLES.icon}
                    content={ICONS.SECURITY_ROLES.heading}
                  />
                </List>
                
                
            </StyledSettingsCardContainer>
            
          </Box>
    </Container>
  );
}
