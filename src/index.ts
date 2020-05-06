import minimist from "minimist";
import request from "superagent";

import path from "path";
import fs, { ReadStream } from "fs";

// simple script that posts a folder to a server or cloud storage provider
// gzip-upload --folder xxx --remote xxx
// gzip-upload --folder yyy --serviceKey xxx

const argv = minimist(process.argv.slice(2));

const { remote, folder } = argv;

interface IFileContent {
  name: string;
  data: ReadStream;
}

function readFilesInFolder(folder: string): Promise<IFileContent[]> {
  return new Promise((resolve, reject) => {
    fs.readdir(folder, (err, files) => {
      if (err) reject(err);

      const fileContents: IFileContent[] = [];

      files.forEach((file) => {
        fileContents.push({
          name: file,
          data: fs.createReadStream(path.join(folder, file)),
        });
      });

      resolve(fileContents);
    });
  });
}

function postFile(remote: string, files: IFileContent[]) {
  const postRequest = request.post(remote);

  files.forEach((file) => {
    postRequest.attach(file.name, file.data);
  });

  return postRequest;
}

async function run() {
  const files = await readFilesInFolder(folder);
  await postFile(remote, files);
}

run();
