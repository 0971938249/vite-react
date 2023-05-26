import React, { Fragment, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router';
import { Spin } from '@core/spin';
import { Form } from '@core/form'
import { routerLinks } from '@utils';
import { GlobalFacade } from '@store';

const Page = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const globalFacade = GlobalFacade();

  const { isLoading, status, data, forgotPassword } = globalFacade;
  useEffect(() => {
    if (status === 'forgotPassword.fulfilled') {
      navigate(routerLinks('VerifyForotPassword'));
    }
  }, [status]);

  return (
    <Fragment>
      <div className="text-center mb-8">
        <h1 className="intro-x text-3xl mb-8 font-bold text-green-900 leading-8 md:text-5xl lg:leading-10" id={'title-login'}>
          {t('routes.auth.reset-password.Forgot Password')}
        </h1>
        <h5 className="intro-x font-normal text-green-900 ">{t('routes.auth.reset-password.subTitle')}</h5>
      </div>
      <div className='mx-auto w-3/4'>
        <Spin spinning={isLoading} >
          <Form
            values={{ ...data }}
            className="intro-x form-login"
            columns={[
              {
                name: 'email',
                title: t('columns.auth.reset-password.Recovery Email'),
                formItem: {
                  placeholder: 'columns.auth.reset-password.Recovery Email',
                  rules: [{ type: 'required' }, { type: 'email' }],
                },
              },
            ]}
            textSubmit={'routes.auth.reset-password.OTP'}
            handSubmit={(values) => forgotPassword({ ...values })}
            disableSubmit={isLoading}
          />
        </Spin>
        <div className="mt-3 text-center">
          <button className={'text-sky-600 font-normal underline hover:no-underline hover:text-sky-500'} onClick={() => navigate(routerLinks('Login'))}>
            {' '}
            {t('routes.auth.reset-password.Go back to login')}
          </button>
        </div>
      </div>
    </Fragment>
  );
};

export default Page;
