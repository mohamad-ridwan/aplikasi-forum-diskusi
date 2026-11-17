import React from 'react';
import LeaderboardList from '../components/organisms/LeaderboardList';
import useLeaderboardsPage from '../hooks/useLeaderboardsPage';

function LeaderboardsPage() {
  const { leaderboards } = useLeaderboardsPage();

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8 pb-20">
      <LeaderboardList leaderboards={leaderboards} />
    </div>
  );
}

export default LeaderboardsPage;
