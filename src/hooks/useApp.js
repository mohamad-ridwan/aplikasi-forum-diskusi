import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { asyncPreloadProcess } from '../states/isPreload/action';
import { asyncUnsetAuthUser } from '../states/authUser/action';

function useApp() {
  const dispatch = useDispatch();
  const { authUser, isPreload } = useSelector((states) => states);

  useEffect(() => {
    dispatch(asyncPreloadProcess());
  }, [dispatch]);

  const onLogout = () => {
    dispatch(asyncUnsetAuthUser());
  };

  return {
    authUser,
    isPreload,
    onLogout,
  };
}

export default useApp;
