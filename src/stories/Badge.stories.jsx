import Badge from '../components/atoms/Badge';

export default {
  title: 'Atoms/Badge',
  component: Badge,
  tags: ['autodocs'],
  argTypes: {
    onClick: { action: 'clicked' },
  },
};

export const CategoryTag = {
  args: {
    label: 'react',
  },
};

export const ActiveCategoryFilter = {
  args: {
    label: 'redux',
    active: true,
    onClick: () => {},
  },
};

export const InactiveCategoryFilter = {
  args: {
    label: 'javascript',
    active: false,
    onClick: () => {},
  },
};
