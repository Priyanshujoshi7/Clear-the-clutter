import fs from 'fs/promises';
import path from 'path';

const basepath = "D:\\frontend\\backend\\js for backend";

async function organizeFiles() {
    try {
        let files = await fs.readdir(basepath);

        for (const item of files) {
            console.log("Running for", item);
            let ext = item.split(".").pop();
            if (ext !== "js" && ext !== "json" && item.split(".").length > 1) {
                const extDir = path.join(basepath, ext);

                try {
                    await fs.access(extDir); // Check if directory exists
                } catch (error) {
                    // Directory does not exist, create it
                    await fs.mkdir(extDir, { recursive: true });
                }

                // Move the file to the new directory
                await fs.rename(path.join(basepath, item), path.join(extDir, item));
            }
        }
    } catch (error) {
        console.error("Error processing files:", error);
    }
}

organizeFiles();
