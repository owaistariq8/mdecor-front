import { useEffect, useState } from 'react';
import { PATH_CRM, PATH_DASHBOARD, PATH_SETTING, PATH_USER } from '../../../routes/paths';
// components
import Iconify from '../../../components/iconify';
import SvgColor from '../../../components/svg-color';

// ----------------------------------------------------------------------

function NavigationConfig() {

  const icon = (name) => (
    <SvgColor src={`/assets/icons/navbar/${name}.svg`} sx={{ width: 1, height: 1 }} />
  );
  
  const ICONS = {
    blog: icon('ic_blog'),
    cart: icon('ic_cart'),
    chat: icon('ic_chat'),
    mail: icon('ic_mail'),
    user: icon('ic_user'),
    file: icon('ic_file'),
    lock: icon('ic_lock'),
    label: icon('ic_label'),
    blank: icon('ic_blank'),
    kanban: icon('ic_kanban'),
    folder: icon('ic_folder'),
    banking: icon('ic_banking'),
    booking: icon('ic_booking'),
    disabled: icon('ic_disabled'),
    external: icon('ic_external'),
    menuItem: icon('ic_menu_item'),
    ecommerce: icon('ic_ecommerce'),
    asset: icon('ic_ecommerce'),
    dashboard: <Iconify icon="mdi:view-dashboard" />,
    setting: <Iconify icon="ant-design:setting-filled" />,
    reports: <Iconify icon="mdi:report-box-outline" />,
    users: <Iconify icon="mdi:account-group" />,
    security: <Iconify icon="mdi:security-account" />,
  };

    
  const [navConfig, setConfig] = useState([
    {
      subheader: 'general',
      items: [
        { title: 'Dashboard', path: PATH_DASHBOARD.root, icon: ICONS.dashboard },
        { title: 'Customers', path: PATH_CRM.customers.list, icon: ICONS.users },
        { title: 'Users', path: PATH_USER.root, icon: ICONS.security },
        { title: 'Settings', path: PATH_SETTING.root, icon: ICONS.setting },
      ],
    },
  ]);


  useEffect(() => {
    const updatedConfig = [...navConfig];

    
    setConfig(updatedConfig);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [  ]);

  return navConfig;
};
// NavigationConfig()
// console.log("inside NavigationConfig : ",NavigationConfig)
export default NavigationConfig;
