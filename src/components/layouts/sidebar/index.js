import { Menu } from 'antd';
import {
  HomeOutlined,
} from '@ant-design/icons';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { history } from 'redux/store';

const { SubMenu, Item } = Menu;

const sidebarMenu = [
  {
    title: 'Home',
    icon: HomeOutlined,
    subMenu: [
      {
        key: '/home/dashboard',
        label: 'Dashboard',
      },
      {
        key: '/partner/partner',
        label: 'Partner',
      },
    ],
  },
];

const Sidebar = ({
  location: {
    pathname,
  },
  sideBarLayout,
  permission,
}) => (
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
      selectedKeys={[pathname]}
      onClick={({ key }) => history.push(key)}
      mode="inline"
    >
      {sidebarMenu.map(({
        title,
        subMenu,
        icon: Icon,
        key: menuKey,
        permission: mainPermission,
      }) => {
        // sub menu
        if (subMenu && subMenu.length) {
          return (
            <SubMenu
              key={title}
              icon={<Icon style={{ paddingBottom: '0.22rem' }} />}
              className="text-xs"
              title={title}
            >
              {subMenu && subMenu.map(({
                key,
                label,
                permission: subPermission,
              }) => {
                // permission wise rendering for sub menu
                if (!permission.includes(subPermission)
                  && subPermission) return null;
                return (
                  <Item
                    key={key}
                    className="text-xs"
                  >
                    {label}
                  </Item>
                );
              })}
            </SubMenu>
          );
        }
        // main menu
        // permission wise rendering for sub menu
        if (!permission.includes(mainPermission)
          && mainPermission) return null;
        return (
          <Item
            icon={<Icon style={{ paddingBottom: '0.22rem' }} />}
            key={menuKey}
            className="text-xs"
          >
            {title}
          </Item>
        );
      })}
    </Menu>
  </>
);

const mapStateToProps = ({ userReducer }) => ({
  permission: userReducer.permission,
});

export default connect(mapStateToProps, null)((withRouter(Sidebar)));
