import React, { PropsWithChildren, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { GlobalFacade } from '@store';

import './index.less';

const Layout = ({ children }: PropsWithChildren) => {
  const globalFacade = GlobalFacade();
  const { t } = useTranslation();
  useEffect(() => {
    globalFacade.logout();
  }, []);

  return (
    <div className="bg-gray-200 relative layout-auth h-screen lg:h-auto">
      <div className="block h-full bg-[url('/assets/images/top-bg.png')] bg-right-top bg-auto bg-no-repeat lg:flex">
        <div className="min-h-full h-screen hidden lg:block "></div>
        <div className="mx-auto p-1 w-full lg:max-w-xl sm:p-10">{children}</div>
      </div>
      <div className="bg-[url('/assets/images/bottom-bg.png')] h-28 absolute bottom-0 z-10 bg-cover bg-no-repeat overflow-hidden w-full sm:h-64 ">
        <div className='flex absolute top-[55%] z-20 text-black text-center text-gray-600 w-full justify-center sm:top-[80%] sm:right-1/2 sm:translate-x-1/2'>
          <p><a href='#'> ⓒ {t('layout.Sports Heist')}</a></p>
          <p className="mx-4"><a href='#'>{t('layout.Contact')}</a></p>
          <p><a href='#'>{t('layout.Privacy & Terms')}</a></p>
          </div>
      </div>
    </div>
  );
};
export default Layout;
