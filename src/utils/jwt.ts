export type DecodedJWT = {
  exp?: number;
  iat?: number;
  [key: string]: any;
};

function base64UrlDecode(input: string): string {
  const pad = (str: string) => (str.length % 4 === 0 ? str : str + '='.repeat(4 - (str.length % 4)));
  const normalized = input.replace(/-/g, '+').replace(/_/g, '/');
  const padded = pad(normalized);
  try {
    const B: any = (globalThis as any).Buffer;
    if (B && typeof B.from === 'function') {
      return B.from(padded, 'base64').toString('utf8');
    }
    // Fallback: basic atob-based decoding if available
    const atobFn: any = (globalThis as any).atob;
    if (typeof atobFn === 'function') {
      const binStr = atobFn(padded);
      try {
        // Decode as UTF-8
        const esc = binStr.replace(/%/g, '%25');
        return decodeURIComponent(esc.split('').map((c: string) => '%' + c.charCodeAt(0).toString(16).padStart(2, '0')).join(''));
      } catch {
        return binStr;
      }
    }
    return '';
  } catch (e) {
    return '';
  }
}

export function decodeJWT(token?: string | null): DecodedJWT | null {
  if (!token) return null;
  const parts = token.split('.');
  if (parts.length !== 3) return null;
  const payload = base64UrlDecode(parts[1]);
  try {
    return JSON.parse(payload);
  } catch (e) {
    return null;
  }
}

export function getExpiryFromJWT(token?: string | null): number | null {
  const decoded = decodeJWT(token);
  if (!decoded?.exp) return null;
  // exp is seconds since epoch
  return decoded.exp * 1000;
}