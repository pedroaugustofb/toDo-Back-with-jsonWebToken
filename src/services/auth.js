import bcrypt from "bcryptjs";

export const createPasswordHash = async (password) =>{
    const Encrypted = await bcrypt.hash(password, 8);
    return Encrypted
}

export const checkPassword = (user, password) =>{
    return bcrypt.compare(password, user.password);
}