import { useEffect } from 'react';
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
  // const [sideBarLayout, setSideBarLayout] = useState(false);

  useEffect(() => {
    let timeout = null;
    const onHandleResize = () => {
      if (timeout) clearTimeout(timeout);
      timeout = setTimeout(() => {
        // if (window.innerWidth < 1580) setSideBarLayout(true);
        // if (window.innerWidth > 1580) setSideBarLayout(false);
      }, 150);
    };

    window.addEventListener('resize', onHandleResize);
    return () => window.removeEventListener('resize', onHandleResize);
  }, []);

  return (
    <Layout>
      <Header style={{
        padding: 0, backgroundColor: 'rgba(255,255,255,1)', borderRadius: '0 0 16px 16px', boxShadow: '0 4px 16px #eef4f7',
      }}
      >
        <AppHeader />
      </Header>
      <Layout>
        <Sider
          width={270}
          className="h-screen sticky top-0 font-mulish-semi-bold text-xs border-r-4 border-gray-100"
        >
          <Sidebar />
        </Sider>
        <Content className="py-6">
          {children}
        </Content>
      </Layout>
    </Layout>
  );
};
export default MainLayout;
