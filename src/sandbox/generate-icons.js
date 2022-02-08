const fs = require('fs');
const path = require('path');
const getDirName = require('path').dirname;

const pathToUsaIcons = '../../node_modules/uswds/dist/img/usa-icons';

function readIcons(dir) {
  const files = {};

  fs.readdirSync(path.join(__dirname, dir)).forEach(filename => {
    const data = fs.readFileSync(path.join(__dirname, dir, filename), {encoding: 'utf-8'});
    files[`src/img/usa-icons/${filename}`] = data;
  });

  
  writeFile(path.join(__dirname, 'icons.json'), JSON.stringify(files), () => {});

  return files;
}

function writeFile(path, contents, cb) {
  fs.mkdir(getDirName(path), { recursive: true}, function (err) {
    if (err) return cb(err);

    fs.writeFile(path, contents, cb);
  });
}

readIcons(pathToUsaIcons);
