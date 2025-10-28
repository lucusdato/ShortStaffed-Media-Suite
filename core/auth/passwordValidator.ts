// @ts-nocheck
/**
 * Password Validator
 *
 * Enforces strong password requirements.
 * Rules: Minimum 8 characters, 1 uppercase, 1 lowercase, 1 number, 1 special character
 */

export interface PasswordValidationResult {
  valid: boolean;
  errors: string[];
}

/**
 * Validate password strength
 */
export function validatePassword(password: string): PasswordValidationResult {
  const errors: string[] = [];

  // Check minimum length
  if (password.length < 8) {
    errors.push('Password must be at least 8 characters long');
  }

  // Check for uppercase letter
  if (!/[A-Z]/.test(password)) {
    errors.push('Password must contain at least one uppercase letter');
  }

  // Check for lowercase letter
  if (!/[a-z]/.test(password)) {
    errors.push('Password must contain at least one lowercase letter');
  }

  // Check for number
  if (!/[0-9]/.test(password)) {
    errors.push('Password must contain at least one number');
  }

  // Check for special character
  if (!/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password)) {
    errors.push('Password must contain at least one special character (!@#$%^&*()_+-=[]{};\':"|,.<>?/)');
  }

  return {
    valid: errors.length === 0,
    errors,
  };
}

/**
 * Generate a secure temporary password
 */
export function generateTemporaryPassword(): string {
  const uppercase = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  const lowercase = 'abcdefghijklmnopqrstuvwxyz';
  const numbers = '0123456789';
  const special = '!@#$%^&*';

  // Ensure at least one of each required character type
  let password = '';
  password += uppercase[Math.floor(Math.random() * uppercase.length)];
  password += lowercase[Math.floor(Math.random() * lowercase.length)];
  password += numbers[Math.floor(Math.random() * numbers.length)];
  password += special[Math.floor(Math.random() * special.length)];

  // Fill the rest with random characters
  const allChars = uppercase + lowercase + numbers + special;
  for (let i = 4; i < 12; i++) {
    password += allChars[Math.floor(Math.random() * allChars.length)];
  }

  // Shuffle the password
  return password
    .split('')
    .sort(() => Math.random() - 0.5)
    .join('');
}

/**
 * Get password strength description
 */
export function getPasswordStrength(password: string): {
  strength: 'weak' | 'medium' | 'strong';
  description: string;
} {
  const validation = validatePassword(password);

  if (!validation.valid) {
    return {
      strength: 'weak',
      description: validation.errors.join(', '),
    };
  }

  // Check additional strength criteria
  let score = 0;

  if (password.length >= 12) score++;
  if (password.length >= 16) score++;
  if (/[A-Z].*[A-Z]/.test(password)) score++; // Multiple uppercase
  if (/[0-9].*[0-9]/.test(password)) score++; // Multiple numbers
  if (/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?].*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password)) score++; // Multiple special chars

  if (score >= 4) {
    return {
      strength: 'strong',
      description: 'Strong password',
    };
  } else if (score >= 2) {
    return {
      strength: 'medium',
      description: 'Medium password - consider making it longer or more complex',
    };
  } else {
    return {
      strength: 'medium',
      description: 'Meets minimum requirements',
    };
  }
}
