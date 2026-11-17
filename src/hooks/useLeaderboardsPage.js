import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { asyncReceiveLeaderboards } from '../states/leaderboards/action';

function useLeaderboardsPage() {
  const dispatch = useDispatch();
  const leaderboards = useSelector((states) => states.leaderboards) || [];

  useEffect(() => {
    dispatch(asyncReceiveLeaderboards());
  }, [dispatch]);

  return {
    leaderboards,
  };
}

export default useLeaderboardsPage;
