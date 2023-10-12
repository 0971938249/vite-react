import React, { PropsWithChildren, useEffect } from 'react';

import { GlobalFacade } from '@store';

import './index.less';

const Layout = ({ children }: PropsWithChildren) => {
  const globalFacade = GlobalFacade();

  useEffect(() => {
    globalFacade.logout();
  }, []);

  return (
    <div className=" w-full h-screen">
      <div className='w-full h-screen'>{children}</div>
    </div>
  );
};
export default Layout;
