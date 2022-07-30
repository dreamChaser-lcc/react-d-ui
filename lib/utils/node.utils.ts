const fs = require('fs');
const path = require('path');
const getScriptsInfo =async () => {
  const resolvePath = path.resolve(__dirname,'../../package.json');
  console.log(resolvePath);
  const res =await fs.readFile(resolvePath, 'utf-8', (err, dataStr) => {
    if (err) {
      return console.log('文件读取失败' + err.message);
    } else {
      const {devDependencies,dependencies} = JSON.parse(dataStr);
      return {devDependencies,dependencies} ;
    }
  });
  return res
};
getScriptsInfo();
