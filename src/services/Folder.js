import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';
import File from './File.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

class Folder {
    constructor() {
        this.folders = [];
        this.files = []; // List of File objects
        this.folderPath = path.resolve(__dirname, '../output');
        this.foldersV2 = [];
        this.initOutputFolder();
    }

    initOutputFolder() {
        if (!fs.existsSync(this.folderPath)) {
            fs.mkdirSync(this.folderPath);
        }
    }

    addFile(pathInput, fileName, content) {
        // Check path validity
        let outputPath = path.join(this.folderPath, pathInput)
        const folders = pathInput.split('/');
        const folderName = folders[folders.length - 1];
        if (!fs.existsSync(outputPath)) {
            console.log(`Folder "${folderName}" does not exist.`);
            return;
        }

        // Check file existence
        outputPath = path.join(outputPath, fileName);
        if (fs.existsSync(outputPath)) {
            console.log(`File "${fileName}" already exists in the path.`);
            return;
        }

        // Add to in-memory structure
        const newFile = new File(fileName, content);
        this.files.push(newFile);
        const foundFolder = this.foldersV2.find(folder => folder.path === path.join(this.folderPath, pathInput));
        if (foundFolder) {
            foundFolder.listFiles.push(newFile);
        } else {
            console.log(`Folder "${folderName}" does not exist in the in-memory structure.`);
            return;
        }
        
        // Create the file in the output directory
        fs.writeFileSync(outputPath, content);

        this.viewFolderStructure();
    }


    removeFile(pathInput, fileName) {
        const outputPath = path.join(this.folderPath, pathInput, fileName);
        const folderName = pathInput.split('/').pop();

        if (!fs.existsSync(outputPath)) {
            console.log(`File "${fileName}" does not exist in the path.`);
            return;
        }
        
        // Remove from the in-memory structure
        const fileIndex = this.files.findIndex(file => file.name === fileName);
        this.files.splice(fileIndex, 1);
        const foundFolder = this.foldersV2.find(folder => folder.path === path.join(this.folderPath, pathInput));
        if (foundFolder) {
            const fileIndex = foundFolder.listFiles.findIndex(file => file.name === fileName);
            foundFolder.listFiles.splice(fileIndex, 1);
        } else {
            console.log(`Folder "${folderName}" does not exist in the in-memory structure.`);
            return;
        }

        // Check and remove from the file system
        fs.rmSync(outputPath);

        this.viewFolderStructure();
    }

    retrieveFiles(pathInput, fileName) {
        const outputPath = path.join(this.folderPath, pathInput, fileName);

        if (!fs.existsSync(outputPath)) {
            console.log(`File "${fileName}" does not exist in the path.`);
            return;
        }

        const folder = this.foldersV2.find(folder => folder.path === path.join(this.folderPath, pathInput));
        if (!folder) {
            console.log(`Folder "${pathInput}" does not exist.`);
            return;
        }
        const file = folder.listFiles.find(file => file.name === fileName);
        console.log(`File "${fileName}" found in folder "${pathInput}":`);
        console.log(`Content: ${file.content}`);
    }

    retrieveFolders(pathInput) {
        // Check path validity
        const outputPath = path.join(this.folderPath, pathInput);
        if (!fs.existsSync(outputPath)) {
            console.log(`Folder "${pathInput}" does not exist.`);
            return;
        }

        // Check if the folder is empty
        const items = fs.readdirSync(outputPath);
        if (items.length === 0) {
            console.log(`Folder "${pathInput}" is empty.`);
            return;
        }

        // List subfolders in the folder
        console.log(`Subfolders in folder "${pathInput}":`);
        items.forEach(item => {
            const itemPath = path.join(outputPath, item);
            const stats = fs.statSync(itemPath);
            if (stats.isDirectory()) {
                console.log(`Subfolder: ${item}`);
            }
        });

        // List the files in the folder
        let hasFiles = false;
        items.forEach((item, index) => {
            const itemPath = path.join(outputPath, item);
            const stats = fs.statSync(itemPath);
            if (stats.isFile()) {
                if (index === 0) {
                    console.log(`Files in folder "${pathInput}":`);
                    hasFiles = true;
                }
                const content = fs.readFileSync(itemPath, 'utf8');
                console.log(`File: ${item}, Content: ${content}`);
            }
        });
        if (!hasFiles) {
            console.log(`No files found in folder "${pathInput}".`);
        }
    }

