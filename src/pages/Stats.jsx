import React from 'react';
import TopTenByVoteCount from '../components/TopTenByVote';
import TopTenChart from '../components/TopTenChart';
const Stats = () => {
  return (
    <div className='stats'>
      <TopTenChart />
      <TopTenByVoteCount />
    </div>
  );
};

export default Stats;
