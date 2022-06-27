/* eslint-disable max-len */
import { useEffect, useState } from 'react';
import { Layout, Menu } from 'antd';
import CarInfo from './carInfo';

const SideBar = (props) => {
  const {
    carList, carCount, headers,
  } = props;
  const {
    Header, Content, Sider,
  } = Layout;

  const [visitingCarInfo, setVisitingCarInfo] = useState([]);
  const [carNumber, setCarNumber] = useState('');
  const [showCard, setShowCard] = useState(false);

  const handleClick = (carInfo) => {
    setCarNumber(carInfo.car_number);
    setVisitingCarInfo(carInfo);
    setShowCard(true);
  };

  useEffect(() => {
    // console.log(carList.length);
    // console.log(visitingCarInfo);
  }, [visitingCarInfo, carList]);

  return (
    <div className="font-quicksand-bold text-lg">
      <Layout>
        <Sider
          breakpoint="lg"
          collapsedWidth="0"
        >
          <div className="logo" />
          <Menu style={{ color: '#86A1A4', fontWeight: 'regular' }} theme="light">
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
                onClick={() => handleClick(item)}
              >
                {' '}
                {/* <div className="flex place-content-center flex-row text-base"> */}
                {/* <img alt="car" height="40px" width="50px" src="/assets/images/general/bgRemovedCarImg.png" /> */}
                {item?.car_number}
                {/* </div> */}
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
