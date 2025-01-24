import Folder from './services/Folder.js';
import File from './services/File.js';
import Functions from './services/Functions.js';

class Factory {
    constructor() {

    }

    getFolderService() {
        return new Folder();
    }

    getListFunctions() {
        return new Functions(
            this.getFolderService(),
        );
    }
}

export default Factory;