import React from 'react';
import { Button } from 'antd';

const ButtonComp = ({ label, stylesCss }) => {
  const styles = {
    background: '#013453', color: 'white', height: '52px', fontSize: '16px', borderRadius: '4px 4px 4px 4px', boxShadow: '0 8px 16px #005B923D', padding: '14px 30px', marginRight: '10%', float: `${stylesCss}`,
  };
  return (
    <Button
      className="font-quicksand-medium"
      style={styles}
    >
      {label}
    </Button>
  );
};

export default ButtonComp;
