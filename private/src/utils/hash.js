import argon2 from "argon2";

export async function hashPassword(password) {
  return argon2.hash(password);
}

export async function comparePasswords(pass, password){
  return await argon2.verify(
    pass,
    password
  )
}