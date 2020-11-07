import { Security } from '../security/security';

export class Session {

    public static getSessionItem(key: string) {
        try {
            var sessionObject = sessionStorage.getItem(key);
            var sessionObjectDecrypt = Security.decryptObject(sessionObject);
            return sessionObjectDecrypt;
        } catch (error) {
            return null;
        }
    }

    public static setSessionItem(key: string, value: any) {
        sessionStorage.setItem(key, Security.encryptObject(value));
    }

    public static sessionContains(key: string) {
        if (sessionStorage.getItem(key)) {
            return true;
        } else {
            return false;
        }
    }

    public static destroySessionItem(key: string) {
        sessionStorage.removeItem(key);
    }

    public static destroySession() {
        sessionStorage.clear();
    }

}