/* eslint-disable global-require */
import { Helmet } from 'react-helmet';
import Breadcrumb from 'components/layouts/breadcrumb';
import { Button } from 'antd';
import { Link } from 'react-router-dom';

const nestedPath = [
  'Home',
  'Dashboard',
];

const homepage = () => {
  // const goToCarFormPage = () => {
  //   window.location.href = '#/gatekeeper/carformpage';
  // };
  const goToCarListPage = () => {
    window.location.href = '#/gatekeeper/carslist';
  };
  return (
    <>
      <Helmet title="Dashboard" />
      <div className="flex flex-col space-y-12 mx-3">
        <div className="space-y-2 ml-3">
          <span className="font-quicksand-semi-bold text-xl">
            Gatekeeper
          </span>
          <Breadcrumb nestedPath={nestedPath} />
        </div>
        <div className="flex bg-white rounded-lg my-3 mx-8 justify-center">
          <div>
            <div className="flex flex-row justify-center">
              <img className="w-28 h-28 my-3 rounded-full align-middle" alt="" src={require('../../components/layouts/defaultperson.jpg')} />
            </div>
            <h1 className="font-quicksand-bold text-xl mt-6 text-center">Shreyas Gupta</h1>
            <h1 className="font-quicksand-semi-bold text-base mt-3 text-center">Gatekeeper Auditor</h1>
            <div className="flex flex-row justify-center">
              <h1 className="font-quicksand-semi-bold text-base mt-3">ID: </h1>
              <h1 className="font-quicksand-semi-bold text-base mt-3 text-teal-300"> EFV564651654</h1>
            </div>
            <div className="flex flex-row justify-center">
              <h1 className="font-quicksand-semi-bold text-base my-3">Last Login: </h1>
              <h1 className="font-quicksand-semi-bold text-base my-3 text-teal-300"> 17/01/2022 10:52:20</h1>
            </div>
          </div>
        </div>
        <div className="flex bg-white rounded-lg my-3 mx-8 justify-center py-24">
          <div>
            <div className="col-12 flex flex-row justify-end">
              <Link
                to={{ pathname: 'carformpage', state: { carId: -1, carnumber: -1 } }}
                className="font-quicksand-medium"
                style={{
                  marginRight: '20px', borderRadius: '4px', fontWeight: '500', backgroundColor: '#74d1d8', color: '#FFFFFF', fontSize: '16px', width: '150px', height: '52px', boxShadow: '0px 8px 16px #005B923D', textDecoration: 'none', padding: '13px 25px',
                }}
              >
                New Car Visit
              </Link>
            </div>
            <div className="col-12 flex flex-row justify-end mt-10">
              <Button
                onClick={goToCarListPage}
                className="font-quicksand-medium"
                style={{
                  marginRight: '20px', borderRadius: '4px', fontWeight: '500', backgroundColor: '#013453', color: '#FFFFFF', fontSize: '16px', width: '150px', height: '52px', boxShadow: '0px 8px 16px #005B923D', textDecoration: 'none', padding: '13px 30px',
                }}
              >
                Modify Visit
              </Button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default homepage;
