const fs = require('fs');
const util = require('./util');
const { execSync } = require('child_process');

const pathTestFile = 'cypress/integration';
const fileTestName = 'cytestion.spec.js';

const generateCode = () => {
  const date = new Date().toISOString().slice(0, 10);
  const fileTest = `${pathTestFile}/${date}/${fileTestName}`;

  if (!fs.existsSync(fileTest)) {
    fs.mkdirSync(`${pathTestFile}/${date}/`, { recursive: true });
    const rootFile = util.getRootTestFile();
    console.log(rootFile);
    fs.writeFileSync(fileTest, rootFile);
    execSync(`npm run test-file ${fileTest}`);
  } else {
    const contentTestFile = fs.readFileSync(fileTest).toString();
    const codeList = contentTestFile.split('//--CODE--');

    const header = codeList.shift();
    const footer = codeList.pop();

    let codeListProcessed = util.dataProcessor(codeList);
    let filesTmp = fs.readdirSync('tmp/').filter((file) => file !== '.gitkeep');

    //remove if ids was not visible
    codeListProcessed = codeListProcessed.filter((code) =>
      filesTmp.includes(code.actualId)
    );

    const filesTmpRead = util.readTmpFiles(codeListProcessed, filesTmp);

    let newCodes = [];
    codeListProcessed.forEach((code) => {
      if (util.canContinue(code, filesTmpRead)) {
      }
    });

    console.log(filesTmpRead);
    filesTmpRead.forEach((elem) => {
      console.log(elem.idUnique);
    });
    console.log(codeListProcessed);
  }
};

generateCode();
