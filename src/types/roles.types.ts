export const knownRoles = [
  'admin',
  'teacher',
  'student',
  'librarian',
  'medical',
  'academics',
] as const;

export type KnownUserRoles = (typeof knownRoles)[number];

export type UserRole = KnownUserRoles | (string & {});
