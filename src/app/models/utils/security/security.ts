import * as IonSecurity from 'crypto-js';

export class Security {

    private static cryptoOptions = {
        'secretKey': '00110000 00110010 00110000 00110010 01101111 01100100 01100001 01100011 01100001 01110100 01100001 01100111 01101001 01110011'
    }

    constructor() { }

    public static encryptObject(item) {
        return IonSecurity.AES.encrypt(JSON.stringify(item), this.cryptoOptions['secretKey'], 256);
    }

    public static decryptObject(item) {
        return JSON.parse(IonSecurity.enc.Utf8.stringify(IonSecurity.AES.decrypt(item, this.cryptoOptions['secretKey'])));
    }

}