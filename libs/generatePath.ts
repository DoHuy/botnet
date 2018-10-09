const path = require('path');

/**
 * tra ve thu muc dich tuong ung phuc vu cho viec doc ghi du lieu
 * @param currentPath
 * @param destinationFolder
 * @param filename
 */
export function generatePath(currentPath, destinationFolder, filename?:null) {
    destinationFolder = filename==null?destinationFolder:`${destinationFolder}/${filename}`;
    return path.relative( currentPath,  destinationFolder);
}

