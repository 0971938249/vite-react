import React, { Fragment, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router';

import { Spin } from 'antd';
import { Form } from '@core/form';
import { GlobalFacade } from '@store';
import { routerLinks, lang } from '@utils';
import classNames from 'classnames';
import { LogoSportHeist } from '@svgs';


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

  const initState: {
    email: string;
    password: string;
  } = {
    email: "",
    password: "",
  };

  const [values, setValues] = useState(initState);
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const name = e.target.name;
    const value = e.target.value;
    // console.log(`${name}:${value}`);
    setValues({ ...values, [name]: value });
  };

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
      <div className="relative w-full h-screen">
        <div
          className={classNames(
            "bg-[url('../../assets/images/background/bg-signin-1.png'),_url('../../assets/images/background/bg-signin-2.png')]",
            "bg-[position:top_right,_bottom_center] bg-no-repeat opacity-50 w-full h-screen absolute -z-10"
          )}
        ></div>
        <div className="w-full flex flex-col items-center bg-transparent">
          <a href="#" target="_blank" className="mt-11 mb-9">
          <LogoSportHeist/>
          </a>
          <form className="border border-[#E5E5E5] rounded p-6 bg-white flex flex-col">
            <div className="font-BebasNeus font-normal text-3xl mb-4">
              Login
            </div>
            <div className="w-[400px] h-[56px] px-4 rounded-sm border border-[#DFDFDF] bg-white mb-4 font-helvetica text-black relative group flex flex-col justify-end">
              <label
                htmlFor="email"
                className={classNames(
                  "absolute top-1/2 -translate-y-1/2 text-base font-normal opacity-30 font-helvetica cursor-pointer",
                  "group-focus-within:top-1 group-focus-within:-translate-y-0 group-focus-within:text-xs",
                  values.email ? "!top-1 !-translate-y-0 !text-xs" : ""
                )}
              >
                Email or phone number
              </label>

              <input
                type="text"
                id="email"
                name="email"
                className="w-full outline-none mb-2 text-base text-black font-helvetica font-normal"
                onChange={handleChange}
              />
            </div>

            <div className="w-[400px] h-[56px] px-4 rounded-sm border border-[#DFDFDF] bg-white font-helvetica text-black  relative group flex flex-col justify-end mb-36">
              <label
                htmlFor="password"
                className={classNames(
                  "absolute top-1/2 -translate-y-1/2 text-base  font-normal opacity-30 font-helvetica cursor-pointer",
                  "group-focus-within:top-1 group-focus-within:-translate-y-0 group-focus-within:text-xs",
                  values.password ? "!top-1 !-translate-y-0 !text-xs" : ""
                )}
              >
                Password
              </label>

              <input
                type="password"
                id="password"
                name="password"
                className="w-full outline-none mb-2 text-base text-black font-helvetica font-normal"
                onChange={handleChange}
              />
            </div>
            <button
              type="submit"
              className="w-[400px] px-4 py-[15px] font-helvetica font-bold text-base uppercase text-white bg-[#C8C6CE] hover:bg-[#542BE2] rounded"
            >
              LOG IN
            </button>
          </form>
        </div>
        <div className="absolute bottom-9 left-1/2 -translate-x-1/2 flex items-center gap-7 font-helvetica">
          <div className="flex items-center gap-2">
            <span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="19"
                height="19"
                fill="none"
                viewBox="0 0 19 19"
              >
                <path
                  stroke="#8D899C"
                  strokeLinecap="square"
                  strokeMiterlimit="10"
                  strokeWidth="1.6"
                  d="M9.393 16.017a7 7 0 10.027-14 7 7 0 00-.027 14z"
                ></path>
                <path
                  stroke="#8D899C"
                  strokeLinecap="square"
                  strokeMiterlimit="10"
                  strokeWidth="1.6"
                  d="M11.322 5.565A3.569 3.569 0 009.686 5.2C6.96 5.194 6.228 7.193 6.224 9.011c-.003 1.818.72 3.82 3.448 3.825a3.568 3.568 0 001.637-.36"
                ></path>
              </svg>
            </span>
            <span className="text-base font-normal text-[#8D899C]">
              Sports Heist
            </span>
          </div>
          <span className="text-base font-normal text-[#8D899C]">Contact</span>
          <span className="text-base font-normal text-[#8D899C]">
            Privacy & Terms
          </span>
        </div>
      </div>
    </>
  );
};

export default Page;
