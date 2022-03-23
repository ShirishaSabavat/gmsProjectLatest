import { Helmet } from 'react-helmet';
import Breadcrumb from 'components/layouts/breadcrumb';
import Partner from 'components/app/partner/index';

const nestedPath = [
  'Home',
  'Partner',
];

const PartnerPage = () => (
  <>
    <Helmet title="Partner" />
    <div className="flex flex-col space-y-12">
      <div className="space-y-2">
        <span className="font-montserrat-medium text-4xl">
          Partner
        </span>
        <Breadcrumb nestedPath={nestedPath} />
      </div>
      <Partner />
    </div>
  </>
);

export default PartnerPage;
