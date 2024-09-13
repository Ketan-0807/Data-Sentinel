const fs = require('fs');
const path = require('path');
const notifier = require('node-notifier'); //throws the notification
const os = require('os');//OS Persmission

function searchFile(directory, filename) {
    fs.readdir(directory, { withFileTypes: true }, (err, files) => {
        if (err) {
            if (err.code === 'EPERM' || err.code === 'EACCES') {
                // its skips the some permissions issues 
                console.error(`Permission denied: ${directory}`);
            } else {
                console.error(`Error reading directory ${directory}:`, err);
            }
            return;
        }

        files.forEach(file => {
            const filePath = path.join(directory, file.name);
            if (file.isDirectory()) {
                // Recursively search subdirectories/repos from the system
                searchFile(filePath, filename);
            } else if (file.name === filename) {
                console.log(`File found at: ${filePath}`);


                // Send a notification to the user for the data found
                notifier.notify({
                    title: ' File Found',
                    message: `The file "${filename}" was found in your directories.\nDon't download it again.`,
                    sound: true, // Play system sound
                    wait: false
                });
            }
        });
    });
}

// Start searching from the root directory (e.g., C:\ for Windows\user\ketan) (C:\Users\ketan)
searchFile('C:\\', 'AnyDesk.exe');
