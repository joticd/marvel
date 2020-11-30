import crypto from 'crypto';

export const hashKey = (ts:string, privateKey:string, publicKey:string):string =>{
    return crypto.createHash('md5').update(ts+privateKey+publicKey).digest("hex");
}