import React, { Fragment, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router';

import { Spin } from 'antd';
import { Form } from '@core/form';
import { GlobalFacade } from '@store';
import { routerLinks, lang } from '@utils';
import classNames from 'classnames';
import { CopyRight, LogoSportHeist } from '@svgs';

// import Test from "public/assets/images/test.png"

const Page = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const globalFacade = GlobalFacade();
  const { isLoading, status, user, data, login, profile } = globalFacade;

  useEffect(() => {
    if (status === 'login.fulfilled' && user && Object.keys(user).length > 0) {
      navigate('/' + lang + '/dashboard', { replace: true });
      profile();
    }
  }, [status]);

  return (
    // <Fragment>
    //   <div className="text-center mb-8">
    //     <h1
    //       className="intro-x text-3xl mb-8 font-bold text-teal-900 leading-8 md:text-5xl md:leading-10 lg:leading-10"
    //       id={'title-login'}
    //     >
    //       {t('routes.auth.login.title')}
    //     </h1>
    //     <h5 className="intro-x font-normal text-teal-900 ">{t('routes.auth.login.subTitle')}</h5>
    //   </div>
    //   <div className="mx-auto lg:w-3/4 relative">
    //     <Spin spinning={isLoading}>
    //       <Form
    //         values={{ ...data }}
    //         className="intro-x form-login"
    //         columns={[
    //           {
    //             name: 'email',
    //             title: t('columns.auth.login.Username'),
    //             formItem: {
    //               placeholder: 'columns.auth.login.Enter Username',
    //               rules: [{ type: 'required' }, { type: 'email' }],
    //             },
    //           },
    //           {
    //             name: 'password',
    //             title: t('columns.auth.login.password'),
    //             formItem: {
    //               placeholder: 'columns.auth.login.Enter Password',
    //               type: 'password',
    //               notDefaultValid: true,
    //               rules: [{ type: 'required' }],
    //             },
    //           },
    //         ]}
    //         textSubmit={'routes.auth.login.Log In'}
    //         handSubmit={login}
    //         disableSubmit={isLoading}
    //       />
    //     </Spin>
    //     <div className="absolute  top-2/3 right-0 text-right">
    //       <button
    //         className={'text-teal-900 font-normal underline hover:no-underline mt-2'}
    //         onClick={() => navigate(`/${lang}${routerLinks('ForgetPassword')}`)}
    //       >
    //         {t('routes.auth.login.Forgot Password')}
    //       </button>
    //     </div>
    //   </div>
    // </Fragment>
    <>
      <div className="relative h-screen">
        {/* <img src="public/assets/images/test.png" alt="" /> */}
        <div
          className={classNames(
            "bg-[url('public/assets/images/background/bg-signin-1.png'),_url('public/assets/images/background/bg-signin-2.png')]",
            'bg-[position:top_right,_bottom_center] bg-no-repeat opacity-50 w-full h-screen absolute -z-10',
          )}
        ></div>
        <div className="flex flex-col p-11 items-center bg-transparent">
          <a href="#" target="_blank" className="mb-9">
            <LogoSportHeist />
          </a>
          <div className="max-w-md w-full bg-white relative px-4 py-6 border border-config-e5 rounded-md">
            <div className="font-bebas font-normal text-3xl mb-4 px-2">Login</div>
            <Spin spinning={isLoading}>
              <Form
                values={{ ...data }}
                className="intro-x form-login"
                columns={[
                  {
                    name: 'email',
                    title: t('columns.auth.login.Username'),
                    formItem: {
                      type: 'absolute_label',
                      placeholder: 'columns.auth.login.Enter Username',
                      rules: [{ type: 'required' }, { type: 'email' }],
                    },
                  },
                  {
                    name: 'password',
                    title: t('columns.auth.login.password'),
                    formItem: {
                      placeholder: 'columns.auth.login.Enter Password',
                      type: 'absolute_password',
                      notDefaultValid: true,
                      rules: [{ type: 'required' }],
                    },
                  },
                ]}
                textSubmit={'LOG IN'}
                handSubmit={login}
                disableSubmit={isLoading}
              />
            </Spin>
            <div className="absolute top-2/3 right-6 text-right">
              <button
                className={'text-teal-900 font-normal underline hover:no-underline mt-2'}
                onClick={() => navigate(`/${lang}${routerLinks('ForgetPassword')}`)}
              >
                {t('routes.auth.login.Forgot Password')}
              </button>
            </div>
          </div>
        </div>
        <div className="absolute bottom-9 left-1/2 -translate-x-1/2 flex items-center gap-7 font-helvetica">
          <div className="flex items-center gap-2 stroke-config-gr450 bg-transparent">
            <span>
              <CopyRight></CopyRight>
            </span>
            <span className="text-base font-normal text-config-gr450">Sports Heist</span>
          </div>
          <span className="text-base font-normal text-config-gr450">Contact</span>
          <span className="text-base font-normal text-config-gr450">Privacy & Terms</span>
        </div>
      </div>
    </>
  );
};

export default Page;
