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
      key: '/cities/citieslist',
    },
    {
      title: 'Garage',
      icon: '/assets/images/logo/sidebarLogo/garage.svg',
      key: '/garage/garagelist',
    },
    {
      title: 'User Profiles',
      icon: '/assets/images/logo/sidebarLogo/people.svg',
      key: '/userProfiles/userProfiles',
    },
    {
      title: 'User Roles',
      icon: '/assets/images/logo/sidebarLogo/roles.svg',
      key: '/userroles/userroleslist',
    },
    {
      title: 'Modules',
      icon: '/assets/images/logo/sidebarLogo/modules.svg',
      key: '/modules/modules',
    },
    {
      title: 'Processes',
      icon: '/assets/images/logo/sidebarLogo/processes.svg',
      key: '/processes/processes',
    },
    // {
    //   title: 'RoadTrial',
    //   icon: '/assets/images/logo/sidebarLogo/processes.svg',
    //   key: '/roadTrial/roadTrial',
    // },
    // {
    //   title: 'Pickup Locations',
    //   icon: '/assets/images/logo/sidebarLogo/garage.svg',
    //   key: '/pickupLocations/pickupLocations',
    // },
  ];

  // const settingPath = '/setting';
  return (
    <>
      <div className={`py-3 px-6 flex items-center border-b border-gray-100 ${sideBarLayout ? 'justify-center' : ''}`} />
      <Menu
        style={{ borderRight: 'none' }}
        selectedKeys={[pathname]}
        onClick={({ key }) => history.push(key)}
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
              className="text-xs font-quicksand-semi-bold"
            >
              {title}
            </Item>
          );
        })}
      </Menu>
      {/* <Menu
        style={{ borderRight: 'none', marginTop: '95%' }}
        mode="inline"
        selectedKeys={[pathname]}
        onClick={({ settingPath = '/setting' }) => history.push(settingPath)}
      >
        <Item
          icon={
            <img
              style={{ paddingBottom: '0.22rem' }}
              src="/assets/images/logo/sidebarLogo/settings.svg"
              alt="settings"
            />
          }
          className="text-xs font-quicksand-semi-bold"
        >
          Settings
        </Item>
      </Menu> */}
    </>
  );
};

const mapStateToProps = ({ userReducer }) => ({
  permission: userReducer.permission,
});

export default connect(mapStateToProps, null)((withRouter(Sidebar)));
