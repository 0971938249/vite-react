import React, { Fragment } from 'react';
// import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router';
import { routerLinks, lang } from '@utils';
import { Button } from '@core/button';


const Page = () => {
  // const { t } = useTranslation();
  const navigate = useNavigate();

  return (
    <Fragment>
      <div className="onboarding flex justify-center">
        <Button
          text={"Join Sports Heist"}
          className={'justify-center out-line max-sm:w-3/5'}
          onClick={() => {
            navigate(`/${lang}${routerLinks('Signup')}`);
          }}
        />
      </div>
    </Fragment>
  );
};

export default Page;
