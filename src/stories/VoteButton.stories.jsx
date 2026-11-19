import VoteButton from '../components/molecules/VoteButton';

export default {
  title: 'Molecules/VoteButton',
  component: VoteButton,
  tags: ['autodocs'],
  argTypes: {
    onUpVote: { action: 'upvoted' },
    onDownVote: { action: 'downvoted' },
  },
};

export const NeutralState = {
  args: {
    upVotesBy: [],
    downVotesBy: [],
    authUserId: 'user-current',
  },
};

export const UpvotedActive = {
  args: {
    upVotesBy: ['user-current', 'user-2', 'user-3'],
    downVotesBy: [],
    authUserId: 'user-current',
  },
};

export const DownvotedActive = {
  args: {
    upVotesBy: ['user-1'],
    downVotesBy: ['user-current'],
    authUserId: 'user-current',
  },
};

export const HighVoteCount = {
  args: {
    upVotesBy: Array.from({ length: 1240 }, (_, i) => `user-${i}`),
    downVotesBy: Array.from({ length: 45 }, (_, i) => `down-${i}`),
    authUserId: 'user-current',
  },
};