    addFolder(folderPath) {
        /**
         * foldersV = [
         *  {
         *      name: 'folder1',
         *      path: 'folder1',
         *      listFiles: []
         *  }
         * ]
         */
        const folders = folderPath.split('/');
        let fullPath = this.folderPath;
        folders.forEach(folder => {
            const folderExists = this.foldersV2.some(folder => folder.name === folder);
            fullPath = path.join(fullPath, folder);
            if (!folderExists) {
                const newFolder = {
                    name: folder,
                    path: fullPath,
                    listFiles: []
                };
                this.foldersV2.push(newFolder);
            } 
        });

        // Create the folder in the output directory
        let output = this.folderPath;
        folders.forEach(folder => {
            output = path.join(output, folder);
            if (!fs.existsSync(output)) {
                fs.mkdirSync(output);
            }
        });

        this.viewFolderStructure();

    }

    removeFolder(folderPath) {
        const folderIndex = this.foldersV2.findIndex(folder => folder.path === path.join(this.folderPath, folderPath));
        if (folderIndex === -1) {
            console.log(`Folder "${folderPath}" does not exist in memory.`);
            return false;
        }

        // Remove from the in-memory structure
        this.foldersV2.splice(folderIndex, 1);

        // Check and remove from the file system
        const output = path.join(this.folderPath, folderPath);
        if (fs.existsSync(output)) {
            // Use recursive deletion for non-empty folders
            fs.rmSync(output, { recursive: true, force: true });
            console.log(`Folder "${folderPath}" removed successfully.`);
        } else {
            console.log(`Folder "${folderPath}" does not exist in the file system.`);
        }

        this.viewFolderStructure();

        return true;
    }

    viewFolderStructure() {
        const printTree = (dirPath, indent = '') => {
            const items = fs.readdirSync(dirPath, { withFileTypes: true }); // Đọc thư mục

            items.forEach((item, index) => {
                const isLast = index === items.length - 1;
                const prefix = isLast ? '└── ' : '├── ';
                console.log(indent + prefix + item.name);

                if (item.isDirectory()) {
                    const nextIndent = isLast ? indent + '    ' : indent + '│   ';
                    printTree(path.join(dirPath, item.name), nextIndent);
                }
            });
        };

        if (fs.existsSync(this.folderPath)) {
            printTree(this.folderPath); 
        } else {
            console.log('Folder ../output does not exist.');
        }
    }

    searchFolder(folderName) {
        const folders = this.foldersV2.filter(folder => folder.name.toLowerCase().includes(folderName.toLowerCase()));
    
        if (folders.length === 0) {
            console.log(`No folders found matching "${folderName}".`);
            return;
        }
    
        console.log(`Folders matching "${folderName}" found in the following paths:`);
        folders.forEach(folder => console.log(
            `Path: ${folder.path}, Name: ${folder.name}`
        ));
    }

    searchFile(fileName) {
        // Console.log folders that contain the file
        const folders = this.foldersV2.filter(folder => folder.listFiles.some(file => file.name === fileName));
        
        if (folders.length === 0) {
            console.log(`No folders found containing file "${fileName}".`);
            return;
        }
        
        console.log(`File "${fileName}" found in the following folders:`);
        folders.forEach(folder => console.log(
            `File in folder: ${folder.path}, File: ${fileName}`
        ))
    }

    removeAllFolders() {
        // Don't remove the output folder
        this.foldersV2.forEach(folder => {
            if (fs.existsSync(folder.path)) {
                fs.rmSync(folder.path, { recursive: true, force: true });
            }
        });
    }
}

export default Folder;