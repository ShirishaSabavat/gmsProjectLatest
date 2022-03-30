import { Menu } from 'antd';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { history } from 'redux/store';

const { Item } = Menu;

const Sidebar = ({
  location: {
    pathname,
  },
  sideBarLayout,
  permission,
}) => {
  const sidebarMenu = [
    {
      title: 'Home',
      icon: '/assets/images/logo/sidebarLogo/home.svg',
      key: '/home/dashboard',
    },
    {
      title: 'Cities',
      icon: '/assets/images/logo/sidebarLogo/cities.svg',
      key: '/partner/partner',
    },
    {
      title: 'Garage',
      icon: '/assets/images/logo/sidebarLogo/garage.svg',
      key: '/home/garage',
    },
    {
      title: 'People',
      icon: '/assets/images/logo/sidebarLogo/people.svg',
      key: '/partner/people',
    },
  ];

  // const settingPath = '/setting';
  return (
    <>
      <div className={`py-3 px-6 flex items-center border-b border-gray-100 ${sideBarLayout ? 'justify-center' : ''}`}>
        <img
          src="/assets/images/logo/app-logo.svg"
          alt="app-logo"
          className="h-8"
        />
      </div>
      <Menu
        style={{ borderRight: 'none' }}
        mode="inline"
      >
        {sidebarMenu.map(({
          title,
          icon,
          key: menuKey,
          permission: mainPermission,
        }) => {
          // main menu
          // permission wise rendering for sub menu
          if (!permission.includes(mainPermission)
          && mainPermission) return null;
          return (
            <Item
              icon={<img style={{ paddingBottom: '0.22rem' }} src={icon} alt={icon} />}
              key={menuKey}
              className="text-xs"
            >
              {title}
            </Item>
          );
        })}
      </Menu>
      <Menu
        style={{ borderRight: 'none', marginTop: '95%' }}
        mode="inline"
        selectedKeys={[pathname]}
        onClick={({ key }) => history.push(key)}
      >
        <Item
          icon={<img style={{ paddingBottom: '0.22rem' }} src="/assets/images/logo/sidebarLogo/settings.svg" alt="settings" />}
          className="text-xs"
        >
          Settings
        </Item>
      </Menu>
    </>
  );
};

const mapStateToProps = ({ userReducer }) => ({
  permission: userReducer.permission,
});

export default connect(mapStateToProps, null)((withRouter(Sidebar)));
