import React from 'react';

import { keyRole } from '@utils';
import './index.less';
import { Cog, User, Coffee, Booking } from '@svgs';

const Layout = [
  {
    icon: <User className="h-6 w-6" />,
    name: 'User',
    permission: keyRole.P_USER_LISTED,
    queryParams: { filter: '{"roleCode":"supper_admin"}' },
  },
  {
    icon: <Coffee className="h-8 w-8" />,
    name: 'DayOff',
    permission: keyRole.P_DAYOFF_LISTED,
  },
  {
    icon: <Booking className="h-8 w-8" />,
    name: 'Booking',
    permission: keyRole.P_DAYOFF_LISTED,
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
      {
        name: 'Team',
        permission: keyRole.P_USER_TEAM_LISTED,
      },
    ],
  },
];

export default Layout;
