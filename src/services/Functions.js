class Functions {
    constructor(folderService) {
        this.folderService = folderService;
    }
    viewFolderStructure(rl, app) {
        console.log('====Viewing folder structure====');
        this.folderService.viewFolderStructure();
        console.log('====End of folder structure====');
        rl.close();
        app.run();
    }
    createFile(rl, app) {
        console.log('====Creating a file====');
        rl.question('Enter the folder path (example: folder1/folder2): ', (folderPath) => {
            rl.question('Enter the file name: ', (fileName) => {
                rl.question('Enter the file content: ', (content) => {
                    this.folderService.addFile(folderPath, fileName, content);
                    console.log("====File created====");
                    rl.close();
                    app.run();
                });
            });
        });
    }
    retrieveFiles(rl, app) {
        console.log('====Retrieving files====');
        rl.question('Enter the folder path: ', (folderPath) => {
            rl.question('Enter the file name: ', (fileName) => {
                this.folderService.retrieveFiles(folderPath, fileName);
                console.log("====File retrieved====");
                rl.close();
                app.run();
            });
        });
    }
    retrieveFolders(rl, app) {
        console.log('====Retrieving folders====');
        rl.question('Enter the folder path: ', (folderPath) => {
            this.folderService.retrieveFolders(folderPath);
            console.log("====Folders retrieved====");
            rl.close();
            app.run();
        });
    }
    createFolder(rl, app) {
        console.log('====Creating a folder====');
        rl.question('Enter the folder name: ', (folderName) => {
            this.folderService.addFolder(folderName);
            console.log("====Folder created====");
            rl.close();
            app.run();
        });
    }
    removeFile(rl, app) {
        console.log('====Removing a file====');
        rl.question('Enter the path (example: folder1/folder2): ', (folderPath) => {
            rl.question('Enter the file name: ', (fileName) => {
                this.folderService.removeFile(folderPath, fileName);
                console.log("====File removed====");
                rl.close();
                app.run();
            });
        });
    }
    removeFolder(rl, app) {
        console.log('====Removing a folder====');
        rl.question('Enter the folder path: ', (folderPath) => {
            this.folderService.removeFolder(folderPath);
            console.log("====Folder removed====");
            rl.close();
            app.run();
        });
    }
    searchFile(rl, app) {
        console.log('====Searching a file====');
        rl.question('Enter the file name: ', (fileName) => {
           this.folderService.searchFile(fileName);
           console.log("====File found====");
            rl.close();
            app.run();
        });
    }

    searchFolder(rl, app) {
        console.log('====Searching a folder====');
        rl.question('Enter the folder name: ', (folderName) => {
            this.folderService.searchFolder(folderName);
            console.log("====Folder found====");
            rl.close();
            app.run();
        });
    }

    exit(rl, app) {
        console.log('Exiting the application. Goodbye!');
        // Remove all folder in output folder
        this.folderService.removeAllFolders();
        rl.close();
    }
}

export default Functions;