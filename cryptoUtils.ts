import nacl from 'tweetnacl';
import { sha256 } from 'js-sha256';

/**
 * Encodes a Uint8Array to a hex string.
 * @param {Uint8Array} bytes The array to encode.
 * @returns {string} The hex string.
 */
const toHexString = (bytes: Uint8Array): string =>
  bytes.reduce((str, byte) => str + byte.toString(16).padStart(2, '0'), '');

/**
 * Decodes a hex string to a Uint8Array.
 * @param {string} hexString The hex string to decode.
 * @returns {Uint8Array} The decoded array.
 */
const fromHexString = (hexString: string): Uint8Array =>
  Uint8Array.from(hexString.match(/.{1,2}/g)!.map((byte) => parseInt(byte, 16)));

/**
 * Generates an Ed25519 key pair.
 * @returns {{publicKey: string, secretKey: string}} The hex-encoded key pair.
 */
export const generateKeyPair = (): { publicKey: string, secretKey: string } => {
  const keyPair = nacl.sign.keyPair();
  return {
    publicKey: toHexString(keyPair.publicKey),
    secretKey: toHexString(keyPair.secretKey),
  };
};

/**
 * Hashes data using SHA-256.
 * @param {string} data The string data to hash.
 * @returns {string} The SHA-256 hash.
 */
export const hash = (data: string): string => {
  return sha256(data);
};

/**
 * Signs a message hash with a secret key.
 * @param {string} messageHash The hash of the message to sign.
 * @param {string} secretKey The hex-encoded secret key.
 * @returns {string} The hex-encoded signature.
 */
export const sign = (messageHash: string, secretKey: string): string => {
  const signature = nacl.sign.detached(
    fromHexString(messageHash),
    fromHexString(secretKey)
  );
  return toHexString(signature);
};

/**
 * Verifies a signature.
 * @param {string} messageHash The hash of the message that was signed.
 * @param {string} signature The hex-encoded signature.
 * @param {string} publicKey The hex-encoded public key.
 * @returns {boolean} True if the signature is valid, false otherwise.
 */
export const verify = (messageHash: string, signature: string, publicKey: string): boolean => {
  try {
    return nacl.sign.detached.verify(
      fromHexString(messageHash),
      fromHexString(signature),
      fromHexString(publicKey)
    );
  } catch (error) {
    console.error("Verification error:", error);
    return false;
  }
};

/**
 * Calculates the Merkle root of a list of transactions.
 * @param {{ hash: string }[]} transactions The list of transactions. Each should have a 'hash' property.
 * @returns {string} The Merkle root hash.
 */
export const calculateMerkleRoot = (transactions: { hash: string }[]): string => {
  if (transactions.length === 0) {
    return '0'.repeat(64);
  }
  let hashes = transactions.map((tx) => tx.hash);

  while (hashes.length > 1) {
    if (hashes.length % 2 !== 0) {
      hashes.push(hashes[hashes.length - 1]); // Duplicate the last hash if the list is odd
    }
    const newHashes: string[] = [];
    for (let i = 0; i < hashes.length; i += 2) {
      newHashes.push(hash(hashes[i] + hashes[i + 1]));
    }
    hashes = newHashes;
  }
  return hashes[0];
};

/**
 * A utility to get the hash of a transaction object.
 * @param {object} txObject The transaction object, excluding the signature.
 * @returns {string} The hash of the transaction data.
 */
export const getTransactionHash = (txObject: { from: string, to: string, amount: number, timestamp: number, type: string }): string => {
    const data = `${txObject.from}${txObject.to}${txObject.amount}${txObject.timestamp}${txObject.type}`;
    return hash(data);
}

/**
 * A utility to get the hash of a block header.
 * @param {object} blockHeader The block object, excluding hash and signature.
 * @returns {string} The hash of the block data.
 */
export const getBlockHash = (blockHeader: { index: number, previousHash: string, timestamp: number, merkleRoot: string, validator: string }): string => {
    const data = `${blockHeader.index}${blockHeader.previousHash}${blockHeader.timestamp}${blockHeader.merkleRoot}${blockHeader.validator}`;
    return hash(data);
}