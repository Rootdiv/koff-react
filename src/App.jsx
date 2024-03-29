import { Header } from '@/views/Header/Header';
import { Footer } from '@/views/Footer/Footer';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { fetchAccessKey } from '@/store/auth/authSlice';
import { createBrowserRouter, Outlet, RouterProvider } from 'react-router-dom';
import { Catalog } from '@/views/Catalog/Catalog';
import { Goods } from '@/views/Goods/Goods';
import { Cart } from '@/views/Cart/Cart';
import { Card } from '@/components/Card/Card';
import { PageNotFound } from '@/views/PageNotFound/PageNotFound';
import { Order } from '@/components/Order/Order';
import { Breadcrumbs } from '@/components/Breadcrumbs/Breadcrumbs';

const router = createBrowserRouter([
  {
    path: '/',
    element: (
      <>
        <Header />
        <main>
          <Outlet />
        </main>
        <Footer />
      </>
    ),
    children: [
      {
        path: '/',
        element: (
          <>
            <Catalog />
            <Goods />
          </>
        ),
      },
      {
        path: '/favorites',
        element: (
          <>
            <Catalog />
            <Breadcrumbs page="Избранное" />
            <Goods />
          </>
        ),
      },
      {
        path: '/category',
        element: (
          <>
            <Catalog />
            <Breadcrumbs />
            <Goods />
          </>
        ),
      },
      {
        path: '/search',
        element: (
          <>
            <Catalog />
            <Breadcrumbs page="Поиск" />
            <Goods />
          </>
        ),
      },
      {
        path: '/cart',
        element: <Cart />,
      },
      {
        path: '/product/:productId',
        element: (
          <>
            <Catalog />
            <Breadcrumbs />
            <Card />
          </>
        ),
      },
      {
        path: '/order/:orderId',
        element: <Order />,
      },
      {
        path: '*',
        element: <PageNotFound />,
      },
    ],
  },
]);

const App = () => {
  const dispatch = useDispatch();
  const { accessKey, loading } = useSelector(state => state.auth);

  useEffect(() => {
    if (!accessKey) {
      dispatch(fetchAccessKey());
    }
  }, [dispatch, accessKey]);

  if (loading) {
    return <div>Загрузка...</div>;
  }

  return <RouterProvider router={router} />;
};

export default App;
