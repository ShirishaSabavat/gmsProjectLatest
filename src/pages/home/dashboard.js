import { Helmet } from 'react-helmet';
import Dashboard from 'components/app/home/dashboard';
import { useEffect, useState } from 'react';
import { getAuditCount } from 'services/axios';

const DashboardPage = () => {
  const [auditCount, setAuditCount] = useState(0);
  useEffect(() => {
    getAuditCount()
      .then((res) => {
        setAuditCount(res.data.results[0]);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  return (
    <>
      <Helmet title="Dashboard" />
      <div className="container flex flex-col mb-4">
        <div className="row mt-5 mb-0 pl-2 pr-10">
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
                {auditCount?.Total}
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
