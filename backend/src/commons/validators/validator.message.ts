export const ANY_REQUIRED_MESSAGE = {
  'any.required': '{#label} is required.',
};

export const ANY_EMPTY_MESSAGE = {
  'any.empty': '{#label} must not be empty.',
};

export const ANY_EMAIL_MESSAGE = {
  'any.email': 'Please enter a valid email address format.',
};

export const ANY_ONLY_MESSAGE = {
  'any.only': '{#label} must be one of {#valids}',
};

export const STRING_MIN_MESSAGE = {
  'string.min': '{#label} must be longer than length of {#limit}',
};

export const STRING_MAX_MESSAGE = {
  'string.max': '{#label} must be shorter than length of {#limit}',
};

export const STRING_PASSWORD_PATTERN_MESSAGE = {
  'string.pattern.base':
    '{#label} must be 8-32 characters long and contain at least one letter, one number, one special character.',
};

export const DATE_GREATER_MESSAGE = {
  'date.greater': `{#label} must be greater than ${new Date().toString()}.`,
};
