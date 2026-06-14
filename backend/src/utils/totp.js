// server/src/utils/totp.js
const crypto = require('crypto')

const base32chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ234567'

function generateSecret() {
  const secretBytes = crypto.randomBytes(20)
  
  // Encode to Base32 for Authenticator Apps
  let secretBase32 = ''
  let value = 0
  let bits = 0
  for (let i = 0; i < secretBytes.length; i++) {
    value = (value << 8) | secretBytes[i]
    bits += 8
    while (bits >= 5) {
      secretBase32 += base32chars[(value >>> (bits - 5)) & 31]
      bits -= 5
    }
  }
  if (bits > 0) {
    secretBase32 += base32chars[(value << (5 - bits)) & 31]
  }

  return {
    hex: secretBytes.toString('hex'),
    base32: secretBase32
  }
}

function verifyTOTP(token, secretHex, window = 1) {
  const counter = Math.floor(Date.now() / 1000 / 30)
  
  for (let i = -window; i <= window; i++) {
    const buffer = Buffer.alloc(8)
    let tmp = counter + i
    for (let j = 7; j >= 0; j--) {
      buffer[j] = tmp & 0xff
      tmp = tmp >> 8
    }
    const key = Buffer.from(secretHex, 'hex')
    const hmac = crypto.createHmac('sha1', key).update(buffer).digest()
    const offset = hmac[hmac.length - 1] & 0xf
    const code = ((hmac[offset] & 0x7f) << 24) |
                 ((hmac[offset + 1] & 0xff) << 16) |
                 ((hmac[offset + 2] & 0xff) << 8) |
                 (hmac[offset + 3] & 0xff)
    const totp = (code % 1000000).toString().padStart(6, '0')
    if (totp === token) return true
  }
  return false
}

module.exports = {
  generateSecret,
  verifyTOTP
}
