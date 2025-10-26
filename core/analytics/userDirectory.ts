/**
 * User Directory
 *
 * Central directory of employees who use the ShortStaffed Media Suite.
 * This makes it easy for users to identify themselves with a simple dropdown.
 *
 * To add new users:
 * 1. Add a new entry to the USERS array
 * 2. Specify their name, role, and client
 * 3. Save the file - changes take effect immediately
 *
 * Role options (in order of seniority):
 * - "Associate Planner"
 * - "Media Planner"
 * - "Senior Media Planner"
 * - "Supervisor"
 * - "Manager"
 * - "Senior Manager"
 * - "Director"
 * - "Senior Director"
 * - "VP"
 *
 * Client options (examples):
 * - "Unilever"
 * - "P&G"
 * - "Nike"
 * - "Coca-Cola"
 * - etc.
 */

export interface UserDirectoryEntry {
  name: string;
  role: string;
  client: string;
  isAdmin?: boolean;
}

export const USERS: UserDirectoryEntry[] = [
  // ============================================================================
  // UNILEVER
  // ============================================================================
  { name: "Lucus Dato", role: "Manager", client: "Unilever", isAdmin: true },
  { name: "Test", role: "Planner", client: "Test", isAdmin: false },

  // ============================================================================
  // ADD NEW USERS BELOW THIS LINE
  // ============================================================================
  // Example format:
  // { name: "Your Name", role: "Your Role", client: "Client Name" },
];

/**
 * Get all users sorted alphabetically by name
 */
export function getUsersSortedByName(): UserDirectoryEntry[] {
  return [...USERS].sort((a, b) => a.name.localeCompare(b.name));
}

/**
 * Get all users grouped by client
 */
export function getUsersByClient(): { [client: string]: UserDirectoryEntry[] } {
  const grouped: { [client: string]: UserDirectoryEntry[] } = {};

  for (const user of USERS) {
    if (!grouped[user.client]) {
      grouped[user.client] = [];
    }
    grouped[user.client].push(user);
  }

  // Sort users within each client
  for (const client in grouped) {
    grouped[client].sort((a, b) => a.name.localeCompare(b.name));
  }

  return grouped;
}

/**
 * Get all users grouped by role
 */
export function getUsersByRole(): { [role: string]: UserDirectoryEntry[] } {
  const grouped: { [role: string]: UserDirectoryEntry[] } = {};

  for (const user of USERS) {
    if (!grouped[user.role]) {
      grouped[user.role] = [];
    }
    grouped[user.role].push(user);
  }

  // Sort users within each role
  for (const role in grouped) {
    grouped[role].sort((a, b) => a.name.localeCompare(b.name));
  }

  return grouped;
}

/**
 * Find a user by exact name match
 */
export function findUserByName(name: string): UserDirectoryEntry | undefined {
  return USERS.find((user) => user.name === name);
}

/**
 * Get unique list of all clients
 */
export function getAllClients(): string[] {
  const clients = new Set(USERS.map((user) => user.client));
  return Array.from(clients).sort();
}

/**
 * Get unique list of all roles
 */
export function getAllRoles(): string[] {
  const roles = new Set(USERS.map((user) => user.role));
  return Array.from(roles).sort();
}

/**
 * Validate if a user exists in the directory
 */
export function isValidUser(name: string): boolean {
  return USERS.some((user) => user.name === name);
}

/**
 * Get unique list of all user names
 */
export function getAllUserNames(): string[] {
  const names = USERS.map((user) => user.name);
  return Array.from(new Set(names)).sort();
}
