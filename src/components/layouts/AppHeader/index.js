import { useState } from 'react';
import { Input, Popover, Button } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
import { connect } from 'react-redux';
import { userLogout } from 'redux/user/actions';
import './styles.css';

const Header = ({ logout }) => {
  const [searchLoading, setSearchLoading] = useState(false);

  // global search input on enter
  const globalSearch = () => {
    setSearchLoading(true);
    setTimeout(() => setSearchLoading(false), 1500);
  };

  const showUserProfile = () => { };
  const user = localStorage.getItem('user');

  return (
    <div className="flex justify-between" style={{ margin: 'auto', height: 64 }}>
      <img
        src="/assets/images/logo/Web-Logo.png"
        alt="app-logo"
        className="h-8"
        style={{ margin: '1% 0 0 3%' }}
      />
      {/* <Input
        size="medium"
        placeholder="Search for anything..."
        prefix={(
          <img
            className="mr-3"
            src="/assets/images/general/loupe.svg"
            alt="search"
            width="10"
          />
        )}
        style={{
          marginLeft: '-11px', marginBottom: '8px', marginTop: '8px', backgroundColor: 'rgba(245,248,252,1)', width: '42%',
        }}
        suffix={searchLoading && <LoadingOutlined />}
        bordered={false}
        onPressEnter={({ target: { value } }) => globalSearch(value)}
      /> */}
      <div className="flex items-center">
        <div id="Notification">
          <div id="Chart_Button_Copy">
            <svg className="Chart_Area">
              <ellipse id="Chart_Area" rx="16" ry="16" cx="16" cy="16" />
            </svg>
            <div id="fi-sr-bell">
              <svg className="Path_453" viewBox="7.424 21 5.522 1.81">
                <path id="Path_453" d="M 7.423999786376953 21 C 7.902005672454834 22.09914398193359 8.986429214477539 22.8100700378418 10.18501281738281 22.8100700378418 C 11.38359546661377 22.8100700378418 12.46801853179932 22.09914207458496 12.94602394104004 21 L 7.423999786376953 21 Z" />
              </svg>
              <svg className="Path_454" viewBox="1.09 -0.001 12.983 11.464">
                <path id="Path_454" d="M 13.94294261932373 7.571389675140381 L 12.89549541473389 4.118314743041992 C 12.20535850524902 1.633413553237915 9.913553237915039 -0.06365711987018585 7.33540678024292 0.001096232561394572 C 4.757261753082275 0.06584901362657547 2.553540229797363 1.875829100608826 1.989014625549316 4.392243385314941 L 1.175674438476562 7.733092784881592 C 0.9566420912742615 8.63255786895752 1.162704825401306 9.582790374755859 1.734647989273071 10.31072998046875 C 2.306591272354126 11.03866767883301 3.181086301803589 11.46371078491211 4.106836318969727 11.46371746063232 L 11.05582714080811 11.46371746063232 C 12.01117134094238 11.46371746063232 12.90997314453125 11.01131439208984 13.47903060913086 10.24407196044922 C 14.04805278778076 9.476933479309082 14.22015380859375 8.485523223876953 13.94294357299805 7.571389675140381 Z" />
              </svg>
            </div>
          </div>
          <div id="Chart_Notification">
            <svg className="Chart_Notification_Area">
              <ellipse id="Chart_Notification_Area" rx="8" ry="8" cx="8" cy="8" />
            </svg>
            <div id="n_">
              <span>3</span>
            </div>
          </div>
        </div>
        <div id="Jessica_Smith">
          <span>{user}</span>
        </div>
        <Popover
          placement="bottomRight"
          title="Profile"
          content={(
            <Button
              onClick={logout}
              type="primary"
            >
              Sign Out
            </Button>
          )}
          trigger="click"
        >
          <img
            style={{
              cursor: 'pointer',
              width: '32px',
              height: '32px',
              left: '122px',
              top: '0px',
              overflow: 'visible',
            }}
            onClick={showUserProfile}
            src="/assets/images/logo/profile.png"
            alt="user"
            className="mr-4"
          />
        </Popover>
      </div>
    </div>
  );
};

const mapDispatchToProps = (dispatch) => ({
  logout: () => dispatch(userLogout()),
});

export default connect(null, mapDispatchToProps)(Header);
