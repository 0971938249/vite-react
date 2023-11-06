import React, { useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router';
import { Popconfirm, Spin, Tooltip, Select } from 'antd';
import { Button } from '@core/button';
import { DataTable } from '@core/data-table';
import { TableRefObject } from '@models';
import {  GlobalFacade,CategoryFacade ,ProductFacade} from '@store';
import { Check, Disable, Edit, Plus, Trash } from '@svgs';
import { keyRole,  routerLinks, lang  } from '@utils';
import dayjs from 'dayjs';
import '../index.css'
import classNames from 'classnames';
import { createSearchParams } from 'react-router-dom';
const Page = () => {
  const categoryFacade = CategoryFacade();
  const productFacade = ProductFacade();
  const navigate = useNavigate();
  const { user, set, formatDate } = GlobalFacade();
  const { t } = useTranslation();
  const dataTableRef = useRef<TableRefObject>(null);
  
  
  const request = JSON.parse(categoryFacade?.queryParams || '{}');
  if (!request.filter || typeof request?.filter === 'string') request.filter = JSON.parse(request?.filter || '{}');
  return (
    <div className={'container mx-auto grid grid-cols-12 gap-3 px-2.5 pt-2.5'}>
    <div className="col-span-12 md:col-span-4 lg:col-span-3 -intro-x">
      <div className="shadow rounded-xl w-full bg-white overflow-hidden">
        <div className="h-14 flex justify-between items-center border-b border-gray-100 px-4 py-2">
          <h3 className={'font-bold text-lg'}>Role</h3>
        </div>
        <Spin spinning={categoryFacade.isLoading}>
          <div className="h-[calc(100vh-12rem)] overflow-y-auto relative scroll hidden sm:block">
            {categoryFacade?.result?.data?.map((data, index) => (
              <div
                key={data.id}
                className={classNames(
                  'item text-gray-700 font-medium hover:bg-gray-100 flex justify-between items-center border-b border-gray-100 w-full text-left  group',
                )}
              >
                <div
                onClick={() => {
                  request.filter.id = data.id;

                  dataTableRef?.current?.onChange(request);
                }}
                  className="truncate cursor-pointer flex-1 hover:text-teal-900 item-text px-4 py-2"
                >
                  {index + 1}. {data.name}
                </div>
              </div>
            ))}
          </div>
          <div className="p-2 sm:p-0 block sm:hidden">
            <Select
             
              className={'w-full'}
              options={categoryFacade?.result?.data?.map((data) => ({ label: data.name, value: data }))}
              onChange={(e) => {
               
              }}
            />
          </div>
        </Spin>
      </div>
    </div>
    <div className="col-span-12 md:col-span-8 lg:col-span-9 intro-x">
      <div className="shadow rounded-xl w-full overflow-auto bg-white">
        <div className="sm:min-h-[calc(100vh-8.5rem)] overflow-y-auto p-3">
        <DataTable
              className={'container mx-auto'}
              facade={categoryFacade}
              
              ref={dataTableRef}
              // onRow={(record) => ({
              //   onDoubleClick: () => navigate(`/${lang}${routerLinks('User')}/${record.id}/edit`),
              // })}
              pageSizeRender={(sizePage: number) => sizePage}
              pageSizeWidth={'50px'}
              xScroll={1100}
              paginationDescription={(from: number, to: number, total: number) =>
                t('routes.admin.Layout.User', { from, to, total })
              }
              columns={[
                {
                  title: 'routes.product.id',
                  name: 'id',
                  tableItem: {
                    fixed: window.innerWidth > 767 ? 'left' : '',
                    width: 50,
                    sorter: true,
                    render: (text: string, item) => (
                      <div className={'flex gap-2'}>
                        {
                          <Tooltip title={t(text)}>
                             <span className="text-truncate">{text}</span>
                          </Tooltip>
                        }
                      </div>
                    ),
                  },
                },
                {
                  title: 'routes.product.nameproduct',
                  name: 'name',
                  tableItem: {
                    width: 110,
                    sorter: true,
                  },
                },
                {
                  title: 'routes.product.createdAt',
                  name: 'createdAt',
                  tableItem: {
                    filter: { type: 'date' },
                    sorter: true,
                    render: (text: string) => dayjs(text).format(formatDate),
                  },
                },
                {
                  title: `Mô tả`,
                  name: 'description',
                  tableItem: {
                    filter: { type: 'search' },
                    width: 210,
                    sorter: true,
                    

                  },
                },
                {
                  title: `Slug`,
                  name: 'slug',
                  tableItem: {
                    filter: { type: 'search' },
                    width: 210,
                    sorter: true,
                    

                  },
                },
                {
                  title: 'routes.product.updatedAt',
                  name: 'updatedAt',
                  tableItem: {
                    filter: { type: 'search' },
                    sorter: true,
                    render: (text: string) => dayjs(text).format(formatDate),
                  },
                },
                {
                  title: 'routes.admin.user.Action',
                  tableItem: {
                    width: 90,
                    align: 'center',
                    render: (text: string, data) => (
                      <div className={'flex gap-2'}>
                        {user?.role?.permissions?.includes(keyRole.P_USER_UPDATE) && (
                          <Tooltip
                            title={t(
                              data.isDisabled ? 'components.datatable.Disabled' : 'components.datatable.Enabled',
                            )}
                          >
                            <Popconfirm
                              placement="left"
                              title={t(
                                !data.isDisabled
                                  ? 'components.datatable.areYouSureWantDisable'
                                  : 'components.datatable.areYouSureWantEnable',
                              )}
                              // onConfirm={() => userFacade.putDisable({ id: data.id, disable: !data.isDisabled })}
                              okText={t('components.datatable.ok')}
                              cancelText={t('components.datatable.cancel')}
                            >
                              <button
                                title={
                                  t(
                                    data.isDisabled ? 'components.datatable.Disabled' : 'components.datatable.Enabled',
                                  ) || ''
                                }
                              >
                                {data.isDisabled ? (
                                  <Disable className="icon-cud bg-yellow-700 hover:bg-yellow-500" />
                                ) : (
                                  <Check className="icon-cud bg-green-600 hover:bg-green-400" />
                                )}
                              </button>
                            </Popconfirm>
                          </Tooltip>
                        )}
                        {user?.role?.permissions?.includes(keyRole.P_USER_UPDATE) && (
                          <Tooltip title={t('routes.admin.Layout.Edit')}>
                            <button
                              title={t('routes.admin.Layout.Edit') || ''}
                              // onClick={() =>
                              //   navigate(`/${lang}${routerLinks('User')}/${request.filter.roleCode}/${data.id}/edit`)
                              // }
                            >
                              <Edit className="icon-cud bg-teal-900 hover:bg-teal-700" />
                            </button>
                          </Tooltip>
                        )}

                        {user?.role?.permissions?.includes(keyRole.P_USER_DELETE) && (
                          <Tooltip title={t('routes.admin.Layout.Delete')}>
                            <Popconfirm
                              placement="left"
                              title={t('components.datatable.areYouSureWant')}
                              onConfirm={() => dataTableRef?.current?.handleDelete(data.id)}
                              okText={t('components.datatable.ok')}
                              cancelText={t('components.datatable.cancel')}
                            >
                              <button title={t('routes.admin.Layout.Delete') || ''}>
                                <Trash className="icon-cud bg-red-600 hover:bg-red-400" />
                              </button>
                            </Popconfirm>
                          </Tooltip>
                        )}
                      </div>
                    ),
                  },
                },
              ]}
              rightHeader={
                <div className={'flex gap-2'}>
                  {user?.role?.permissions?.includes(keyRole.P_USER_CREATE) && (
                    <Button
                      icon={<Plus className="icon-cud !h-5 !w-5" />}
                      text={t('components.button.New')}
                      // onClick={() => navigate(`/${lang}${routerLinks('User')}/${request.filter.roleCode}/add`)}
                    />
                  )}
                </div>
              }
            />
        </div>
      </div>
    </div>
  </div>
  );
};
export default Page;
