/* eslint-disable max-len */
import { useEffect, useState } from 'react';
import { Layout, Menu } from 'antd';
import { useAuditContext } from 'context/AuditContext';
import CarInfo from './carInfo';

const SideBar = (props) => {
  const {
    carList, carCount, headers,
  } = props;
  const {
    Header, Content, Sider,
  } = Layout;

  const {
    selectedCar,
    setSelectedCar,
    showCard,
    setShowCard,
  } = useAuditContext();

  const [visitingCarInfo, setVisitingCarInfo] = useState([]);
  const [carNumber, setCarNumber] = useState('');

  const handleClick = (carInfo, index) => {
    setCarNumber(carInfo?.car_number);
    setVisitingCarInfo(carInfo);
    setSelectedCar({ selectedCarValue: index.toString() });
    setShowCard({ cardValue: true });
  };

  useEffect(() => {
    // console.log(carList.length);
    // console.log(carList);
    handleClick(carList[0], 0);
  }, [carList]);

  return (
    <div className="font-quicksand-bold text-lg">
      <Layout>
        <Sider
          breakpoint="lg"
          collapsedWidth="0"
        >
          <div className="logo" />
          <Menu style={{ color: '#86A1A4', fontWeight: 'regular' }} theme="light" selectedKeys={[selectedCar.selectedCarValue]}>
            <div className="px-3 pt-3 pb-2.5">
              <h3 className="font-quicksand-bold text-sm">
                {headers}
                {' '}
                Car List
              </h3>
            </div>
            {carList.map((item, index) => (
              <Menu.Item
                key={index.toString()}
                onClick={() => handleClick(item, index)}
              >
                {item?.car_number}
              </Menu.Item>
            ))}
          </Menu>
        </Sider>
        <Layout>
          <Header className="site-layout-sub-header-background font-bold text-[#333333] text-sm" style={{ paddingLeft: '10px' }}>
            {headers}
            <span className="text-[#37BDC8]">
              {' '}
              (
              {carCount}
              )
            </span>
          </Header>
          <Content className="ml-0">
            <div className="site-layout-background">
              {carList.length === 0 ? (
                <div className="px-2 py-0 my-6 mt-10 max-w-sm">
                  <p className="font-quicksand-semi-bold text-4xl text-red-500 text-center">No cars in list</p>
                </div>
              ) : (
                <CarInfo
                  visitingCarInfo={visitingCarInfo}
                  carNumber={carNumber}
                  showCard={showCard}
                />
              )}
            </div>
          </Content>
        </Layout>
      </Layout>
    </div>
  );
};

export default SideBar;
