import * as crypto from 'crypto';

export function generateStringChecksum(
  data: string,
  algorithm: string = 'sha256',
  encoding: crypto.BinaryToTextEncoding = 'hex',
): string {
  return crypto.createHash(algorithm).update(data).digest(encoding);
}
