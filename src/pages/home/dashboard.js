import { Helmet } from 'react-helmet';
import Dashboard from 'components/app/home/dashboard';
import { useEffect, useState } from 'react';
import { getAuditCount, cityList } from 'services/axios';
import { useAuditContext } from 'context/AuditContext';
import { Select } from 'antd';

const DashboardPage = () => {
  const [auditCount, setAuditCount] = useState(0);
  const [cities, setCities] = useState([]);

  const {
    setSelectedCar,
    setShowCard,
    currentCity,
    setCurrentCity,
  } = useAuditContext();

  useEffect(() => {
    cityList()
      .then((res) => {
        setCurrentCity(res?.data?.results[0]?.id);
        setCities(res?.data?.results);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  useEffect(() => {
    getAuditCount(currentCity)
      .then((res) => {
        console.log(res?.data?.results);
        setAuditCount(res?.data?.results[0]);
        setSelectedCar({ selectedCarValue: '0' });
        setShowCard({ cardValue: true });
      })
      .catch((err) => {
        console.log(err);
      });
  }, [currentCity]);

  const handleSelect = (e) => {
    setCurrentCity(e);
  };

  return (
    <>
      <Helmet title="Dashboard" />
      <div className="container flex flex-col mb-4">
        <div className="row mt-5 mb-0 pl-2 pr-10">
          <div className="col-12">
            <Select
              placeholder="Select City"
              defaultValue={1}
              style={{ width: '120' }}
              onChange={(e) => {
                handleSelect(e);
              }}
            >
              {cities.map((items) => (
                <Select.Option key={items.id} value={items.id}>
                  {items.name}
                </Select.Option>
              ))}
            </Select>
          </div>
          <div className="col-6">
            <h3 className="font-bold font-quicksand-medium text-[#333333] text-2xl pl-0">
              Audit Queues
            </h3>
          </div>
          <div className="col-6 d-flex flex-row justify-content-end text-end">
            <div>
              <p className="text-[#86A1A4] font-quicksand-medium text-xs m-0">
                Total Cars
              </p>
              <p className="text-[#013453] font-quicksand-semi-bold text-lg m-0">
                {auditCount?.Total || 0}
              </p>
            </div>
          </div>
        </div>
        <Dashboard auditCount={auditCount} />
      </div>
    </>
  );
};

export default DashboardPage;
