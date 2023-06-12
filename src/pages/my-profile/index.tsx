import React, { Fragment, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router';
import { Form as AntForm, Tabs, Image } from 'antd';

import { User } from '@svgs';
import { Form } from '@core/form';
import { Button } from '@core/button';
import { GlobalFacade } from '@store';
import { languages, language, routerLinks } from '@utils';

const Page = () => {
  const { t } = useTranslation();
  const { user, isLoading, putProfile, setPassword, profile, status } = GlobalFacade();
  const globalFacade = GlobalFacade();
  const navigate = useNavigate();
  const lang = languages.indexOf(location.pathname.split('/')[1]) > -1 ? location.pathname.split('/')[1] : language;

  const [forms] = AntForm.useForm();

  useEffect(() => {
    profile();
  }, []);

  useEffect(() => {
    switch (status) {
      case 'putProfile.fulfilled':
        profile();
        break;
    }
  }, [status]);

  const handleSubmit = (values: any) => {
    const profileImage = forms.getFieldValue('profileImage');
    const image = (profileImage[(profileImage.length) - 1]?.[0]).length <= 1 ? profileImage :
      profileImage[(profileImage.length) - 1]?.[0]
    globalFacade.putProfile({ ...values, image, profileImage });
  }

  return (
    <Fragment>
      <div className='flex lg:flex-row flex-col w-full'>
        <div className='flex-initial lg:w-[350px] mr-5 lg:rounded-xl w-full'>
          <Form
            formAnt={forms}
            className="text-center items-centers text-xl font-bold text-slate-700 form-profile"
            columns={[
              {
                title: '',
                name: 'profileImage',
                formItem: {
                  type: 'upload',
                  mode: 'multiple',
                  onlyImage: true,
                },
              },
              {
                title: 'user.Fullname',
                name: 'name',
                formItem: {
                  render: (form, values) => {
                    return (values.name)
                  }
                },
              },
              {
                title: 'user.role',
                name: 'userRole',
                formItem: {
                  render: (item: any, values: any, reRender) => {
                    return (
                      <div className='flex w-full flex-row justify-center pt-2 font-normal'>
                        <User className='w-5 h-5 mr-2 fill-slate-500' />
                        <div className='text-base text-gray-500'>{t('user.RoleUser.ADMIN')}</div>
                      </div>
                    )
                  }
                },
              },
            ]}
            disableSubmit={isLoading}
            values={{ ...user }}
          />
        </div>
        <div className='flex-1 lg:rounded-xl w-auto'>
          <Tabs defaultActiveKey="1" size="large" className='profile'>
            <Tabs.TabPane tab={t('routes.admin.Layout.My Profile')} key="1">
              <Form
                values={{ ...user }}
                columns={[
                  {
                    title: 'user.Fullname',
                    name: 'name',
                    formItem: {
                      col: 12,
                      rules: [{ type: 'required' }],
                    },
                  },
                  {
                    title: 'Email',
                    name: 'email',
                    formItem: {
                      tabIndex: 1,
                      col: 6,
                      rules: [{ type: 'required' }, { type: 'email' }, { type: 'min', value: 6 }],
                    },
                  },
                  {
                    title: 'user.Phone Number',
                    name: 'phoneNumber',
                    formItem: {
                      tabIndex: 1,
                      col: 6,
                      rules: [{ type: 'required' }, { type: 'phone', min: 10, max: 15 }],
                    },
                  },
                  {
                    title: 'user.Note',
                    name: 'note',
                    formItem: {
                      type: 'textarea',
                    },
                  },
                ]}
                disableSubmit={isLoading}
                handSubmit={handleSubmit}
                extendButton={(form) => (
                  <Button
                    text={t('components.button.Cancel')}
                    className={'md:w-32 justify-center out-line max-sm:w-3/5'}
                    onClick={() => {
                      navigate(`/${lang}${routerLinks('MyProfile')}`)
                    }}
                  />
                )}
              />
            </Tabs.TabPane>

            <Tabs.TabPane tab={t('routes.admin.Layout.Change Password')} key="2" className=''>
              <Form
                values={{ ...user }}
                className=''
                columns={[
                  {
                    title: 'columns.auth.login.Password',
                    name: 'password',
                    formItem: {
                      notDefaultValid: true,
                      col: 12,
                      type: 'password',
                      rules: [{ type: 'required', message: ('components.form.ruleRequiredPassword') }],
                      placeholder: t('columns.auth.placeholder.Password').toString(),
                    },
                  },
                  {
                    title: 'columns.auth.login.newPassword',
                    name: 'passwordNew',
                    formItem: {
                      col: 12,
                      type: 'password',
                      rules: [{ type: 'required', message: ('components.form.ruleRequiredPassword') }],
                      placeholder: t('columns.auth.placeholder.newPassword').toString(),
                    },
                  },
                  {
                    title: 'columns.auth.login.Confirm Password',
                    name: 'passwordComfirm',
                    formItem: {
                      notDefaultValid: true,
                      col: 12,
                      type: 'password',
                      rules: [
                        {
                          type: 'custom',
                          validator: ({ getFieldValue }) => ({
                            validator(rule, value: string) {
                              const errorMsg = t('columns.auth.placeholder.subConfirm');
                              if (!value || getFieldValue('passwordNew') === value) {
                                return Promise.resolve();
                              }
                              return Promise.reject(new Error(errorMsg));
                            },
                          }),
                        },
                        { type: 'required', message: ('components.form.ruleRequiredPassword') }
                      ],
                      placeholder: t('columns.auth.placeholder.Confirm Password').toString(),
                    },
                  },
                ]}
                disableSubmit={isLoading}
                extendButton={(form) => (
                  <Button
                    text={t('components.button.Cancel')}
                    className={'md:min-w-[8rem] justify-center out-line max-sm:w-3/5'}
                    onClick={() => {
                      navigate(`/${lang}${routerLinks('MyProfile')}`)
                    }}
                  />
                )}
                textSubmit='routes.admin.Layout.Change Password'
                handSubmit={setPassword}
              />
            </Tabs.TabPane>
          </Tabs>
        </div>
      </div>
    </Fragment >
  );
};
export default Page;
