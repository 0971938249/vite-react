export const routerLinks = (name: string, type?: string) => {
  const array: {
    [selector: string]: string;
  } = {
    Login: '/auth/login',
    ResetPassword: '/auth/reset-password',
    MyProfile: '/my-profile',
    Dashboard: '/dashboard',
    User: '/user',
    Setting: '/setting',
    Data: '/setting/data',
    DataType: '/setting/data/type',
    Post: '/setting/post',
    PostType: '/setting/post/type',
    Code: '/setting/code',
  }; // 💬 generate link to here

  const apis: {
    [selector: string]: string;
  } = {
    Auth: '/auth',
    CodeType: '/code-type',
    Code: '/code',
    UserRole: '/user-role',
    User: '/user',
    Data: '/data',
    DataType: '/data-type',
    Post: '/post',
    PostType: '/post-type',
  }; // 💬 generate api to here

  switch (type) {
    case 'api':
      return apis[name];
    default:
      return array[name];
  }
};
