const fs = require('fs-extra');
const directoryRename = require('./directoryRename');
const fileRename = require('./fileRename');

module.exports = (transaction) => {
  const rename = async (previousPath, newPath) => {
    if(await fs.exists(previousPath)) {
      const stats = await fs.stat(previousPath);
      if(stats.isDirectory()) {
        return directoryRename(previousPath, newPath);
      }
      else {
        return fileRename(previousPath, newPath);
      }
    }
    else {
      throw new Error(`Attempted to rename ${previousPath} to ${newPath}, however the former path does not exist!`)
    }
  }

  return rename;
}
