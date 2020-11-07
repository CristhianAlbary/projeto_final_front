import { ConnectionManagerService } from 'src/app/services/http/connectionManager/connection-manager.service';

export class Filter {

    public static connectionManager: ConnectionManagerService;

    public static filterByStatus(collection, requiredStatus) {
        var filter = [];
        collection.forEach(element => {
            if (element.status == requiredStatus) {
                filter.push(element);
            }
        });
        return filter;
    }

    public static filterByLocalParamView(event, collection, keyFilter, statusOption) {
        var filter = [];
        let names: Array<any> = new Array<any>();
        if (collection) {
            if (collection.length >= 1) {
                collection.forEach(element => {
                    names.push(element);
                });
            }
        }
        const valCollection = event.target.value;
        if (valCollection && valCollection.trim() != '') {
            filter = names.filter((item) => {
                return (item[keyFilter].toLowerCase().indexOf(valCollection.toLowerCase()) > -1);
            });
        } else {
            statusOption != 'T' ? filter = Filter.filterByStatus(collection, statusOption) : filter = collection;
            return filter;
        }
        return filter;
    }

}