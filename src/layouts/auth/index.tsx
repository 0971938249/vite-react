import React, { PropsWithChildren, useEffect } from 'react';

import { GlobalFacade } from '@store';

import './index.less';

const Layout = ({ children }: PropsWithChildren) => {
  const globalFacade = GlobalFacade();

  useEffect(() => {
    globalFacade.logout();
  }, []);

  return (
    <div className="bg-white relative">
      <div className="block lg:flex h-full bg-[url('/assets/images/bg-login.jpg')] bg-[top_right_25rem] bg-cover bg-no-repeat">
        <div className="w-1/2 min-h-full h-screen hidden lg:block "></div>
        <div className="backdrop-blur-sm bg-white/30 absolute left-0 top-0 w-screen h-screen z-0"></div>
        <div className="w-full lg:w-1/2 h-screen flex items-center justify-between lg:items-center z-10 relative">
          <div className="lg:max-w-xl mx-auto p-10">{children}</div>
        </div>
      </div>
      {/* <div className="bg-[url('../../assets/images/login-f.png')] overflow-hidden w-full h-28 bg-cover bg-no-repeat absolute bottom-0 z-10">
        <div className='absolute top-1/2 right-1/2 translate-x-1/2 z-20 font-medium text-white text-center'>Powered By ARI Technology Co ., JSC</div>
      </div> */}
    </div>
  );
};
export default Layout;
