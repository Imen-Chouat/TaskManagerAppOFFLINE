import * as Crypto from 'expo-crypto';
import { CryptoDigestAlgorithm } from 'expo-crypto';
import dataBaseService from './dataBaseService';
import * as jwt from 'expo-jwt' ;
import * as SecureStorage from 'expo-secure-store';
const SECRET = "drtfyuiopmpoiuytresrdtfgyujikolp";
const salt = 8 ;

const generateTokens = async (id ,name,email) => {
    const timestamp = Date.now().toString();
    let raw = id + name +email + timestamp + SECRET;
    const token = await Crypto.digestStringAsync(
        Crypto.CryptoDigestAlgorithm.SHA256,
        raw
    );
    raw = id + email +name + SECRET;
    const refreshToken = await Crypto.digestStringAsync(CryptoDigestAlgorithm.SHA256 , raw);
    return {token,refreshToken};
}

const validateToken = async ()=>{
    try {
        const token = SecureStorage.getItemAsync("token");
        return token ? true : false ;
    } catch (error) {
        console.error("rror verifying the token validity : ",error);
        return null;
    }
}

const hashPassword = async (password) => {
    return await Crypto.digestStringAsync(
        CryptoDigestAlgorithm.SHA256 ,
        password + salt
    );
}
const checkPassword  = async (password,id) => {
    let hashed = await hashPassword(password);
    return (await dataBaseService.checkPassword(id,hashed));
}

const saveTokens =  async (token,refrechToken) => {
    await SecureStorage.setItemAsync("token",JSON.stringify(token));
    await SecureStorage.setItemAsync("refrechToken",JSON.stringify(refrechToken));
} 

const getTokenStored = async () => {
    const tok = await SecureStorage.getItemAsync("token");
    const refrechTok = await SecureStorage.getItemAsync("refreshToken");
    const token = JSON.parse(tok);
    const refrechToken = JSON.parse(refrechTok);
    return {token,refrechToken};
}

export default {
    generateTokens ,
    validateToken ,
    hashPassword ,
    checkPassword ,
    saveTokens ,
    getTokenStored ,
};