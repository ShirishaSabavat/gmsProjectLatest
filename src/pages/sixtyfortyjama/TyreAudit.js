/* eslint-disable global-require */
import Breadcrumb from 'components/layouts/breadcrumb';
import { Helmet } from 'react-helmet';
import { Radio, Button, Input } from 'antd';
import { useJamaContext } from 'context/sixtyFortyJamaContext';
import { useHistory } from 'react-router-dom';

const nestedPath = [
  'Home',
  '60:40 Jama',
];

const TyreAudit = () => {
  const {
    fRTyreBrand,
    setfRTyreBrand,
    fRWornOut,
    setfRWornOut,
    fRPressure,
    setfRPressure,
    fRTyreNumber,
    setfRTyreNumber,
    rRTyreBrand,
    setrRTyreBrand,
    rRWornOut,
    setrRWornOut,
    rRPressure,
    setrRPressure,
    rRTyreNumber,
    setrRTyreNumber,
    fLTyreBrand,
    setfLTyreBrand,
    fLWornOut,
    setfLWornOut,
    fLPressure,
    setfLPressure,
    fLTyreNumber,
    setfLTyreNumber,
    rLTyreBrand,
    setrLTyreBrand,
    rLWornOut,
    setrLWornOut,
    rLPressure,
    setrLPressure,
    rLTyreNumber,
    setrLTyreNumber,
    stephanyPresent,
    setStephanyPresent,
    sTyreBrand,
    setsTyreBrand,
    sTyreNumber,
    setsTyreNumber,
  } = useJamaContext();

  const history = useHistory();
  const goToCarInfoAudit = () => {
    history.push('/sixtyfortyjama/CarInfoAudit');
  };
  return (
    <>
      <Helmet title="Dashboard" />
      <div className="flex flex-col space-y-12 mx-3">
        <div className="space-y-2 ml-3">
          <span className="font-quicksand-semi-bold text-xl">
            60:40 Jama
          </span>
          <Breadcrumb nestedPath={nestedPath} />
        </div>
      </div>
      <div className="bg-white rounded-lg my-3 mx-2">
        <div className="flex flex-row flex-nonwrap justify-center">
          <img className="w-20 h-20 my-3 mx-6 rounded-full" alt="" src={require('../../components/layouts/carimage.jpg')} />
          <div>
            <h1 className="font-quicksand-bold text-xl mt-3">MH04 BJ 1904</h1>
            <div className="flex flex-row">
              <h1 className="font-quicksand-semi-bold text-sm mt-1">Visit ID: </h1>
              <h1 className="font-quicksand-semi-bold text-sm mt-1 text-teal-300">sgsdfg654654</h1>
            </div>
            <div className="flex flex-row">
              <h1 className="font-quicksand-semi-bold text-sm mt-1">Time Stamp: </h1>
              <h1 className="font-quicksand-semi-bold text-sm mt-1 text-teal-300">2022/02/21 13:54</h1>
            </div>
          </div>
        </div>
        <div className="flex flex-row ml-12 mt-2">
          <h1 className="font-quicksand-semi-bold text-sm mt-1">Driver: </h1>
          <h1 className="font-quicksand-semi-bold text-sm mt-1 text-teal-300 ml-12">John Doe</h1>
        </div>
      </div>
      <div className="bg-white p-5">
        <p className="font-quicksand-bold text-5xl mt-4" style={{ fontSize: '12px' }}>Front Right Tyre Audit</p>
        <p className="font-quicksand-semi-bold" style={{ fontSize: '12px' }}>Brand*</p>
        <div className="bg-white">
          <Radio.Group
            onChange={(e) => setfRTyreBrand({ fRTyreBrandValue: e.target.value })}
            value={fRTyreBrand.fRTyreBrandValue}
          >
            <Radio style={{ color: '#9193A2' }} className="font-quicksand-semi-bold mr-48 mt-2" value={1}>Apollo</Radio>
            <Radio style={{ color: '#9193A2' }} className="font-quicksand-semi-bold mr-48 mt-2" value={2}>Ceat</Radio>
            <Radio style={{ color: '#9193A2' }} className="font-quicksand-semi-bold mr-48 mt-2" value={3}>JK</Radio>
            <Radio style={{ color: '#9193A2' }} className="font-quicksand-semi-bold mr-48 mt-2" value={4}>BridgeStone</Radio>
            <Radio style={{ color: '#9193A2' }} className="font-quicksand-semi-bold mr-48 mt-2" value={5}>MRF</Radio>
            <Radio style={{ color: '#9193A2' }} className="font-quicksand-semi-bold mr-48 mt-2" value={6}>Firestone</Radio>
            <Radio style={{ color: '#9193A2' }} className="font-quicksand-semi-bold mr-48 mt-2" value={7}>Kelly</Radio>
            <Radio style={{ color: '#9193A2' }} className="font-quicksand-semi-bold mr-48 mt-2" value={8}>Other</Radio>
          </Radio.Group>
        </div>
        <p className="font-quicksand-semi-bold mt-4" style={{ fontSize: '12px' }}>Worn Out*</p>
        <div className="bg-white">
          <Radio.Group
            onChange={(e) => setfRWornOut({ fRWornOutValue: e.target.value })}
            value={fRWornOut.fRWornOutValue}
          >
            <Radio style={{ color: '#9193A2' }} className="font-quicksand-semi-bold mr-48 mt-2" value={3}>{'<3'}</Radio>
            <Radio style={{ color: '#9193A2' }} className="font-quicksand-semi-bold mr-48 mt-2" value={4}>4</Radio>
            <Radio style={{ color: '#9193A2' }} className="font-quicksand-semi-bold mr-48 mt-2" value={5}>5</Radio>
            <Radio style={{ color: '#9193A2' }} className="font-quicksand-semi-bold mr-48 mt-2" value={6}>6</Radio>
            <Radio style={{ color: '#9193A2' }} className="font-quicksand-semi-bold mr-48 mt-2" value={7}>7</Radio>
          </Radio.Group>
        </div>
        <p className="font-quicksand-semi-bold mt-4" style={{ fontSize: '12px' }}>Tyre Pressure</p>
        <div className="flex flex-row flex-nonwrap bg-white">
          <Input
            placeholder="Enter Name Here..."
            value={fRPressure.fRPressureValue}
            onChange={(e) => setfRPressure({ fRPressureValue: e.target.value })}
            style={{
              padding: '8px', marginBottom: '8px', backgroundColor: '#F5F8FC', borderColor: '#F5F8FC', width: '150%',
            }}
          />
        </div>
        <p className="font-quicksand-semi-bold mt-4" style={{ fontSize: '12px' }}>Tyre Number</p>
        <div className="flex flex-row flex-nonwrap bg-white">
          <Input
            placeholder="Enter Name Here..."
            value={fRTyreNumber.fRTyreNumberValue}
            onChange={(e) => setfRTyreNumber({ fRTyreNumberValue: e.target.value })}
            style={{
              padding: '8px', marginBottom: '8px', backgroundColor: '#F5F8FC', borderColor: '#F5F8FC', width: '150%',
            }}
          />
        </div>

      </div>
      <div className="bg-white p-5">
        <p className="font-quicksand-bold text-5xl mt-4" style={{ fontSize: '12px' }}>Rear Right Tyre Audit</p>
        <p className="font-quicksand-semi-bold" style={{ fontSize: '12px' }}>Brand*</p>
        <div className="bg-white">
          <Radio.Group
            onChange={(e) => setrRTyreBrand({ rRTyreBrandValue: e.target.value })}
            value={rRTyreBrand.rRTyreBrandValue}
          >
            <Radio style={{ color: '#9193A2' }} className="font-quicksand-semi-bold mr-48 mt-2" value={1}>Apollo</Radio>
            <Radio style={{ color: '#9193A2' }} className="font-quicksand-semi-bold mr-48 mt-2" value={2}>Ceat</Radio>
            <Radio style={{ color: '#9193A2' }} className="font-quicksand-semi-bold mr-48 mt-2" value={3}>JK</Radio>
            <Radio style={{ color: '#9193A2' }} className="font-quicksand-semi-bold mr-48 mt-2" value={4}>BridgeStone</Radio>
            <Radio style={{ color: '#9193A2' }} className="font-quicksand-semi-bold mr-48 mt-2" value={5}>MRF</Radio>
            <Radio style={{ color: '#9193A2' }} className="font-quicksand-semi-bold mr-48 mt-2" value={6}>Firestone</Radio>
            <Radio style={{ color: '#9193A2' }} className="font-quicksand-semi-bold mr-48 mt-2" value={7}>Kelly</Radio>
            <Radio style={{ color: '#9193A2' }} className="font-quicksand-semi-bold mr-48 mt-2" value={8}>Other</Radio>
          </Radio.Group>
        </div>
        <p className="font-quicksand-semi-bold mt-4" style={{ fontSize: '12px' }}>Worn Out*</p>
        <div className="bg-white">
          <Radio.Group
            onChange={(e) => setrRWornOut({ rRWornOutValue: e.target.value })}
            value={rRWornOut.rRWornOutValue}
          >
            <Radio style={{ color: '#9193A2' }} className="font-quicksand-semi-bold mr-48 mt-2" value={3}>{'<3'}</Radio>
            <Radio style={{ color: '#9193A2' }} className="font-quicksand-semi-bold mr-48 mt-2" value={4}>4</Radio>
            <Radio style={{ color: '#9193A2' }} className="font-quicksand-semi-bold mr-48 mt-2" value={5}>5</Radio>
            <Radio style={{ color: '#9193A2' }} className="font-quicksand-semi-bold mr-48 mt-2" value={6}>6</Radio>
            <Radio style={{ color: '#9193A2' }} className="font-quicksand-semi-bold mr-48 mt-2" value={7}>7</Radio>
          </Radio.Group>
        </div>
        <p className="font-quicksand-semi-bold mt-4" style={{ fontSize: '12px' }}>Tyre Pressure</p>
        <div className="flex flex-row flex-nonwrap bg-white">
          <Input
            placeholder="Enter Name Here..."
            value={rRPressure.rRPressureValue}
            onChange={(e) => setrRPressure({ rRPressureValue: e.target.value })}
            style={{
              padding: '8px', marginBottom: '8px', backgroundColor: '#F5F8FC', borderColor: '#F5F8FC', width: '150%',
            }}
          />
        </div>
        <p className="font-quicksand-semi-bold mt-4" style={{ fontSize: '12px' }}>Tyre Number</p>
        <div className="flex flex-row flex-nonwrap bg-white">
          <Input
            placeholder="Enter Name Here..."
            value={rRTyreNumber.rRTyreNumberValue}
            onChange={(e) => setrRTyreNumber({ rRTyreNumberValue: e.target.value })}
            style={{
              padding: '8px', marginBottom: '8px', backgroundColor: '#F5F8FC', borderColor: '#F5F8FC', width: '150%',
            }}
          />
        </div>

      </div>
      <div className="bg-white p-5">
        <p className="font-quicksand-bold text-5xl mt-4" style={{ fontSize: '12px' }}>Rear Left Tyre Audit</p>
        <p className="font-quicksand-semi-bold" style={{ fontSize: '12px' }}>Brand*</p>
        <div className="bg-white">
          <Radio.Group
            onChange={(e) => setrLTyreBrand({ rLTyreBrandValue: e.target.value })}
            value={rLTyreBrand.rLTyreBrandValue}
          >
            <Radio style={{ color: '#9193A2' }} className="font-quicksand-semi-bold mr-48 mt-2" value={1}>Apollo</Radio>
            <Radio style={{ color: '#9193A2' }} className="font-quicksand-semi-bold mr-48 mt-2" value={2}>Ceat</Radio>
            <Radio style={{ color: '#9193A2' }} className="font-quicksand-semi-bold mr-48 mt-2" value={3}>JK</Radio>
            <Radio style={{ color: '#9193A2' }} className="font-quicksand-semi-bold mr-48 mt-2" value={4}>BridgeStone</Radio>
            <Radio style={{ color: '#9193A2' }} className="font-quicksand-semi-bold mr-48 mt-2" value={5}>MRF</Radio>
            <Radio style={{ color: '#9193A2' }} className="font-quicksand-semi-bold mr-48 mt-2" value={6}>Firestone</Radio>
            <Radio style={{ color: '#9193A2' }} className="font-quicksand-semi-bold mr-48 mt-2" value={7}>Kelly</Radio>
            <Radio style={{ color: '#9193A2' }} className="font-quicksand-semi-bold mr-48 mt-2" value={8}>Other</Radio>
          </Radio.Group>
        </div>
        <p className="font-quicksand-semi-bold mt-4" style={{ fontSize: '12px' }}>Worn Out*</p>
        <div className="bg-white">
          <Radio.Group
            onChange={(e) => setrLWornOut({ rLWornOutValue: e.target.value })}
            value={rLWornOut.rLWornOutValue}
          >
            <Radio style={{ color: '#9193A2' }} className="font-quicksand-semi-bold mr-48 mt-2" value={3}>{'<3'}</Radio>
            <Radio style={{ color: '#9193A2' }} className="font-quicksand-semi-bold mr-48 mt-2" value={4}>4</Radio>
            <Radio style={{ color: '#9193A2' }} className="font-quicksand-semi-bold mr-48 mt-2" value={5}>5</Radio>
            <Radio style={{ color: '#9193A2' }} className="font-quicksand-semi-bold mr-48 mt-2" value={6}>6</Radio>
            <Radio style={{ color: '#9193A2' }} className="font-quicksand-semi-bold mr-48 mt-2" value={7}>7</Radio>
          </Radio.Group>
        </div>
        <p className="font-quicksand-semi-bold mt-4" style={{ fontSize: '12px' }}>Tyre Pressure</p>
        <div className="flex flex-row flex-nonwrap bg-white">
          <Input
            placeholder="Enter Name Here..."
            value={rLPressure.rLPressureValue}
            onChange={(e) => setrLPressure({ rLPressureValue: e.target.value })}
            style={{
              padding: '8px', marginBottom: '8px', backgroundColor: '#F5F8FC', borderColor: '#F5F8FC', width: '150%',
            }}
          />
        </div>
        <p className="font-quicksand-semi-bold mt-4" style={{ fontSize: '12px' }}>Tyre Number</p>
        <div className="flex flex-row flex-nonwrap bg-white">
          <Input
            placeholder="Enter Name Here..."
            value={rLTyreNumber.rLTyreNumberValue}
            onChange={(e) => setrLTyreNumber({ rLTyreNumberValue: e.target.value })}
            style={{
              padding: '8px', marginBottom: '8px', backgroundColor: '#F5F8FC', borderColor: '#F5F8FC', width: '150%',
            }}
          />
        </div>

      </div>
      <div className="bg-white p-5">
        <p className="font-quicksand-bold text-5xl mt-4" style={{ fontSize: '12px' }}>Front Left Tyre Audit</p>
        <p className="font-quicksand-semi-bold" style={{ fontSize: '12px' }}>Brand*</p>
        <div className="bg-white">
          <Radio.Group
            onChange={(e) => setfLTyreBrand({ fLTyreBrandValue: e.target.value })}
            value={fLTyreBrand.fLTyreBrandValue}
          >
            <Radio style={{ color: '#9193A2' }} className="font-quicksand-semi-bold mr-48 mt-2" value={1}>Apollo</Radio>
            <Radio style={{ color: '#9193A2' }} className="font-quicksand-semi-bold mr-48 mt-2" value={2}>Ceat</Radio>
            <Radio style={{ color: '#9193A2' }} className="font-quicksand-semi-bold mr-48 mt-2" value={3}>JK</Radio>
            <Radio style={{ color: '#9193A2' }} className="font-quicksand-semi-bold mr-48 mt-2" value={4}>BridgeStone</Radio>
            <Radio style={{ color: '#9193A2' }} className="font-quicksand-semi-bold mr-48 mt-2" value={5}>MRF</Radio>
            <Radio style={{ color: '#9193A2' }} className="font-quicksand-semi-bold mr-48 mt-2" value={6}>Firestone</Radio>
            <Radio style={{ color: '#9193A2' }} className="font-quicksand-semi-bold mr-48 mt-2" value={7}>Kelly</Radio>
            <Radio style={{ color: '#9193A2' }} className="font-quicksand-semi-bold mr-48 mt-2" value={8}>Other</Radio>
          </Radio.Group>
        </div>
        <p className="font-quicksand-semi-bold mt-4" style={{ fontSize: '12px' }}>Worn Out*</p>
        <div className="bg-white">
          <Radio.Group
            onChange={(e) => setfLWornOut({ fLWornOutValue: e.target.value })}
            value={fLWornOut.fLWornOutValue}
          >
            <Radio style={{ color: '#9193A2' }} className="font-quicksand-semi-bold mr-48 mt-2" value={3}>{'<3'}</Radio>
            <Radio style={{ color: '#9193A2' }} className="font-quicksand-semi-bold mr-48 mt-2" value={4}>4</Radio>
            <Radio style={{ color: '#9193A2' }} className="font-quicksand-semi-bold mr-48 mt-2" value={5}>5</Radio>
            <Radio style={{ color: '#9193A2' }} className="font-quicksand-semi-bold mr-48 mt-2" value={6}>6</Radio>
            <Radio style={{ color: '#9193A2' }} className="font-quicksand-semi-bold mr-48 mt-2" value={7}>7</Radio>
          </Radio.Group>
        </div>
        <p className="font-quicksand-semi-bold mt-4" style={{ fontSize: '12px' }}>Tyre Pressure</p>
        <div className="flex flex-row flex-nonwrap bg-white">
          <Input
            placeholder="Enter Name Here..."
            value={fLPressure.fLPressureValue}
            onChange={(e) => setfLPressure({ fLPressureValue: e.target.value })}
            style={{
              padding: '8px', marginBottom: '8px', backgroundColor: '#F5F8FC', borderColor: '#F5F8FC', width: '150%',
            }}
          />
        </div>
        <p className="font-quicksand-semi-bold mt-4" style={{ fontSize: '12px' }}>Tyre Number</p>
        <div className="flex flex-row flex-nonwrap bg-white">
          <Input
            placeholder="Enter Name Here..."
            value={fLTyreNumber.fLTyreNumberValue}
            onChange={(e) => setfLTyreNumber({ fLTyreNumberValue: e.target.value })}
            style={{
              padding: '8px', marginBottom: '8px', backgroundColor: '#F5F8FC', borderColor: '#F5F8FC', width: '150%',
            }}
          />
        </div>

      </div>
      <div className="bg-white p-5">
        <p className="font-quicksand-semi-bold" style={{ fontSize: '12px' }}>Stephany Present?*</p>
        <div className="bg-white">
          <Radio.Group
            onChange={(e) => setStephanyPresent({ stephanyPresentValue: e.target.value })}
            value={stephanyPresent.stephanyPresentValue}
          >
            <Radio style={{ color: '#9193A2' }} className="font-quicksand-semi-bold mr-48 mt-2" value>Yes</Radio>
            <Radio style={{ color: '#9193A2' }} className="font-quicksand-semi-bold mr-48 mt-2" value={false}>No</Radio>
          </Radio.Group>
        </div>
      </div>
      <div className="bg-white p-5">
        <p className="font-quicksand-bold text-5xl mt-4" style={{ fontSize: '12px' }}>Stephany Tyre</p>
        <p className="font-quicksand-semi-bold" style={{ fontSize: '12px' }}>Brand*</p>
        <div className="bg-white">
          <Radio.Group
            onChange={(e) => setsTyreBrand({ sTyreBrandValue: e.target.value })}
            value={sTyreBrand.sTyreBrandValue}
          >
            <Radio style={{ color: '#9193A2' }} className="font-quicksand-semi-bold mr-48 mt-2" value={1}>Apollo</Radio>
            <Radio style={{ color: '#9193A2' }} className="font-quicksand-semi-bold mr-48 mt-2" value={2}>Ceat</Radio>
            <Radio style={{ color: '#9193A2' }} className="font-quicksand-semi-bold mr-48 mt-2" value={3}>JK</Radio>
            <Radio style={{ color: '#9193A2' }} className="font-quicksand-semi-bold mr-48 mt-2" value={4}>BridgeStone</Radio>
            <Radio style={{ color: '#9193A2' }} className="font-quicksand-semi-bold mr-48 mt-2" value={5}>MRF</Radio>
            <Radio style={{ color: '#9193A2' }} className="font-quicksand-semi-bold mr-48 mt-2" value={6}>Firestone</Radio>
            <Radio style={{ color: '#9193A2' }} className="font-quicksand-semi-bold mr-48 mt-2" value={7}>Kelly</Radio>
            <Radio style={{ color: '#9193A2' }} className="font-quicksand-semi-bold mr-48 mt-2" value={8}>Other</Radio>
          </Radio.Group>
        </div>
        <p className="font-quicksand-semi-bold mt-4" style={{ fontSize: '12px' }}>Tyre Number</p>
        <div className="flex flex-row flex-nonwrap bg-white">
          <Input
            placeholder="Enter Name Here..."
            value={sTyreNumber.sTyreNumberValue}
            onChange={(e) => setsTyreNumber({ sTyreNumberValue: e.target.value })}
            style={{
              padding: '8px', marginBottom: '8px', backgroundColor: '#F5F8FC', borderColor: '#F5F8FC', width: '150%',
            }}
          />
        </div>

      </div>
      <div className="col-12 flex flex-row justify-end">
        <Button
          onClick={goToCarInfoAudit}
          className="font-quicksand-medium"
          style={{
            marginRight: '20px', borderRadius: '4px', fontWeight: '500', backgroundColor: '#013453', color: '#FFFFFF', fontSize: '16px', width: '100px', height: '52px', boxShadow: '0px 8px 16px #005B923D', textDecoration: 'none', padding: '13px 30px',
          }}
        >
          Next
        </Button>
      </div>
    </>
  );
};
export default TyreAudit;
