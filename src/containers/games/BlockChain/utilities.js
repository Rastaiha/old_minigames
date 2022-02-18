export function isHashValid(hash) {
  if (hash[0] == '0' && hash[1] == '0' && hash[2] == '0') return true;
  return false;
}