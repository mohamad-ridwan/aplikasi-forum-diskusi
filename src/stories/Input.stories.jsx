import Input from '../components/atoms/Input';

export default {
  title: 'Atoms/Input',
  component: Input,
  tags: ['autodocs'],
  argTypes: {
    onChange: { action: 'changed' },
  },
};

export const DefaultText = {
  args: {
    id: 'default-input',
    placeholder: 'Ketik sesuatu di sini...',
    value: '',
  },
};

export const WithLabelAndPlaceholder = {
  args: {
    id: 'email-input',
    label: 'Alamat Email',
    placeholder: 'nama@email.com',
    required: true,
    value: '',
  },
};

export const WithErrorValidation = {
  args: {
    id: 'error-input',
    label: 'Alamat Email',
    placeholder: 'nama@email.com',
    value: 'email-salah-format',
    error: 'Format alamat email tidak valid.',
  },
};

export const PasswordInput = {
  args: {
    id: 'password-input',
    label: 'Kata Sandi',
    type: 'password',
    placeholder: '••••••••',
    required: true,
    value: '',
  },
};
