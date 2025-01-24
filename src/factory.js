import Folder from './services/Folder.js';
import File from './services/File.js';
import Functions from './services/Functions.js';

class Factory {
    constructor() {

    }

    getFolderService() {
        return new Folder();
    }

    getFileService() {
        return new File();
    }

    getListFunctions() {
        return new Functions(
            this.getFolderService(),
            this.getFileService()
        );
    }
}

export default Factory;