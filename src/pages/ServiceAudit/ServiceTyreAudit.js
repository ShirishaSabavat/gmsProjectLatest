import Breadcrumb from 'components/layouts/breadcrumb';
import { Helmet } from "react-helmet";
import { Radio, Button, Input } from 'antd';
import { useState } from 'react';
import { useHistory } from 'react-router-dom';

const nestedPath = [
  'Home',
  'Servicing Audit',
];

const ServiceTyreAudit = () => {
  const [radioValue, setRadioValue] = useState("");
  const history = useHistory();
  const goToCarInfoAudit = () => {
    history.push('/ServiceAudit/ServiceCarInfo');
  }
  return (
    <>
      <Helmet title="Dashboard" />
      <div className="flex flex-col space-y-12 mx-3">
        <div className="space-y-2 ml-3">
          <span className="font-quicksand-semi-bold text-xl">
            Servicing Audit
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
          <Radio.Group onChange={(e) => setRadioValue(e.target.value)} value={radioValue}>
            <Radio style={{ color: '#9193A2' }} className="font-quicksand-semi-bold mr-48 mt-2" value="Apollo">Apollo</Radio>
            <Radio style={{ color: '#9193A2' }} className="font-quicksand-semi-bold mr-48 mt-2" value="Ceat">Ceat</Radio>
            <Radio style={{ color: '#9193A2' }} className="font-quicksand-semi-bold mr-48 mt-2" value="JK">JK</Radio>
            <Radio style={{ color: '#9193A2' }} className="font-quicksand-semi-bold mr-48 mt-2" value="BridgeStone">BridgeStone</Radio>
            <Radio style={{ color: '#9193A2' }} className="font-quicksand-semi-bold mr-48 mt-2" value="MRF">MRF</Radio>
            <Radio style={{ color: '#9193A2' }} className="font-quicksand-semi-bold mr-48 mt-2" value="Firestone">Firestone</Radio>
            <Radio style={{ color: '#9193A2' }} className="font-quicksand-semi-bold mr-48 mt-2" value="Kelly">Kelly</Radio>
            <Radio style={{ color: '#9193A2' }} className="font-quicksand-semi-bold mr-48 mt-2" value="Other">Other</Radio>
          </Radio.Group>
        </div>
        <p className="font-quicksand-semi-bold mt-4" style={{ fontSize: '12px' }}>Worn Out*</p>
        <div className="bg-white">
          <Radio.Group onChange={(e) => setRadioValue(e.target.value)} value={radioValue}>
            <Radio style={{ color: '#9193A2' }} className="font-quicksand-semi-bold mr-48 mt-2" value="<3">{"<3"}</Radio>
            <Radio style={{ color: '#9193A2' }} className="font-quicksand-semi-bold mr-48 mt-2" value="4">4</Radio>
            <Radio style={{ color: '#9193A2' }} className="font-quicksand-semi-bold mr-48 mt-2" value="5">5</Radio>
            <Radio style={{ color: '#9193A2' }} className="font-quicksand-semi-bold mr-48 mt-2" value="6">6</Radio>
            <Radio style={{ color: '#9193A2' }} className="font-quicksand-semi-bold mr-48 mt-2" value="7">7</Radio>
          </Radio.Group>
        </div>
        <p className="font-quicksand-semi-bold mt-4" style={{ fontSize: '12px' }}>Tyre Pressure</p>
        <div className="flex flex-row flex-nonwrap bg-white">
          <Input
            placeholder="Enter Name Here..."
            style={{
              padding: '8px', marginBottom: '8px', backgroundColor: '#F5F8FC', borderColor: '#F5F8FC', width: '150%',
            }}
          />
        </div>
        <p className="font-quicksand-semi-bold mt-4" style={{ fontSize: '12px' }}>Tyre Number</p>
        <div className="flex flex-row flex-nonwrap bg-white">
          <Input
            placeholder="Enter Name Here..."
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
          <Radio.Group onChange={(e) => setRadioValue(e.target.value)} value={radioValue}>
            <Radio style={{ color: '#9193A2' }} className="font-quicksand-semi-bold mr-48 mt-2" value="Apollo">Apollo</Radio>
            <Radio style={{ color: '#9193A2' }} className="font-quicksand-semi-bold mr-48 mt-2" value="Ceat">Ceat</Radio>
            <Radio style={{ color: '#9193A2' }} className="font-quicksand-semi-bold mr-48 mt-2" value="JK">JK</Radio>
            <Radio style={{ color: '#9193A2' }} className="font-quicksand-semi-bold mr-48 mt-2" value="BridgeStone">BridgeStone</Radio>
            <Radio style={{ color: '#9193A2' }} className="font-quicksand-semi-bold mr-48 mt-2" value="MRF">MRF</Radio>
            <Radio style={{ color: '#9193A2' }} className="font-quicksand-semi-bold mr-48 mt-2" value="Firestone">Firestone</Radio>
            <Radio style={{ color: '#9193A2' }} className="font-quicksand-semi-bold mr-48 mt-2" value="Kelly">Kelly</Radio>
            <Radio style={{ color: '#9193A2' }} className="font-quicksand-semi-bold mr-48 mt-2" value="Other">Other</Radio>
          </Radio.Group>
        </div>
        <p className="font-quicksand-semi-bold mt-4" style={{ fontSize: '12px' }}>Worn Out*</p>
        <div className="bg-white">
          <Radio.Group onChange={(e) => setRadioValue(e.target.value)} value={radioValue}>
            <Radio style={{ color: '#9193A2' }} className="font-quicksand-semi-bold mr-48 mt-2" value="<3">{"<3"}</Radio>
            <Radio style={{ color: '#9193A2' }} className="font-quicksand-semi-bold mr-48 mt-2" value="4">4</Radio>
            <Radio style={{ color: '#9193A2' }} className="font-quicksand-semi-bold mr-48 mt-2" value="5">5</Radio>
            <Radio style={{ color: '#9193A2' }} className="font-quicksand-semi-bold mr-48 mt-2" value="6">6</Radio>
            <Radio style={{ color: '#9193A2' }} className="font-quicksand-semi-bold mr-48 mt-2" value="7">7</Radio>
          </Radio.Group>
        </div>
        <p className="font-quicksand-semi-bold mt-4" style={{ fontSize: '12px' }}>Tyre Pressure</p>
        <div className="flex flex-row flex-nonwrap bg-white">
          <Input
            placeholder="Enter Name Here..."
            style={{
              padding: '8px', marginBottom: '8px', backgroundColor: '#F5F8FC', borderColor: '#F5F8FC', width: '150%',
            }}
          />
        </div>
        <p className="font-quicksand-semi-bold mt-4" style={{ fontSize: '12px' }}>Tyre Number</p>
        <div className="flex flex-row flex-nonwrap bg-white">
          <Input
            placeholder="Enter Name Here..."
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
          <Radio.Group onChange={(e) => setRadioValue(e.target.value)} value={radioValue}>
            <Radio style={{ color: '#9193A2' }} className="font-quicksand-semi-bold mr-48 mt-2" value="Apollo">Apollo</Radio>
            <Radio style={{ color: '#9193A2' }} className="font-quicksand-semi-bold mr-48 mt-2" value="Ceat">Ceat</Radio>
            <Radio style={{ color: '#9193A2' }} className="font-quicksand-semi-bold mr-48 mt-2" value="JK">JK</Radio>
            <Radio style={{ color: '#9193A2' }} className="font-quicksand-semi-bold mr-48 mt-2" value="BridgeStone">BridgeStone</Radio>
            <Radio style={{ color: '#9193A2' }} className="font-quicksand-semi-bold mr-48 mt-2" value="MRF">MRF</Radio>
            <Radio style={{ color: '#9193A2' }} className="font-quicksand-semi-bold mr-48 mt-2" value="Firestone">Firestone</Radio>
            <Radio style={{ color: '#9193A2' }} className="font-quicksand-semi-bold mr-48 mt-2" value="Kelly">Kelly</Radio>
            <Radio style={{ color: '#9193A2' }} className="font-quicksand-semi-bold mr-48 mt-2" value="Other">Other</Radio>
          </Radio.Group>
        </div>
        <p className="font-quicksand-semi-bold mt-4" style={{ fontSize: '12px' }}>Worn Out*</p>
        <div className="bg-white">
          <Radio.Group onChange={(e) => setRadioValue(e.target.value)} value={radioValue}>
            <Radio style={{ color: '#9193A2' }} className="font-quicksand-semi-bold mr-48 mt-2" value="<3">{"<3"}</Radio>
            <Radio style={{ color: '#9193A2' }} className="font-quicksand-semi-bold mr-48 mt-2" value="4">4</Radio>
            <Radio style={{ color: '#9193A2' }} className="font-quicksand-semi-bold mr-48 mt-2" value="5">5</Radio>
            <Radio style={{ color: '#9193A2' }} className="font-quicksand-semi-bold mr-48 mt-2" value="6">6</Radio>
            <Radio style={{ color: '#9193A2' }} className="font-quicksand-semi-bold mr-48 mt-2" value="7">7</Radio>
          </Radio.Group>
        </div>
        <p className="font-quicksand-semi-bold mt-4" style={{ fontSize: '12px' }}>Tyre Pressure</p>
        <div className="flex flex-row flex-nonwrap bg-white">
          <Input
            placeholder="Enter Name Here..."
            style={{
              padding: '8px', marginBottom: '8px', backgroundColor: '#F5F8FC', borderColor: '#F5F8FC', width: '150%',
            }}
          />
        </div>
        <p className="font-quicksand-semi-bold mt-4" style={{ fontSize: '12px' }}>Tyre Number</p>
        <div className="flex flex-row flex-nonwrap bg-white">
          <Input
            placeholder="Enter Name Here..."
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
          <Radio.Group onChange={(e) => setRadioValue(e.target.value)} value={radioValue}>
            <Radio style={{ color: '#9193A2' }} className="font-quicksand-semi-bold mr-48 mt-2" value="Apollo">Apollo</Radio>
            <Radio style={{ color: '#9193A2' }} className="font-quicksand-semi-bold mr-48 mt-2" value="Ceat">Ceat</Radio>
            <Radio style={{ color: '#9193A2' }} className="font-quicksand-semi-bold mr-48 mt-2" value="JK">JK</Radio>
            <Radio style={{ color: '#9193A2' }} className="font-quicksand-semi-bold mr-48 mt-2" value="BridgeStone">BridgeStone</Radio>
            <Radio style={{ color: '#9193A2' }} className="font-quicksand-semi-bold mr-48 mt-2" value="MRF">MRF</Radio>
            <Radio style={{ color: '#9193A2' }} className="font-quicksand-semi-bold mr-48 mt-2" value="Firestone">Firestone</Radio>
            <Radio style={{ color: '#9193A2' }} className="font-quicksand-semi-bold mr-48 mt-2" value="Kelly">Kelly</Radio>
            <Radio style={{ color: '#9193A2' }} className="font-quicksand-semi-bold mr-48 mt-2" value="Other">Other</Radio>
          </Radio.Group>
        </div>
        <p className="font-quicksand-semi-bold mt-4" style={{ fontSize: '12px' }}>Worn Out*</p>
        <div className="bg-white">
          <Radio.Group onChange={(e) => setRadioValue(e.target.value)} value={radioValue}>
            <Radio style={{ color: '#9193A2' }} className="font-quicksand-semi-bold mr-48 mt-2" value="<3">{"<3"}</Radio>
            <Radio style={{ color: '#9193A2' }} className="font-quicksand-semi-bold mr-48 mt-2" value="4">4</Radio>
            <Radio style={{ color: '#9193A2' }} className="font-quicksand-semi-bold mr-48 mt-2" value="5">5</Radio>
            <Radio style={{ color: '#9193A2' }} className="font-quicksand-semi-bold mr-48 mt-2" value="6">6</Radio>
            <Radio style={{ color: '#9193A2' }} className="font-quicksand-semi-bold mr-48 mt-2" value="7">7</Radio>
          </Radio.Group>
        </div>
        <p className="font-quicksand-semi-bold mt-4" style={{ fontSize: '12px' }}>Tyre Pressure</p>
        <div className="flex flex-row flex-nonwrap bg-white">
          <Input
            placeholder="Enter Name Here..."
            style={{
              padding: '8px', marginBottom: '8px', backgroundColor: '#F5F8FC', borderColor: '#F5F8FC', width: '150%',
            }}
          />
        </div>
        <p className="font-quicksand-semi-bold mt-4" style={{ fontSize: '12px' }}>Tyre Number</p>
        <div className="flex flex-row flex-nonwrap bg-white">
          <Input
            placeholder="Enter Name Here..."
            style={{
              padding: '8px', marginBottom: '8px', backgroundColor: '#F5F8FC', borderColor: '#F5F8FC', width: '150%',
            }}
          />
        </div>

      </div>
      <div className="bg-white p-5">
        <p className="font-quicksand-semi-bold" style={{ fontSize: '12px' }}>Stephany Present?*</p>
        <div className="bg-white">
          <Radio.Group onChange={(e) => setRadioValue(e.target.value)} value={radioValue}>
            <Radio style={{ color: '#9193A2' }} className="font-quicksand-semi-bold mr-48 mt-2" value="Powerzone">Yes</Radio>
            <Radio style={{ color: '#9193A2' }} className="font-quicksand-semi-bold mr-48 mt-2" value="Panasonic">No</Radio>
          </Radio.Group>
        </div>
      </div>
      <div className="bg-white p-5">
        <p className="font-quicksand-bold text-5xl mt-4" style={{ fontSize: '12px' }}>Stephany Tyre</p>
        <p className="font-quicksand-semi-bold" style={{ fontSize: '12px' }}>Brand*</p>
        <div className="bg-white">
          <Radio.Group onChange={(e) => setRadioValue(e.target.value)} value={radioValue}>
            <Radio style={{ color: '#9193A2' }} className="font-quicksand-semi-bold mr-48 mt-2" value="Apollo">Apollo</Radio>
            <Radio style={{ color: '#9193A2' }} className="font-quicksand-semi-bold mr-48 mt-2" value="Ceat">Ceat</Radio>
            <Radio style={{ color: '#9193A2' }} className="font-quicksand-semi-bold mr-48 mt-2" value="JK">JK</Radio>
            <Radio style={{ color: '#9193A2' }} className="font-quicksand-semi-bold mr-48 mt-2" value="BridgeStone">BridgeStone</Radio>
            <Radio style={{ color: '#9193A2' }} className="font-quicksand-semi-bold mr-48 mt-2" value="MRF">MRF</Radio>
            <Radio style={{ color: '#9193A2' }} className="font-quicksand-semi-bold mr-48 mt-2" value="Firestone">Firestone</Radio>
            <Radio style={{ color: '#9193A2' }} className="font-quicksand-semi-bold mr-48 mt-2" value="Kelly">Kelly</Radio>
            <Radio style={{ color: '#9193A2' }} className="font-quicksand-semi-bold mr-48 mt-2" value="Other">Other</Radio>
          </Radio.Group>
        </div>
        <p className="font-quicksand-semi-bold mt-4" style={{ fontSize: '12px' }}>Tyre Number</p>
        <div className="flex flex-row flex-nonwrap bg-white">
          <Input
            placeholder="Enter Name Here..."
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
  )
}
export default ServiceTyreAudit;