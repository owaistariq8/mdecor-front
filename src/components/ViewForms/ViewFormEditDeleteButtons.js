import PropTypes from 'prop-types';
import { LoadingButton } from '@mui/lab';
import { Badge, Box, Divider, Grid, TextField } from '@mui/material';
import { useDispatch } from 'react-redux';
import { memo, useState, useLayoutEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { green } from '@mui/material/colors';
import { DateTimePicker } from '@mui/x-date-pickers';
import { createTheme } from '@mui/material/styles';
import { StyledStack } from '../../theme/styles/default-styles';
import ConfirmDialog from '../confirm-dialog';
import useResponsive from '../../hooks/useResponsive';
import { getActiveCustomers } from '../../redux/slices/customer/customer';
import IconPopover from '../Icons/IconPopover';
import IconTooltip from '../Icons/IconTooltip';
import ViewFormMenuPopover from './ViewFormMenuPopover';
import ViewFormTransferHistoryMenuPopover from './ViewFormTransferHistoryMenuPopover';
import ViewFormMachineSettingHistoryMenuPopover from './ViewFormMachineSettingHistoryMenuPopover';
import ViewFormApprovalsPopover from './ViewFormApprovalsPopover';
import { ICONS } from '../../constants/icons/default-icons';
import { fDate, fDateTime, GetDifferenceInDays } from '../../utils/formatTime';
import { useAuthContext } from '../../auth/useAuthContext';
import { PATH_DASHBOARD } from '../../routes/paths';

function ViewFormEditDeleteButtons({
  backLink,
  isActive,
  isReleased,
  isDefault,
  isIniRead,
  isManufacture,
  isDeleteDisabled,
  customerAccess,
  forCustomer,
  formerEmployee,
  isRequired,
  multiAuth,
  currentEmp,
  machineSettingPage,
  settingPage,
  securityUserPage,
  transferredHistory,
  // Handlers
  handleVerification,
  handleVerificationTitle,
  onDelete,
  handleEdit,
  handleJiraNaviagte,
  handleTransfer,
  handleUpdatePassword,
  handleUserInvite,
  handleSendPDFEmail,
  handleViewPDF,
  isSubmitted,
  returnToSubmitted,
  approvers,
  isVerifiedTitle,
  isInviteLoading,
  type,
  sites,
  mainSite,
  handleMap,
  moveCustomerContact,
  approveConfig,
  approveHandler,
  copyConfiguration,
  onUserStatusChange,
  financingCompany,

  // DISABLE
  disableTransferButton = false,
  disableDeleteButton = false,
  disablePasswordButton = false,
  disableEditButton = false,
  isLoading,

  // ICONS & HANDLERS
  verifiers,
  userStatus,
  supportSubscription,
  machineSupportDate,
  approveConfiglength,
  excludeReports,
  isConectable,
  hanldeViewGallery,
  customerPage, 
  machinePage, 
  drawingPage,
  history,
}) {
  const { id } = useParams();
  const navigate = useNavigate()
  const userId = localStorage.getItem('userId');
  
  const { 
    isDisableDelete, 
    isSettingReadOnly, 
    isSecurityReadOnly, 
    isSettingAccessAllowed,
    isSecurityUserAccessAllowed, } = useAuthContext();

  const dispatch = useDispatch();
  const [openConfirm, setOpenConfirm] = useState(false);
  const [openUserInviteConfirm, setOpenUserInviteConfirm] = useState(false);
  const [openVerificationConfirm, setOpenVerificationConfirm] = useState(false);
  const [openUserStatuConfirm, setOpenUserStatuConfirm] = useState(false);
  const [openConfigDraftStatuConfirm, setOpenConfigDraftStatuConfirm] = useState(false);
  const [openConfigSubmittedStatuConfirm, setOpenConfigSubmittedStatuConfirm] = useState(false);
  const [openConfigApproveStatuConfirm, setOpenConfigApproveStatuConfirm] = useState(false);
  const [lockUntil, setLockUntil] = useState(''); 
  const [lockUntilError, setLockUntilError] = useState(''); 

  const theme = createTheme({
    palette: {
      success: green,
    },
  });

  // Function to handle date change
  const handleLockUntilChange = newValue => {
    const selectedDate = new Date(newValue);
    if (selectedDate) {
      // Check if the selected date is in the future (optional)
      const currentDate = new Date();
      if (selectedDate < currentDate) {
        setLockUntilError('Please select a future date and time.');
      } else {
        setLockUntil(newValue);
        setLockUntilError(''); // Clear the error when a valid date is selected
      }
    } else {
      setLockUntilError('Invalid date and time'); // Set an error message for an invalid date and time
    }
  };

   // Function to handle date change
   const handleChangeUserStatus = () => {
    if (!lockUntil && !userStatus?.locked) {
      setLockUntilError('Lock Until is required');
    }else{

      if(lockUntil){
        const timeDifference = new Date(lockUntil) - new Date();
        const minutesDifference = timeDifference / (1000 * 60);
        onUserStatusChange(minutesDifference);
      }else{
        onUserStatusChange(0);
      }
      setOpenUserStatuConfirm(false);
    }
    setLockUntil('');
  };

  useLayoutEffect(()=>{
    if(( settingPage || securityUserPage ) && ( !isSettingAccessAllowed || !isSecurityUserAccessAllowed   )){
      navigate(PATH_DASHBOARD.root)
    }
  },[ 
    settingPage, 
    securityUserPage, 
    isSettingAccessAllowed,
    isSecurityUserAccessAllowed, 
    customerPage, 
    navigate
  ])

  const handleOpenConfirm = (dialogType) => {

    if (dialogType === 'UserInvite') {
      setOpenUserInviteConfirm(true);
    }

    if (dialogType === 'Verification') {
      setOpenVerificationConfirm(true);
    }

    if (dialogType === 'delete' && ( !isDisableDelete || !disableDeleteButton ) ) {
      setOpenConfirm(true);
    }

    if (dialogType === 'UserStatus') {
      setOpenUserStatuConfirm(true);
    }

    
  };

  const handleCloseConfirm = (dialogType) => {

    if (dialogType === 'UserInvite') {
      setOpenUserInviteConfirm(false);
    }

    if (dialogType === 'Verification') {
      reset();
      setOpenVerificationConfirm(false);
    }
    if (dialogType === 'delete') {
      reset();
      setOpenConfirm(false);
    }

    if (dialogType === 'UserStatus') {
      setOpenUserStatuConfirm(false);
      setLockUntilError('');
    }
    
    
  };

  const handleVerificationConfirm = () => {
    handleVerification();
    handleCloseConfirm('Verification');
  };
  
  const [verifiedAnchorEl, setVerifiedAnchorEl] = useState(null);
  const [verifiedBy, setVerifiedBy] = useState([]);

  const [approvedAnchorEl, setApprovedAnchorEl] = useState(null);
  const [approvedBy, setApprovedBy] = useState([]);

  const handleVerifiedPopoverOpen = (event) => {
    setVerifiedAnchorEl(event.currentTarget);
    setVerifiedBy(verifiers)
  };

  const handleVerifiedPopoverClose = () => {
    setVerifiedAnchorEl(null);
    setVerifiedBy([])
  };

  const handleApprovedPopoverOpen = (event) => {
    setApprovedAnchorEl(event.currentTarget);
    setApprovedBy(approvers)
  };

  const handleApprovedPopoverClose = () => {
    setApprovedAnchorEl(null);
    setApprovedBy([])
  };

  const { isMobile } = useResponsive('down', 'sm');
  const methods = useForm();

  const {
    reset,
    handleSubmit,
    formState: { isSubmitting, isSubmitSuccessful },
  } = methods;

  const machineSupport = {
    status: GetDifferenceInDays( machineSupportDate ),
    date: new Date(machineSupportDate)
  }
  
  return (
    <Grid container justifyContent="space-between" sx={{pb:1, px:0.5}}>
      <Grid item sx={{display:'flex', mt:0.5,mr:1}}>
        <StyledStack>
          {backLink &&
            <>
              <IconTooltip
                title='Back'
                onClick={() => backLink()
                }
                color={theme.palette.primary.main}
                icon="mdi:arrow-left"
              />
              {/* <Divider */}
              <Divider orientation="vertical" flexItem />
            </>
          }
          { isReleased !== undefined && 
            <IconTooltip
              title={isReleased ? ICONS.RELEASE.heading:ICONS.NOTRELEASE.heading}
              color={isReleased ? ICONS.RELEASE.color:ICONS.NOTRELEASE.color}
              icon={isReleased ? ICONS.RELEASE.icon:ICONS.NOTRELEASE.icon}
            />
          }

          {isActive!==undefined &&
            <IconTooltip
              title={isActive?ICONS.ACTIVE.heading:ICONS.INACTIVE.heading}
              color={isActive?ICONS.ACTIVE.color:ICONS.INACTIVE.color}
              icon={isActive?ICONS.ACTIVE.icon:ICONS.INACTIVE.icon}
            />
          }
          {isIniRead!==undefined &&
            <IconTooltip
              title={isIniRead ? ICONS.READINI.heading:ICONS.NOTREADINI.heading}
              color={isIniRead ? ICONS.READINI.color:ICONS.NOTREADINI.color}
              icon={isIniRead ? ICONS.READINI.icon:ICONS.NOTREADINI.icon}
            />
          }

          {isManufacture !==undefined &&
            <IconTooltip
              title={isManufacture ? ICONS.MANUFACTURE.heading : ICONS.NOTMANUFACTURE.heading}
              color={isManufacture ? ICONS.MANUFACTURE.color : ICONS.NOTMANUFACTURE.color}
              icon={isManufacture ? ICONS.MANUFACTURE.icon : ICONS.NOTMANUFACTURE.icon}
            />
          }

          {isDeleteDisabled !==undefined &&
            <IconTooltip
              title= { isDeleteDisabled ? ICONS.DELETE_ENABLED.heading:ICONS.DELETE_DISABLED.heading}
              color= { isDeleteDisabled ? ICONS.DELETE_ENABLED.color:ICONS.DELETE_DISABLED.color}
              icon=  { isDeleteDisabled ? ICONS.DELETE_ENABLED.icon:ICONS.DELETE_DISABLED.icon}
            />
          }
          
          {isDefault &&
            <IconTooltip
              title={isDefault?ICONS.DEFAULT.heading:ICONS.CONTRAST.heading}
              color={isDefault?ICONS.DEFAULT.color:ICONS.CONTRAST.color}
              icon= {isDefault?ICONS.DEFAULT.icon:ICONS.CONTRAST.icon}
            />}

          {excludeReports &&
            <IconTooltip title={ICONS.EXCLUDE_REPORTING.heading} color={ICONS.EXCLUDE_REPORTING.color} 
            icon={ICONS.EXCLUDE_REPORTING.icon} />
          }


          {Array.isArray(verifiers) && verifiers?.length>0 &&
            <Badge badgeContent={verifiers.length} color="info">
              <IconTooltip
                title={isVerifiedTitle || 'Verified'}
                color={ICONS.ALLOWED.color}
                icon="ic:outline-verified-user"
                onClick={handleVerifiedPopoverOpen}
                />
            </Badge>
          }

          {approveConfiglength !== undefined &&
            <Badge badgeContent={approveConfiglength} color="info">
              <IconTooltip
                title={approveConfig?ICONS.APPROVED.heading:ICONS.NOTAPPROVED.heading}
                color={approveConfig?ICONS.APPROVED.color:ICONS.NOTAPPROVED.color}
                icon={approveConfig?ICONS.APPROVED.icon:ICONS.NOTAPPROVED.icon}
                onClick={handleApprovedPopoverOpen}
              />
            </Badge>
          }

          {customerAccess !== undefined &&
            <IconTooltip
              title={customerAccess ? ICONS.ALLOWED.heading : ICONS.DISALLOWED.heading}
              color={customerAccess ? ICONS.ALLOWED.color : ICONS.DISALLOWED.color}
              icon={customerAccess ? ICONS.ALLOWED.icon : ICONS.DISALLOWED.icon}
            />
          }

          {forCustomer !== undefined &&
            <IconTooltip
              title={forCustomer ? ICONS.FORCUSTOMER.heading : ICONS.NOTFORCUSTOMER.heading}
              color={forCustomer ? ICONS.FORCUSTOMER.color : ICONS.NOTFORCUSTOMER.color}
              icon={forCustomer ? ICONS.FORCUSTOMER.icon : ICONS.NOTFORCUSTOMER.icon}
            />
          }

          

          {isRequired !== undefined &&
            <IconTooltip
              title={isRequired ? ICONS.REQUIRED.heading : ICONS.NOTREQUIRED.heading}
              color={isRequired ? ICONS.REQUIRED.color : ICONS.NOTREQUIRED.color}
              icon={isRequired ? ICONS.REQUIRED.icon : ICONS.NOTREQUIRED.icon}
            />
          }

          {multiAuth !== undefined &&
            <IconTooltip
              title={multiAuth ? ICONS.MULTIAUTH_ACTIVE.heading : ICONS.MULTIAUTH_INACTIVE.heading}
              color={multiAuth ? ICONS.MULTIAUTH_ACTIVE.color : ICONS.MULTIAUTH_INACTIVE.color}
              icon={multiAuth ? ICONS.MULTIAUTH_ACTIVE.icon : ICONS.MULTIAUTH_INACTIVE.icon}
            />
          }




        </StyledStack>
      </Grid>

      <Grid item  sx={{ ml:'auto', mt:0.5}}>
        <StyledStack>
          {handleVerification && !(verifiers && verifiers.length > 0 && verifiers?.some((verified) => verified?.verifiedBy?._id === userId)) && (
          <IconTooltip
            title={handleVerificationTitle || 'Verify'}
            onClick={() => handleOpenConfirm('Verification')}
            color={theme.palette.primary.main}
            icon="ic:outline-verified-user"
          />
          )}

          {/* User Status Change */}
          {onUserStatusChange && !isSecurityReadOnly && id!==userId &&(
            <IconTooltip
            title={userStatus?.locked?ICONS.USER_UNLOCK.heading:ICONS.USER_LOCK.heading}
            color={userStatus?.locked?ICONS.USER_UNLOCK.color:ICONS.USER_LOCK.color}
            icon={userStatus?.locked?ICONS.USER_UNLOCK.icon:ICONS.USER_LOCK.icon}
            onClick={() =>handleOpenConfirm('UserStatus')}
            />
          )}

        
        {/* map toggle button on mobile */}
        {sites && !isMobile && <IconPopover onMapClick={() => handleMap()} sites={sites} />}

        {/* change password for users */}
        {handleUpdatePassword && (
          <IconTooltip
            title="Change Password"
            disabled={( machineSettingPage || settingPage || securityUserPage ) && ( isSettingReadOnly || isSecurityReadOnly )}
            onClick={() => {
              handleUpdatePassword();
            }}
            color={(disablePasswordButton || ( ( machineSettingPage || settingPage || securityUserPage ) && ( isSettingReadOnly || isSecurityReadOnly ) ))?"#c3c3c3":theme.palette.secondary.main}
            icon="solar:key-broken"
          />
        )}

        {/* edit button */}
        {handleEdit && <IconTooltip
          title="Edit"
          disabled={disableEditButton || (( machineSettingPage || settingPage || securityUserPage ) && ( isSettingReadOnly || isSecurityReadOnly ))}
          onClick={() => {
            handleEdit();
          }}
          color={disableEditButton || (( machineSettingPage || settingPage || securityUserPage ) && ( isSettingReadOnly || isSecurityReadOnly )) ?"#c3c3c3":theme.palette.primary.main}
          icon="mdi:pencil-outline"
        />}

        {/* delete button */}
        {id !== userId  && !mainSite && onDelete && (
          <IconTooltip
            title="Archive"
            disabled={ isDisableDelete || disableDeleteButton }
            onClick={() => {  handleOpenConfirm('delete') }}
            color={( isDisableDelete || disableDeleteButton ) ? "#c3c3c3":"#FF0000"}
            icon="mdi:archive"
          />
        )}
      </StyledStack>


      <ConfirmDialog
        open={openConfirm}
        onClose={() => {
          handleCloseConfirm('delete');
        }}
        title="Archive"
        content="Are you sure you want to Archive?"
        action={
          <LoadingButton
            variant="contained"
            color="error"
            loading={(isSubmitSuccessful || isSubmitting) && isLoading}
            disabled={isSubmitting}
            onClick={handleSubmit(onDelete)}
          >
            Archive
          </LoadingButton>
        }
      />

      <ViewFormMenuPopover
        open={verifiedAnchorEl}
        onClose={handleVerifiedPopoverClose}
        ListArr={verifiedBy}
        ListTitle={isVerifiedTitle || "Verified By"}
      />

      <ViewFormApprovalsPopover
        open={approvedAnchorEl}
        onClose={handleApprovedPopoverClose}
        ListArr={approvedBy}
        ListTitle= "Approved By"
      />
    </Grid>

    </Grid>
  );
}
export default memo(ViewFormEditDeleteButtons)
ViewFormEditDeleteButtons.propTypes = {
  backLink: PropTypes.func,
  handleVerification: PropTypes.any,
  handleVerificationTitle: PropTypes.string,
  verifiers: PropTypes.array,
  approvers: PropTypes.array,
  isVerifiedTitle: PropTypes.string,
  approveConfiglength: PropTypes.string,
  isActive: PropTypes.bool,
  isReleased: PropTypes.bool,
  isIniRead: PropTypes.bool,
  isManufacture: PropTypes.bool,
  isDeleteDisabled: PropTypes.bool,
  isDefault: PropTypes.bool,
  isSubmitted: PropTypes.func,
  returnToSubmitted: PropTypes.func,
  customerAccess:PropTypes.bool,
  forCustomer: PropTypes.bool,
  formerEmployee: PropTypes.bool,
  multiAuth:PropTypes.bool,
  currentEmp:PropTypes.bool,
  isRequired:PropTypes.bool,
  handleTransfer: PropTypes.func,
  handleUpdatePassword: PropTypes.func,
  handleUserInvite: PropTypes.func,
  handleSendPDFEmail: PropTypes.func,
  handleViewPDF: PropTypes.func,
  isInviteLoading:PropTypes.bool,
  handleEdit: PropTypes.func,
  handleJiraNaviagte: PropTypes.func,
  onDelete: PropTypes.func,
  type: PropTypes.string,
  sites: PropTypes.bool,
  mainSite: PropTypes.bool,
  disableTransferButton: PropTypes.bool,
  disablePasswordButton: PropTypes.bool,
  disableDeleteButton: PropTypes.bool,
  disableEditButton: PropTypes.bool,
  handleMap: PropTypes.func,
  machineSupportDate: PropTypes.string,
  transferredHistory: PropTypes.array,
  moveCustomerContact: PropTypes.func,
  approveConfig: PropTypes.bool,
  approveHandler: PropTypes.func,
  copyConfiguration: PropTypes.func,
  supportSubscription: PropTypes.bool,
  userStatus:PropTypes.object,
  onUserStatusChange:PropTypes.func,
  financingCompany: PropTypes.bool,
  isLoading: PropTypes.bool,
  excludeReports: PropTypes.bool,
  isConectable: PropTypes.bool,
  machineSettingPage: PropTypes.bool,
  settingPage: PropTypes.bool,
  securityUserPage: PropTypes.bool,
  hanldeViewGallery: PropTypes.func,
  customerPage: PropTypes.bool, 
  machinePage: PropTypes.bool, 
  drawingPage: PropTypes.bool,
  history: PropTypes.array,
};
