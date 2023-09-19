import React, { Fragment } from 'react';
import { useTranslation } from 'react-i18next';
import { Spin } from 'antd';
import { Form } from '@core/form';
import { GlobalFacade } from '@store';
import imgDash from '../../assets/images/logo.svg';
const Page = () => {
  const { t } = useTranslation();
  const globalFacade = GlobalFacade();
  const { isLoading, data } = globalFacade;

  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    console.log(event);
    const inputName = event.target.id;
    const inputElements = document.querySelectorAll('input');
    const itemElements = document.querySelectorAll('.ant-form-item-label label');
    const index = inputName === 'password' ? 1 : 0;

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
        <div className="form-login w-[350px] h-[421px] rounded-[5px] sm:w-[450px]">
          <p className="layout-title text-[28px] text-black mt-1 my-3 uppercase ">{t('titles.Login')}</p>
          <Form
            values={{ ...data }}
            className="intro-x !p-0"
            columns={[
              {
                name: 'email',
                title: t('Email or phone number'),
                formItem: {
                  rules: [{ type: 'phone-email' }],
                  onChange,
                  onBlur: () => onChange,
                },
              },
              {
                name: 'password',
                title: t('columns.auth.login.password'),
                formItem: {
                  type: 'password',
                  rules: [{ type: 'required' }],
                  onChange,
                },
              },
            ]}
            textSubmit={t('columns.auth.login.login')}
            handSubmit={() => {
              // login
            }}
            disableSubmit={isLoading}
          />
        </div>
      </Spin>
    </Fragment>
  );
};

export default Page;
