import React, { Suspense, useEffect } from 'react';
import { BrowserRouter, Navigate, Outlet, Route, Routes } from 'react-router-dom';

import { Spin } from '@core/spin';
import { keyUser, routerLinks } from '@utils';
import { useTranslation } from 'react-i18next';
import { GlobalFacade } from '@store';

const pages = [
  {
    layout: React.lazy(() => import('@layouts/auth')),
    isPublic: true,
    child: [
      {
        path: routerLinks('Login'),
        component: React.lazy(() => import('@pages/login')),
        title: 'Login',
      },
      {
        path: routerLinks('ResetPassword'),
        component: React.lazy(() => import('@pages/reset-password')),
        title: 'Reset Password',
      },
    ],
  },
  {
    layout: React.lazy(() => import('@layouts/admin')),
    isPublic: false,
    child: [
      {
        path: '/',
        component: routerLinks('Dashboard'),
      },
      {
        path: routerLinks('MyProfile'),
        component: React.lazy(() => import('@pages/my-profile')),
        title: 'MyProfile',
      },
      {
        path: routerLinks('Dashboard'),
        component: React.lazy(() => import('@pages/dashboard')),
        title: 'Dashboard',
      },
      {
        path: routerLinks('User/List'),
        component: React.lazy(() => import('@pages/user')),
        title: 'User/List',
      },
      {
        path: routerLinks('User/Add'),
        component: React.lazy(() => import('@pages/user/add')),
        title: 'User/Add',
      },
      {
        path: routerLinks('User') + '/:id',
        component: React.lazy(() => import('@pages/user/add')),
        title: 'User/Edit',
      },
      {
        path: routerLinks('Supplier'),
        component: React.lazy(() => import('@pages/supplier')),
        title: 'Supplier',
      },
      {
        path: routerLinks('Supplier/Add'),
        component: React.lazy(() => import('@pages/supplier/add')),
        title: 'Supplier/Add',
      },
      {
        path: routerLinks('Supplier/Edit') + '/:id',
        component: React.lazy(() => import('@pages/supplier/edit')),
        title: 'Supplier/Edit',
      },
    ], // 💬 generate link to here
  },
];

const Layout = ({
  layout: Layout,
  isPublic = false,
}: {
  layout: React.LazyExoticComponent<({ children }: { children?: React.ReactNode }) => JSX.Element>;
  isPublic: boolean;
}) => {
  const { user } = GlobalFacade();
  if (isPublic || !!user?.email || !!JSON.parse(localStorage.getItem(keyUser) || '{}')?.email)
    return (
      <Layout>
        <Outlet />
      </Layout>
    );
  return <Navigate to={routerLinks('Login')} />;
};

const Page = ({
  title = '',
  component: Comp,
}: {
  title: string;
  component: React.LazyExoticComponent<() => JSX.Element>;
}) => {
  const { t } = useTranslation();
  const globalFacade = GlobalFacade();

  useEffect(() => {
    document.title = t('pages.' + title || '');
    // globalFacade.set({ title, formatDate: globalFacade.formatDate });
  }, [title]);
  return <Comp />;
};
const Pages = () => (
  <BrowserRouter>
    <Routes>
      {pages.map(({ layout, isPublic, child }, index) => (
        <Route key={index} element={<Layout layout={layout} isPublic={isPublic} />}>
          {child.map(({ path = '', title = '', component }, subIndex: number) => (
            <Route
              key={path + subIndex}
              path={path}
              element={
                <Suspense
                  fallback={
                    <Spin>
                      <div className="w-screen h-screen" />
                    </Spin>
                  }
                >
                  {typeof component === 'string' ? (
                    <Navigate to={component} />
                  ) : (
                    <Page title={title} component={component} />
                  )}
                </Suspense>
              }
            />
          ))}
        </Route>
      ))}
    </Routes>
  </BrowserRouter>
);

export default Pages;
