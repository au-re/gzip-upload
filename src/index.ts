#!/usr/bin/env node

import chalk from "chalk";
import figlet from "figlet";
import fs from "fs";
import path from "path";
import program from "commander";
import { Storage } from "@google-cloud/storage";

import { version } from "../package.json";

program
  .version(version)
  .description("A simple CLI to upload folders to Cloud Storage")
  .option("-b, --bucketName", "Name of the bucket to upload to")
  .option("-k, --keyFilename", "Path to the service key file")
  .option("-s, --sourceFolder", "Folder to read from")
  .option("-t, --targetFolder", "Target folder in the bucket")
  .option("-C, --predefinedAcl", "Default Access Control Layer for all files uploaded")
  .parse(process.argv);

if (!process.argv.slice(2).length) {
  console.clear();
  console.log(chalk.blueBright(figlet.textSync("cloud-upload", { horizontalLayout: "fitted" })));
  program.outputHelp();
  process.exit();
}

const { bucketName, keyFilename, sourceFolder, targetFolder, predefinedAcl = "" } = program;

const storage = new Storage({
  keyFilename,
});

const bucket = storage.bucket(bucketName);
const promises: any = [];
let filesCounted = 0;
let uploadedFiles = 0;

async function asyncForEach(array: any, callback: any) {
  for (let index = 0; index < array.length; index++) {
    await callback(array[index], index, array);
  }
}

/**
 * traverse a directory and call an action for each file
 * @param sourceFolder
 * @param callback
 */
async function walkDir(sourceFolder: string, callback: any) {
  const files = fs.readdirSync(sourceFolder);

  await asyncForEach(files, async (file: any) => {
    const dirPath = path.join(sourceFolder, file);
    const isDirectory = fs.statSync(dirPath).isDirectory();

    // avoid overflowing memory for very large folders
    if (promises.length > 180) {
      await Promise.all(promises);
      promises.length = 0;
    }

    if (isDirectory) {
      await walkDir(dirPath, callback);
    } else {
      filesCounted += 1;
      console.clear();
      console.log(`${uploadedFiles}/${filesCounted}`);
      promises.push(callback(path.join(sourceFolder, file)));
    }
  });
}

/**
 * Create a read stream from a file and pipe its contents to a write stream to google cloud
 * @param filePath
 */
function uploadFile(filePath: string) {
  return new Promise((resolve, reject) => {
    const destinationPath = `${targetFolder}/${filePath.split("/").slice(1).join("/")}`;
    const targetFile = bucket.file(destinationPath);

    const outStream = targetFile.createWriteStream({
      predefinedAcl,
      gzip: true,
      contentType: "auto",
    });

    const readStream = fs.createReadStream(filePath);

    readStream
      .on("data", (chunk) => {
        outStream.write(chunk);
      })
      .on("error", (error: Error) => {
        reject(error);
      })
      .on("end", () => {
        outStream.end();
      });

    outStream
      .on("error", (error: Error) => {
        reject(error);
      })
      .on("finish", () => {
        uploadedFiles += 1;
        console.clear();
        console.log(`${uploadedFiles}/${filesCounted}`, "file uploaded to", destinationPath);
        resolve();
      });
  });
}

async function run() {
  try {
    await walkDir(sourceFolder, uploadFile);
  } catch (error) {
    console.log("error", error);
  }
}

run();
