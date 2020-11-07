import { Session } from '../session/session';

export class FileSystem {

    constructor() { }

    public static getMultipleFiles(event) {
        let fileName = '';
        let files = [];
        if (event.target.files && event.target.files.length >= 1) {
            for (let i = 0; i < event.target.files.length; i++) {
                var fileObject = {
                    'type': null,
                    'name': null,
                    'file': null,
                    'fileName': null
                }
                var file = event.target.files[i];
                fileObject.name = file['name'];
                fileObject.type = file.type.split('/')[1].split('+')[0];
                fileName == '' ? fileName = '[ ' + file['name'] + ' ]' : fileName = fileName + ' - ' + '[ ' + file['name'] + ' ]';
                let reader = new FileReader();

                reader.onload = (e: any) => {
                    file = e.target.result
                };

                reader.readAsDataURL(file);
                setTimeout(() => {
                    fileObject.file = file.split(',')[1];
                    fileObject.fileName = fileName;
                    files.push(fileObject);
                    Session.setSessionItem(name, files);
                }, 150);
            }
        }
    }

    public static getSingleFile(event, name) {
        let fileName = '';
        if (event.target.files[0]) {
            var fileObject = {
                'type': null,
                'name': null,
                'file': null,
                'fileName': ''
            }
            var file = event.target.files[0];
            fileObject.name = file['name'];
            fileObject.type = file.type.split('/')[1].split('+')[0];
            fileName = file['name'];
            let reader = new FileReader();

            reader.onload = (e: any) => {
                file = e.target.result
            };

            reader.readAsDataURL(file);
            setTimeout(() => {
                fileObject.file = file.split(',')[1];
                fileObject.fileName = fileName;
                Session.setSessionItem(name, fileObject);
            }, 150);
        }
    }

}