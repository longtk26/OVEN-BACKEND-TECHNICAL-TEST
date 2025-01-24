# Folder Tree Structure CLI Application

This is a **Command-Line Interface (CLI)** application designed for managing files and folders. The application provides an intuitive way to create, view, retrieve, search, and remove files and folders in a hierarchical structure. It also supports displaying folder structures and cleaning up directories when exiting the application.

## Videos

## Features

### 1. **View and Retrieve**
- **View Folder Structure**:
  - Displays the entire folder structure in a tree-like format.
- **Retrieve Files**:
  - Retrieve a specific file from a specified folder.
- **Retrieve Folders**:
  - Retrieve all subfolders and files in a folder path.
  
### 2. **Search Functionality**
- **Search File**:
  - Search for a specific file by its name within the folder structure.
- **Search Folder**:
  - Search for a specific folder by its name within the folder structure.

### 3. **Create File or Folder**
- **Create File**:
  - Add a new file with custom content to a specified folder path.
  - **Prompts**:
    - Folder path (e.g., `folder1/folder2`).
    - File name.
    - File content.
- **Create Folder**:
  - Add a new folder to the folder structure.

### 4. **Delete Files or Folders**
- **Remove File**:
  - Delete a specific file from a folder.
  - **Prompts**:
    - Folder path (e.g., `folder1/folder2`).
    - File name.
- **Remove Folder**:
  - Delete a specific folder and all its contents.

### 5. **Exit the Application**
- **Clean Exit**:
  - Safely exits the application.
  - Deletes all folders in the output folder as part of cleanup.

---

## How to Use

1. **Clone GitHub Repository**:
   - Ensure you have Node.js installed.
   - Clone the repository:
      ```bash
      git clone https://github.com/longtk26/OVEN-BACKEND-TECHNICAL-TEST.git
      ```

2. **Run the Application**:
   - Navigate to the project directory and execute the application with the following command:
     ```bash
     npm run dev
     ```

3. **Navigate through Options**:
   - Follow the prompts to perform desired actions.

---

## Example Usage
- **View folder structure**:
  - Input:
    ```bash
    Enter your choice: 1
    ```
  - Output example:
    ```
    ====Viewing folder structure====
    └── routes
        ├── config
        │   └── index.txt
        └── services
            └── index.txt
    ====End of folder structure====
    ```
- **Create a Folder**:
  - Input:
    ```bash
    Enter your choice: 2
    Enter the folder name: folder1/folder2
    ```
  - Output:
    ```bash
    ====Creating a folder====
    Enter the folder name: routes/config
      └── routes
          └── config
    ====Folder created====
    ```

- **Search for a File**:
  - Input:
    ```bash
    Enter your choice: 8
    Enter the file name: index.txt
    ```
  - Output:
    ```bash
    ====Searching a file====
    Enter the file name: index.txt
    File "index.txt" found in the following folders:
    File in folder: /root/interview/OVEN/src/output/routes/config, File: index.txt
    ====File found====
    ```

- **Delete a Folder**:
  - Input:
    ```bash
    Enter your choice: 7
    Enter the folder path: folder1/folder2
    ```
  - Output:
    ```bash
    ====Removing a folder====
    Enter the folder path: routes/config
    Folder "routes/config" removed successfully.
    └── routes
    ====Folder removed====
    ```

---

## Code Structure

### **Core Components**

- **`Functions` Class**:
  - Implements core functionalities like viewing, creating, retrieving, searching, and deleting files or folders.

- **Services**:
  - `folderService`:
    - Handles operations related to folders and files, including creating, deleting, and displaying folder structures.

- **File Factory**:
  - **Purpose**:
    - Provides a centralized mechanism to manage file creation and manipulation.
  - **Responsibilities**:
    - Abstracts the process of file creation and ensures all file types are handled consistently.
    - Includes logic for initializing files with default or user-specified content.
    - Plays a crucial role in decoupling file operations from higher-level services.

---

