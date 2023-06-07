import React, { useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router';
import dayjs from 'dayjs';
import { Popconfirm, Tooltip } from 'antd';

import { Avatar } from '@core/avatar';
import { Button } from '@core/button';
import { DataTable } from '@core/data-table';

import { TableRefObject } from '@models';
import { UserFacade, GlobalFacade, CodeFacade, UserRoleFacade } from '@store';
import { Edit, Plus, Trash } from '@svgs';
import { keyRole, routerLinks, getLanguage } from '@utils';

const Page = () => {
  const { formatDate, user, setBreadcrumbs } = GlobalFacade();
  useEffect(() => {
    setBreadcrumbs([
      { title: 'titles.User', link: '' },
      { title: 'titles.User/List', link: '' },
    ]);
  }, []);

  const userFacade = UserFacade();
  useEffect(() => {
    switch (userFacade.status) {
      case 'delete.fulfilled':
        dataTableRef?.current?.onChange!();
        break;
    }
  }, [userFacade.status]);

  const { t } = useTranslation();
  const navigate = useNavigate();
  const lang = getLanguage();
  const dataTableRef = useRef<TableRefObject>(null);
  return (
    <DataTable
      className={'container mx-auto'}
      facade={userFacade}
      ref={dataTableRef}
      onRow={() => ({ onDoubleClick: () => null })}
      pageSizeRender={(sizePage: number) => sizePage}
      pageSizeWidth={'50px'}
      paginationDescription={(from: number, to: number, total: number) =>
        t('routes.admin.Layout.User', { from, to, total })
      }
      columns={[
        {
          title: `user.Fullname`,
          name: 'name',
          tableItem: {
            filter: { type: 'search' },
            width: 200,
            fixed: window.innerWidth > 767 ? 'left' : '',
            sorter: true,
            onCell: () => ({
              style: { paddingTop: '0.25rem', paddingBottom: 0 },
              onClick: async () => null,
            }),
            render: (text: string, item: any) => text && <Avatar src={item.avatar} text={item.name} />,
          },
        },
        {
          title: 'user.Position',
          name: 'position',
          tableItem: {
            filter: {
              type: 'checkbox',
              name: 'positionCode',
              get: {
                facade: CodeFacade,
                format: (item: any) => ({
                  label: item.name,
                  value: item.code,
                }),
                params: (fullTextSearch: string, value) => ({
                  fullTextSearch,
                  filter: { type: 'POS' },
                  extend: { code: value },
                }),
              },
            },
            sorter: true,
            render: (item) => item?.name,
          },
        },
        {
          title: 'user.Role',
          name: 'role',
          tableItem: {
            filter: {
              type: 'checkbox',
              name: 'roleCode',
              get: {
                facade: UserRoleFacade,
                format: (item: any) => ({
                  label: item.name,
                  value: item.code,
                }),
                params: (fullTextSearch: string, value) => ({
                  fullTextSearch,
                  extend: { code: value },
                }),
              },
            },
            sorter: true,
            render: (item) => item?.name,
          },
        },
        {
          title: 'Email',
          name: 'email',
          tableItem: {
            filter: { type: 'search' },
            sorter: true,
          },
        },
        {
          title: 'user.Phone Number',
          name: 'phoneNumber',
          tableItem: {
            filter: { type: 'search' },
            sorter: true,
          },
        },
        {
          title: 'user.Date of birth',
          name: 'dob',
          tableItem: {
            filter: { type: 'date' },
            sorter: true,
            render: (text: string) => dayjs(text).format(formatDate),
          },
        },
        {
          title: 'user.Start Date',
          name: 'startDate',
          tableItem: {
            filter: { type: 'search' },
            sorter: true,
            render: (text: string) => dayjs(text).format(formatDate),
          },
        },
        {
          title: 'user.Action',
          tableItem: {
            width: 80,
            align: 'center',
            onCell: () => ({
              style: { paddingTop: '0.25rem', paddingBottom: '0.25rem' },
            }),
            render: (text: string, data) => (
              <div className={'flex gap-2'}>
                {user?.role?.permissions?.includes(keyRole.P_USER_UPDATE) && (
                  <Tooltip title={t('routes.admin.Layout.Edit')}>
                    <button
                      title={t('routes.admin.Layout.Edit') || ''}
                      onClick={() => navigate(`/${lang}${routerLinks('User')}/${data.id}/edit`)}
                    >
                      <Edit className="icon-cud bg-blue-600 hover:bg-blue-400" />
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
              onClick={() => navigate(`/${lang}${routerLinks('User/Add')}`)}
            />
          )}
        </div>
      }
    />
  );
};
export default Page;
