import { Breadcrumb } from 'antd';
import { v4 as uuidv4 } from 'uuid';

const { Item } = Breadcrumb;
const AppBreadcrumb = ({ nestedPath }) => (
  <Breadcrumb className="font-mulish-semi-bold">
    {nestedPath?.map((title) => (
      <Item key={uuidv4()}>
        {title}
      </Item>
    ))}
  </Breadcrumb>
);

export default AppBreadcrumb;
