import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import LeaderboardList from '../components/organisms/LeaderboardList';
import { asyncReceiveLeaderboards } from '../states/leaderboards/action';

function LeaderboardsPage() {
  const dispatch = useDispatch();
  const { leaderboards = [] } = useSelector((states) => states);

  useEffect(() => {
    dispatch(asyncReceiveLeaderboards());
  }, [dispatch]);

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8 pb-20">
      <LeaderboardList leaderboards={leaderboards} />
    </div>
  );
}

export default LeaderboardsPage;
