export class Constants {

    constructor(){}

    public static APP = {
        VERSION: 'versão 1.0.0'
    }

    public static API_ROUTE = {
        SERVER: 'http://192.168.0.13:8000/api/',
        // SERVER: 'http://172.16.208.210:8000/api/',
        LOGIN: 'auth/login',
        USER: {
            CREATE: 'user/store'
        }
    }

    public static CLASS_NAME = {
        ProductWebSocket: 'ProductNotify',
        ClientWebSocket: 'ClientList',
        UserConnWebSocket: 'WebSocketUserConn'
    }

    public static ERROR_KEY = {
        LOGIN: ['login']
    }

    public static MESSAGES = {
        REGISTER: {
            SUCCESS: 'Cadastro realizado!'
        }
    }

    public static OBJECT_KEYS = {
        USER: [
            'nome',
            'login',
            'password',
            'status',
            'tiop'
        ],
        LOGIN: [
            'login'
        ]
    }

}