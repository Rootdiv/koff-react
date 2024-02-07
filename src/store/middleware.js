import { fetchAccessKey } from '@/store/auth/authSlice';

export const apiTokenError = store => next => async action => {
  const state = store.getState();
  if (action.type.endsWith('rejected') && action.payload?.status === 401) {
    if (!state.auth.loading) {
      await store.dispatch(fetchAccessKey());
    }
  }
  next(action);
};
