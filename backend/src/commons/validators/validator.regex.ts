enum ValidatorRegex {
  /*
    Pattern for password.
    1. At least one letter (lowcase or uppercase).
    2. At least one number (0-9).
    3. At least one special character (@$!%*#?&).
    4. Minimum length of 8, Maximum length of 32.
*/
  PASSWORD_REGEX = '^(?=.*[A-Za-z])(?=.*\\d)(?=.*[@$!%*#?&])[A-Za-z\\d@$!%*#?&]{8,32}$',
}

export default ValidatorRegex;
