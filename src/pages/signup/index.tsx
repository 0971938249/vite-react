import React, { Fragment } from 'react';
import { useTranslation } from 'react-i18next';
import { Spin } from 'antd';
import { Form } from '@core/form';
import { GlobalFacade } from '@store';
import { useNavigate } from 'react-router';
import { routerLinks, lang } from '@utils';
import imgDash from '../../assets/images/logo.svg';
import logo from '../../assets/images/MU1.png';
import mu from '../../assets/images/MU.png';
const Page = () => {
  const { t } = useTranslation();
  const globalFacade = GlobalFacade();
  const navigate = useNavigate();
  const { isLoading } = globalFacade;

  const listClubs = [
    {
      value: 'warriors',
      label: (
        <div>
          <img src={logo} className="w-10 h-10 inline"></img> <span className="pl-1 text-base">Warriors</span>
        </div>
      ),
    },
    {
      value: 'MU',
      label: (
        <div>
          <img src={mu} className="w-10 h-10 inline"></img> <span className="pl-1 text-base">MU</span>
        </div>
      ),
    },
  ];

  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    console.log(event);
    const inputName = event.target.id;
    const inputElements = document.querySelectorAll('input');
    const itemElements = document.querySelectorAll('.ant-form-item-label label');
    const index = inputName === 'password' ? 1 : inputName === 'confirmPassword' ? 2 : 0;

    if (event.target.value.length !== 0) {
      itemElements[index].classList.add('label-float');
      inputElements[index].classList.add('input-float');
    } else {
      itemElements[index].classList.remove('label-float');
      inputElements[index].classList.remove('input-float');
    }
  };

  return (
    <Fragment>
      <Spin spinning={isLoading}>
        <div className="text-center mb-8 mt-[18%] lg:mt-0 sm:mt-[25%]">
          <div>
            <img src={imgDash} className="w-[50%] h-full inline sm:w-[36%] "></img>
          </div>
        </div>
        <div className="form-login form-signup w-[350px] rounded-[5px] sm:w-[450px] z-20">
          <p className="layout-title text-[28px] text-black mt-1 my-3 uppercase mb-10">Register with Sports Heist</p>
          <Form
            values={{
              sportsClub: {
                value: 'warriors',
              },
            }}
            className="intro-x !p-0"
            columns={[
              {
                name: 'email',
                title: t('Email or phone number'),
                // title: t('Email'),
                formItem: {
                  // rules: [{ type: 'required' },{ type: 'email' }],
                  // rules: [{ type: 'phone-email' }],
                  onChange,
                  onBlur: () => onChange,
                },
              },
              {
                name: 'password',
                title: 'Password',
                formItem: {
                  // type: 'password',
                  // rules: [{ type: 'required' }],
                  onChange,
                  onBlur: () => onChange,
                },
              },
              {
                name: 'confirmPassword',
                title: 'Confirm Password',
                formItem: {
                  // type: 'password',
                  rules: [
                    // { type: 'required' },
                    {
                      type: 'custom',
                      validator: ({ getFieldValue }) => ({
                        validator(rule, value: string) {
                          const errorMsg = t("Passwords don't match.");
                          if (!value || getFieldValue('password') === value) {
                            return Promise.resolve();
                          }
                          return Promise.reject(new Error(errorMsg));
                        },
                      }),
                    },
                  ],
                  onChange,
                  onBlur: () => onChange,
                },
              },
              {
                name: 'sportsClub',
                title: t('Select your Sports Club'),
                formItem: {
                  showSearch: false,
                  type: 'select',
                  rules: [{ type: 'required' }],
                  list: listClubs,
                },
              },
            ]}
            textSubmit={'SIGN UP'}
            handSubmit={() => {
              navigate(`/${lang}${routerLinks('SignupMember')}`);
            }}
            disableSubmit={isLoading}
          />
          <div className="flex justify-center mt-3 -mb-2">
            <p className="text-base">
              Already a user?&ensp;
              <button
                className="button-login"
                onClick={() => {
                  navigate(`/${lang}${routerLinks('Login')}`);
                }}
              >
                LOGIN
              </button>
            </p>
          </div>
        </div>
      </Spin>
    </Fragment>
  );
};

export default Page;
