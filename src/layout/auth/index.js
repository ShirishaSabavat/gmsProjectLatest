import { Layout } from "antd";
import AuthHeader from "components/layouts/authHeader";

const { Header, Content } = Layout;

const AuthLayout = ({ children }) => (
  <Layout>
    <Header className="flex justify-between py-3 border-b">
      <AuthHeader />
    </Header>
    <Content>
      {children}
    </Content>
  </Layout>
);

export default AuthLayout;
