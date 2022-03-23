import { useState } from 'react';
import { Input, Popover, Button } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
import { connect } from 'react-redux';
import { userLogout } from 'redux/user/actions';

const Header = ({ logout }) => {
  const [searchLoading, setSearchLoading] = useState(false);

  // global search input on enter
  const globalSearch = () => {
    setSearchLoading(true);
    setTimeout(() => setSearchLoading(false), 1500);
  };

  const showUserProfile = () => { };

  return (
    <div className="flex justify-between pt-3" style={{ margin: 'auto', height: 64 }}>
      <Input
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
        className="w-25"
        style={{ marginLeft: '-11px' }}
        suffix={searchLoading && <LoadingOutlined />}
        bordered={false}
        onPressEnter={({ target: { value } }) => globalSearch(value)}
      />
      <div className="flex items-center">
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
            style={{ cursor: 'pointer' }}
            onClick={showUserProfile}
            src="/assets/images/general/man.svg"
            alt="user"
            width="50"
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
