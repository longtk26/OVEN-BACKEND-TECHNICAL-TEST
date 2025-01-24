# Folder tree structure CLI Application

This is a **Command-Line Interface (CLI)** application designed for managing files and folders. The application provides an intuitive way to create, view, retrieve, search, and remove files and folders in a hierarchical structure. It also supports displaying folder structures and cleaning up directories when exiting the application.

## Videos

## Features

### 1. **View and Retrieve**
- **View Folder Structure**:
  - Displays the entire folder structure in a tree-like format.
- **Retrieve Files**:
  - Retrieve a specific file from a specified folder.
- **Retrieve Folders**:
  - Retrieve all sub folders and files in a folder path
  
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

1. **Clone github repository:
   - Ensure you have Node.js installed.
   - Clone repository
      ```
        git clone 
      ```

2. **Run the Application**:
   - Execute the application with the following command:
     ```bash
     npm run dev
     ```

3. **Navigate through Options**:
   - Follow the prompts to perform desired actions.
   - Enter folder paths in the format: `folder1/folder2`.

---

## Example Usage

- **Create a File**:
  - Input:
    ```
    Enter the folder path (example: folder1/folder2): folder1
    Enter the file name: myfile.txt
    Enter the file content: Hello, world!
    ```
  - Output:
    ```
    ====Creating a file====
    ====File created====
    ```

- **Search for a File**:
  - Input:
    ```
    Enter the file name: myfile.txt
    ```
  - Output:
    ```
    ====Searching a file====
    File found in folder: folder1
    ====File found====
    ```

- **Delete a Folder**:
  - Input:
    ```
    Enter the folder path: folder1
    ```
  - Output:
    ```
    ====Removing a folder====
    ====Folder removed====
    ```

---

## Code Structure

- **`Functions` Class**:
  - Implements core functionalities like viewing, creating, retrieving, searching, and deleting files or folders.

- **Services**:
  - `folderService`:
    - Handles operations related to folders.
  - `fileService`:
    - Handles operations related to files.

---

## Notes
- Ensure valid folder paths and file names when prompted.

---

