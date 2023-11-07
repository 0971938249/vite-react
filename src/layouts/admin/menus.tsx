import React from 'react';
import { URLSearchParamsInit } from 'react-router-dom/dist/dom';

import { keyRole } from '@utils';
import './index.less';
import { Calendar, Cog, User,Product,Category } from '@svgs';

const Layout: IMenu[] = [
  {
    icon: <Calendar className="h-6 w-6" />,
    name: 'Dashboard',
  },
  {
    icon: <Product className="h-6 w-6 text-white"  style={{ color: 'white' }}/>,
    name: 'Product',
  },
  {
    icon: <Category className="h-6 w-6" />,
    name: 'Category',
    
    // queryParams: { filter: '{"id":"7d5e8209-a754-4298-aaa1-d4ee9f3f4e59"}' },
  },
  {
    icon: <User className="h-6 w-6" />,
    name: 'User',
    // permission: keyRole.P_USER_LISTED,
    // queryParams: { filter: '{"roleCode":"supper_admin"}' },
  },
  {
    icon: <Cog className="h-6 w-6" />,
    name: 'Setting',
    child: [
      {
        name: 'Code',
        permission: keyRole.P_CODE_LISTED,
        queryParams: { filter: '{"type":"position"}' },
      },
      {
        name: 'Data',
        permission: keyRole.P_DATA_LISTED,
        queryParams: { filter: '{"type":"partner"}' },
      },
      {
        name: 'Post',
        permission: keyRole.P_POST_LISTED,
        queryParams: { filter: '{"type":"projects"}' },
      },
      {
        name: 'Parameter',
        permission: keyRole.P_PARAMETER_LISTED,
        queryParams: { code: 'phone' },
      },
    ],
  },
];

export default Layout;

interface IMenu {
  name: string;
  icon?: React.JSX.Element;
  permission?: keyRole;
  queryParams?: URLSearchParamsInit;
  child?: IMenu[];
}
