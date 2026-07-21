
// Thin wrapper around crypto.randomUUID — swap here if the env doesn't support it
export function generateID() {
  return crypto.randomUUID();
}