import React, { Fragment } from 'react';
import { useTranslation } from 'react-i18next';
import { Spin } from 'antd';
import { Form } from '@core/form';
import { GlobalFacade } from '@store';
import { useNavigate } from 'react-router';
import { routerLinks, lang } from '@utils';
import imgDash from '../../assets/images/logo.svg';
import logo from '../../assets/images/MU1.png';
const Page = () => {
  const { t } = useTranslation();
  const globalFacade = GlobalFacade();
  const navigate = useNavigate();
  const { isLoading } = globalFacade;

  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const inputElements = document.querySelectorAll('input');
    const itemElements = document.querySelectorAll('.ant-form-item-label label');

    if (event.target.value.length !== 0) {
      itemElements[0].classList.add('label-float');
      inputElements[0].classList.add('input-float');
    } else {
      itemElements[0].classList.remove('label-float');
      inputElements[0].classList.remove('input-float');
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
        <div className="form-login form-signup-member w-[350px] rounded-[5px] sm:w-[450px] z-20">
          <div className="mt-1 my-3 mb-4 flex justify-between">
            <p className="layout-title text-[28px] text-black uppercase mt-2">Add your Warriors Membership</p>
            <img src={logo} className="w-10 h-10"></img>
          </div>
          <Form
            values={{
              sportsClub: {
                value: 'warriors',
              },
            }}
            className="intro-x !p-0"
            columns={[
              {
                name: 'memberID',
                title: t('Membership ID'),
                formItem: {
                  rules: [{ type: 'required' }, { type: 'only_number' }],
                  onChange,
                  onBlur: () => onChange,
                },
              },
              {
                name: 'dateOfBirth',
                title: 'Date of Birth',
                formItem: {
                  placeholder: ' ',
                  type: 'date',
                  disabledDate: (current) => {
                    const currentDate = new Date();
                    return current && current > currentDate;
                  },
                  rules: [{ type: 'required' }],
                  onChange(selectDate) {
                    const inputElements = document.querySelectorAll('input');
                    const itemElements = document.querySelectorAll('.ant-form-item-label label');
                    if (selectDate) {
                      inputElements[1].classList.add('input-float');
                      itemElements[1].classList.add('label-float');
                    }else {
                      inputElements[1].classList.remove('input-float');
                      itemElements[1].classList.remove('label-float');
                    }
                  },
                  onOpenChange(selectDate) {
                    const inputElements = document.querySelectorAll('input');
                    const itemElements = document.querySelectorAll('.ant-form-item-label label');
                    if (selectDate === true) {
                      inputElements[1].classList.add('input-float');
                      itemElements[1].classList.add('label-float');
                    }
                  },
                },
              },
            ]}
            textSubmit={'ADD'}
            handSubmit={() => {}}
            textCancel={'SKIP'}
            handCancel={()=>{} }
            disableSubmit={isLoading}
          />
        </div>
      </Spin>
    </Fragment>
  );
};

export default Page;
