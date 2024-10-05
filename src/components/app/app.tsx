import {
  ConstructorPage,
  Feed,
  ForgotPassword,
  Login,
  NotFound404,
  Profile,
  ProfileOrders,
  Register,
  ResetPassword
} from '@pages';
import '../../index.css';
import styles from './app.module.css';

import { AppHeader, IngredientDetails, Modal, OrderInfo } from '@components';
import { Routes, Route, useLocation, useMatch } from 'react-router-dom';
import { useEffect } from 'react';
import { fetchIngredients } from '../../services/ingredientsSlice';
import { useDispatch, useSelector } from '../../services/store';
import { getAuthChecked, getUser } from '../../services/authSlice';
import { ProtectedRoute } from '../protected-route';

const App = () => {
  const location = useLocation();
  const backgroundLocation = location.state?.background;
  const dispatch = useDispatch();
  const profileMatch = useMatch('/profile/orders/:number')?.params.number;
  const feedMatch = useMatch('/feed/:number')?.params.number;
  const orderNumber = profileMatch || feedMatch;

  useEffect(() => {
    dispatch(getUser());
    dispatch(fetchIngredients());
  }, [dispatch]);

  return (
    <div className={styles.app}>
      <AppHeader />
      <Routes location={backgroundLocation || location}>
        <Route path='*' element={<NotFound404 />} />
        <Route path='/' element={<ConstructorPage />} />
        <Route path='/feed' element={<Feed />} />
        <Route
          path='/login'
          element={
            <ProtectedRoute onlyUnAuth>
              <Login />
            </ProtectedRoute>
          }
        />
        <Route
          path='/register'
          element={
            <ProtectedRoute onlyUnAuth>
              <Register />
            </ProtectedRoute>
          }
        />
        <Route
          path='/forgot-password'
          element={
            <ProtectedRoute onlyUnAuth>
              <ForgotPassword />
            </ProtectedRoute>
          }
        />
        <Route
          path='/reset-password'
          element={
            <ProtectedRoute onlyUnAuth>
              <ResetPassword />
            </ProtectedRoute>
          }
        />
        <Route
          path='/profile'
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        />
        <Route
          path='/profile/orders'
          element={
            <ProtectedRoute>
              <ProfileOrders />
            </ProtectedRoute>
          }
        />
        {/* отображение содержимого модалок по прямой ссылке */}
        {/* <Route path='/feed/:number' element={<OrderInfo />} />
        <Route path='/ingredients/:id' element={<IngredientDetails />} /> */}
        <Route
          path='/ingredients/:id'
          element={
            <div className={styles.detailPageWrap}>
              <p className={`text text_type_main-large ${styles.detailHeader}`}>
                Детали ингредиента
              </p>
              <IngredientDetails />
            </div>
          }
        />
        <Route
          path='/feed/:number'
          element={
            <div className={styles.detailPageWrap}>
              <p
                className={`text text_type_digits-default ${styles.detailHeader}`}
              >
                #{orderNumber && orderNumber.padStart(6, '0')}
              </p>
              <OrderInfo />
            </div>
          }
        />
        <Route
          path='/profile/orders/:number'
          element={
            <div className={styles.detailPageWrap}>
              <p
                className={`text text_type_digits-default ${styles.detailHeader}`}
              >
                #{orderNumber && orderNumber.padStart(6, '0')}
              </p>
              <OrderInfo />
            </div>
          }
        />
      </Routes>
      {/* модалки */}
      {backgroundLocation && (
        <Routes>
          <Route
            path='/profile/orders/:number'
            element={
              <Modal
                onClose={() => window.history.back()}
                title={`#${orderNumber && orderNumber.padStart(6, '0')}`}
              >
                <OrderInfo />
              </Modal>
            }
          />
          <Route
            path='/ingredients/:id'
            element={
              <Modal
                onClose={() => window.history.back()}
                title='Детали ингредиента'
              >
                <IngredientDetails />
              </Modal>
            }
          />
          <Route
            path='/feed/:number'
            element={
              <Modal
                onClose={() => window.history.back()}
                title={`#${orderNumber && orderNumber.padStart(6, '0')}`}
              >
                <OrderInfo />
              </Modal>
            }
          />
        </Routes>
      )}
    </div>
  );
};

export default App;
