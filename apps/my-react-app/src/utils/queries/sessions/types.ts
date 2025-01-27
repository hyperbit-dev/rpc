export type AuthToken = {
  id: number;
  tokenableId: string;
  type: string;
  name: string | null;
  hash: string;
  abilities: string; // "[\"*\"]"
  createdAt: string;
  updatedAt: string;
  lastUsedAt: string;
  expiresAt: string;
};
