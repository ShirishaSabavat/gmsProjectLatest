import { useState, useEffect } from 'react';
import { Layout } from 'antd';
import AppHeader from 'components/layouts/AppHeader';
import Sidebar from 'components/layouts/sidebar';

const {
  Header,
  Sider,
  Content,
} = Layout;

const MainLayout = ({
  children,
}) => {
  const [sideBarLayout, setSideBarLayout] = useState(false);

  useEffect(() => {
    let timeout = null;
    const onHandleResize = () => {
      if (timeout) clearTimeout(timeout);
      timeout = setTimeout(() => {
        if (window.innerWidth < 1580) setSideBarLayout(true);
        if (window.innerWidth > 1580) setSideBarLayout(false);
      }, 150);
    };

    window.addEventListener('resize', onHandleResize);
    return () => window.removeEventListener('resize', onHandleResize);
  }, []);

  return (
    <Layout>
      <Sider
        collapsible
        collapsed={sideBarLayout}
        width={270}
        defaultCollapsed={false}
        className="h-screen sticky top-0 font-mulish-semi-bold text-xs border-r-4 border-gray-100"
        trigger={(
          <div className="border-t border-r-4 border-gray-100">
            {sideBarLayout ? 'Expand' : 'Collapse'}
          </div>
        )}
        onCollapse={() => setSideBarLayout((prevState) => !prevState)}
      >
        <Sidebar />
      </Sider>
      <Layout className="px-10 bg-gray-50">
        <Header style={{ padding: 0, backgroundColor: 'transparent' }}>
          <AppHeader />
        </Header>
        <Content className="py-6">
          {children}
        </Content>
      </Layout>
    </Layout>
  );
};
export default MainLayout;
