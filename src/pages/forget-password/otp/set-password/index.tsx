import React, { Fragment, useEffect } from 'react';
import { useNavigate } from 'react-router';
import { Spin } from '@core/spin';
import { Form } from '@core/form'
import { routerLinks } from '@utils';
import { GlobalFacade } from '@store';
import { t } from 'i18next';
import { language, languages } from '@utils';

const Page = () => {
  const navigate = useNavigate();
  const globalFacade = GlobalFacade();
  const { isLoading, status, data, setPassword } = globalFacade;
    const lang = languages.indexOf(location.pathname.split('/')[1]) > -1 ? location.pathname.split('/')[1] : language;

  useEffect(() => {
    if (status === 'setPassword.fulfilled') {
      navigate(`/${lang}${routerLinks('Sign-in')}`)
    }
  }, [status]);

  console.log(data)
  return (
    <Fragment>
      <div className="text-center mb-8 mx-auto">
        <h1 className="intro-x text-3xl mb-10 font-bold text-green-900 leading-8 md:text-5xl lg:leading-10">
          {t('routes.auth.reset-password.Reset Password')}
        </h1>
        <h5 className="intro-x font-normal text-green-900">
          {t('routes.auth.reset-password.subReset')}
          <br></br> {t('routes.auth.reset-password.subReset1')}</h5>
      </div>
      <div className='mx-auto w-3/4'>
        <Spin spinning={isLoading} >
          <Form
            values={{ ...data }}
            className="intro-x form-login space-y-8"
            columns={[
              {
                name: 'password',
                title: 'columns.auth.login.password',
                formItem: {
                  placeholder: 'columns.auth.placeholder.Password',
                  type: 'password',
                  rules: [{ type: 'required' },],
                },
              },
              {
                name: 'passwordComfirm',
                title: 'columns.auth.login.password',
                formItem: {
                  placeholder: 'columns.auth.placeholder.Confirm Password',
                  type: 'password',
                  rules: [
                    {
                      type: 'custom',
                      validator: ({ getFieldValue }) => ({
                        validator(rule, value: string) {
                          if (!value || getFieldValue('password') === value) {
                            return Promise.resolve();
                          }
                          return Promise.reject(new Error('columns.auth.placeholder.subConfirm'));
                        },
                      }),
                    },
                    { type: 'required' },
                  ],
                },
              },
              {
                title: '',
                name: 'uuid',
                formItem: {
                  type: 'hidden',
                },
              },
              {
                title: '',
                name: 'email',
                formItem: {
                  type: 'hidden',
                },
              },
            ]}
            textSubmit={'columns.auth.login.Change Password'}
            handSubmit={(values) => setPassword({ ...values })}
            disableSubmit={isLoading}
          />
        </Spin>
      </div>
    </Fragment>
  );
};

export default Page;