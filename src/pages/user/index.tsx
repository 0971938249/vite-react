import React, { useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router';

import { Button } from '@core/button';
import { DataTable } from '@core/data-table';

import { routerLinks, languages, language } from '@utils';
import { UserFacade } from '@store';
import { Plus } from '@svgs';
import { TableRefObject } from '@models';

const Page = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const userFacade = UserFacade();
  const lang = languages.indexOf(location.pathname.split('/')[1]) > -1 ? location.pathname.split('/')[1] : language;

  useEffect(() => {
    switch (userFacade.status) {
      case 'delete.fulfilled':
        dataTableRef?.current?.onChange!();
        break;
    }
  }, [userFacade.status]);

  const dataTableRef = useRef<TableRefObject>(null);

  return (
    <DataTable
      facade={userFacade}
      ref={dataTableRef}
      onRow={(data: any) => ({ onDoubleClick: () => navigate(`/${lang}${routerLinks('User/Edit')}/${data.id}`) })}
      xScroll={'1400px'}
      pageSizeRender={(sizePage: number) => sizePage}
      pageSizeWidth={'50px'}
      paginationDescription={(from: number, to: number, total: number) =>
        t('routes.admin.Layout.User', { from, to, total })
      }
      className='bg-white p-4 rounded-xl'
      columns={[
        {
          title: 'user.UserId',
          name: 'code',
          tableItem: {
            width: 100,
          },
        },
        {
          title: 'user.Fullname',
          name: 'name',
          tableItem: {
            width: 150,
            onCell: () => ({
              style: { paddingTop: '0.25rem', paddingBottom: 0 },
              onClick: async () => null,
            }),
            render: (text: string, item: any) => text,
          },
        },
        {
          title: 'Email',
          name: 'email',
          tableItem: {
            width: 300,
          },
        },
        {
          title: 'user.Phone Number',
          name: 'phoneNumber',
          tableItem: {
            width: 200,
          },
        },
        {
          title: 'user.Role',
          name: 'userRole',
          tableItem: {
            width: 150,
            render: (item: any) => {
              if (item[0].mtRole.code === "ADMIN") {
                return <h2>{t('user.RoleUser.ADMIN')}</h2>;
              } else if (item[0].mtRole.code === "OWNER_SUPPLIER") {
                return <h2>{t('user.RoleUser.SUPPLIER')}</h2>;
              } else {
                return <h2>{t('user.RoleUser.STORE')}</h2>;
              }
            }
          },
        },
      ]}
      rightHeader={
        <div className={'flex gap-2 pb-3 mt-2 lg:mt-0'}>
          <Button
            icon={<Plus className="icon-cud !h-5 !w-5" />}
            text={t('titles.User/Button')}
            onClick={() => navigate(`/${lang}${routerLinks('User/Add')}`)}
            className='!rounded-xl !font-normal'
          />
        </div>
      }
    />
  );
};
export default Page;
