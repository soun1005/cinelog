import React from 'react';
import CustomBtn from '../components/CustomBtns';

const Main = () => {
  return (
    <div>
      main page
      <CustomBtn text="basicBtn" className="basicBtn" />
      <CustomBtn text="specialBtn" className="specialBtn" />
    </div>
  );
};

export default Main;
