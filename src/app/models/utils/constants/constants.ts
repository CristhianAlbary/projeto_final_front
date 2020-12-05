export class Constants {

    constructor(){}

    public static APP = {
        VERSION: 'versão 1.0.0'
    }

    public static API_ROUTE = {
        SERVER: 'http://localhost:8030/api/',
        LOGIN: 'auth/login',
        USER: {
            CREATE: 'user/store',
            FIND_ALL: 'user/find/all',
        },
        MESSAGES: {
            CONVERSATION: 'messages/conversation/'
        },
        TASK: {
            STORE: "task/store",
            UPDATE: "task/update",
            FIND_ALL: "task/find/all",
            FIND_BY_USER: "task/find/by/user/",
            REPORT: "report/get/pdf/",
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