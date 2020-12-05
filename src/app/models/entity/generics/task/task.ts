import { Constants } from 'src/app/models/utils/constants/constants';
import { ConnectionManagerService } from 'src/app/services/http/connectionManager/connection-manager.service';
import { Messages } from 'src/app/models/utils/toast-message/messages';
import { NavController } from '@ionic/angular';

export class Task {

    public task;

    constructor(task){
        this.task = task;
    }

    public store(connectionManager: ConnectionManagerService, form) {
        connectionManager.apiRequestPost(this.task, Constants.API_ROUTE.TASK.STORE).then(response => {
            if(response && response['state'] == 200) {
                form.reset();
                new Messages().showSuccessMessage('Chamado cadastrado.');
            }
        });
    }

    public update(connectionManager: ConnectionManagerService, navController: NavController) {
        connectionManager.apiRequestPut(this.task, Constants.API_ROUTE.TASK.UPDATE).then(response => {
            console.log(response);
            if(response && response['state'] == 200) {
                navController.back();
                new Messages().showSuccessMessage('Chamado atualizado.');
            }
        });
    }

    public findAllUsers(connectionManager: ConnectionManagerService) {
        return connectionManager.apiRequestGet(Constants.API_ROUTE.USER.FIND_ALL).then(response => {
            if(response && response['data']) {
                return response['data'];
            }
        });
    }

    public findAll(connectionManager: ConnectionManagerService) {
        return connectionManager.apiRequestGet(Constants.API_ROUTE.TASK.FIND_ALL).then(response => {
            if(response && response['data']) {
                return response['data'];
            }
        });
    }

    public findByUser(connectionManager: ConnectionManagerService, userId) {
        return connectionManager.apiRequestGet(Constants.API_ROUTE.TASK.FIND_BY_USER + userId).then(response => {
            if(response && response['data']) {
                return response['data'];
            }
        });
    }

}