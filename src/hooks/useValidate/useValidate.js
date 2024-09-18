import { useEffect } from 'react';
import { useForm } from 'react-hook-form';

import validateRules from './rules';

export default function useValidate(form, type, fields) {
  const rules = validateRules[form];

  const {
    handleSubmit,
    formState: { errors },
    register,
    watch,
    setValue,
  } = useForm();

  useEffect(() => {
    if (type === 'register') {
      rules.repeatPassword.register.validate = (value) => {
        if (watch('password') !== value) {
          return 'Passwords must match';
        }
        return true;
      };
    }
  }, []);

  const validateFields = fields.map((field) => {
    const { value } = field;
    const validateOptions = register(value, rules[type][value]);
    const errorMessage = errors[value]?.message;
    return { fieldInfo: field, validateOptions, errorMessage };
  });

  return { handleSubmit, setValue, validateFields };
}
