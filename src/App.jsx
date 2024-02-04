import { Header } from '@/views/Header/Header';
import { Main } from '@/views/Main/Main';
import { Footer } from '@/views/Footer/Footer';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { fetchAccessKey } from '@/store/auth/authSlice';

const App = () => {
  const dispatch = useDispatch();
  const { accessKey, loading } = useSelector((state) => state.auth);

  useEffect(() => {
    if (!accessKey) {
      dispatch(fetchAccessKey());
    }
  }, [dispatch, accessKey]);

  return (
    <>
      <Header />
      {!loading && accessKey ? <Main /> : '<div>Загрузка...</div>'}
      <Footer />
    </>
  );
};

export default App;
