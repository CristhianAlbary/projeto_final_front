export class ArrayUtils {

    constructor(){}

    public static rmDuplicateValues(array: Array<any>, key: string): Array<any> {
        let newArray = {};
        return array.filter((element) => {
            if(element[key] in newArray) {
                return false;
            } else {
                newArray[element[key]] = true;
                return true;
            }
        });
    }

    public static arrayFilter(array: Array<any>, key: string, value: any): Array<any> {
        return array.filter((element) => {
            return element[key] == value;
        });
    }

}