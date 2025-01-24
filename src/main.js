import Factory from './factory.js';
import readline from 'readline';

class CLIApplication {
    constructor() {
        this.factory = new Factory();
        this.functions = this.factory.getListFunctions();
        this.listFunctions = {
            1: this.functions.viewFolderStructure.bind(this.functions),
            2: this.functions.createFolder.bind(this.functions),
            3: this.functions.createFile.bind(this.functions),
            4: this.functions.retrieveFiles.bind(this.functions),
            5: this.functions.retrieveFolders.bind(this.functions),
            6: this.functions.removeFile.bind(this.functions),
            7: this.functions.removeFolder.bind(this.functions),
            8: this.functions.searchFile.bind(this.functions),
            9: this.functions.searchFolder.bind(this.functions),
            10: this.functions.exit.bind(this.functions)
        };
    }

    renderUI() {
        console.log('\n')
        console.log('1. View folder structure\n');
        console.log('2. Create a folder\n');
        console.log('3. Create a file\n');
        console.log('4. Retrieve files\n');
        console.log('5. Retrieve folders\n');
        console.log('6. Remove a file\n');
        console.log('7. Remove a folder\n');
        console.log('8. Search for a file\n');
        console.log('9. Search for a folder\n');
        console.log('10. Exit\n');
    }

    chooseOption() {
        const rl = readline.createInterface({
            input: process.stdin,
            output: process.stdout
        });

        rl.question('Enter your choice: ', (answer) => {
            const choice = parseInt(answer.trim(), 10); 
    
            if (isNaN(choice) || choice < 1 || choice > 10) {
                console.log('Invalid choice. Please enter a number between 1 and 6.');
                rl.close();
                this.run();
            } else {
                this.listFunctions[choice](rl, this);
            }
        });
    }

    run() {
        this.renderUI();
        this.chooseOption();
    }
}

const app = new CLIApplication();

console.log('==========Welcome to the CLI Application==========');
app.run();