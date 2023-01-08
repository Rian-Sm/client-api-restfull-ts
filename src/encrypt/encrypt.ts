import crypto from "crypto";

export const EncriptClient = {
  salt: undefined as unknown as string,

  encryptHash(password: string) {
    this.salt = process.env.SALT || "Zm9jdXMgdGV4dGls";
    return crypto
      .pbkdf2Sync(password, this.salt, 1000, 64, `sha512`)
      .toString(`hex`);
  },

  encryptHashValid(password: string, hashbd: string) {
    this.salt = process.env.SALT || "Zm9jdXMgdGV4dGls";
    const hash = crypto
      .pbkdf2Sync(password, this.salt, 1000, 64, `sha512`)
      .toString(`hex`);
    return hashbd === hash;
  },
};
