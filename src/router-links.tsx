const Util = (name: string, type?: string) => {
  const array: {
    [selector: string]: string;
  } = {
    Login: '/login',
    ForgetPassword: '/forgot-password',
    VerifyForotPassword: '/verify-forgot-password',
    SetPassword: '/set-password',
    ResetPassword: '/reset-password',
    MyProfile: '/my-profile',
    Dashboard: '/dashboard',

    User: '/user',
    'User/List': '/user/list',
    'User/Add': '/user/add',
    'User/Edit': '/user/edit',

    Supplier: '/supplier',
    'Supplier/Add': '/supplier/add',
    'Supplier/Edit': '/supplier/edit',

    Store: '/store-managerment',
    'store-managerment/create': '/store-managerment/create',
    'store-managerment/edit': '/store-managerment/detail',

    Category: '/category',

    Product: '/product'
  }; // 💬 generate link to here

  const apis: {
    [selector: string]: string;
  } = {
    'User-admin': '/user-admin',
    Auth: '/auth',
    UserRole: '/mt-role',
    User: '/user-admin',
    Organization: '/sub-organization',
    Province: '/province',
    District: '/district',
    Ward: '/ward',
    Category: '/category',
    Product: '/product',
    SubStore: '/sub-organization/sub-org-in-store'
  }; // 💬 generate api to here

  switch (type) {
    case 'api':
      return apis[name];
    default:
      return array[name];
  }
};
export default Util;
