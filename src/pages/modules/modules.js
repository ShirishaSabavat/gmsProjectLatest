import { Helmet } from 'react-helmet';
import Breadcrumb from 'components/layouts/breadcrumb';
// import { useState } from "react";
import Modules from 'components/app/modules/index';
// import CreateModules from "components/app/modules/createModules";
import { Link } from 'react-router-dom';

const nestedPath = [
  'Home',
  'Modules',
];

const ModulesPage = () => (
  // const [onClickValue, setOnClickValue] = useState(false);

  // const createModule = () => {
  //   setOnClickValue(true);
  // };
  <>
    <Helmet title="Modules" />
    <div style={{ fontFamily: 'Quicksand' }} className="row space-y-4">
      <div className="col-12">
        <div className="row pl-8">
          <div className="col-6">
            <span className="font-quicksand-semi-bold text-2xl font-semi-bold text-[#3D3D3D]">
              Modules
            </span>
            <Breadcrumb nestedPath={nestedPath} />
          </div>
          <div className="col-6 flex flex-row justify-end">
            <Link
              to={{ pathname: 'addModule', state: { id: -1 } }}
              style={{
                marginRight: '20px', borderRadius: '4px', fontWeight: '500', backgroundColor: '#013453', color: '#FFFFFF', fontSize: '16px', width: '192px', height: '52px', boxShadow: '0px 8px 16px #005B923D', padding: '13px 30px', textDecoration: 'none',
              }}
            >
              Create Module +
            </Link>
          </div>
        </div>
      </div>
      <div className="col-12">
        <Modules />
      </div>
    </div>
  </>
);

export default ModulesPage;
