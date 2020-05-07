# cloud upload

This utility library facilitates uploading folders to google cloud storage.

## Usage

options

|param|description |
|---|---|
|bucketName| name of the bucket on google cloud to upload to |
|sourceFolder|folder to read files from|
|targetFolder|folder (in the bucket) to write files to. The folder is created if it doesn't exist|
|predefinedAcl|what access control should the file receive, e.g. publicRead|
|keyFilename| name of the serviceKey file, you need this file |

example

```sh
cloud-upload  --bucketName test.example.com --keyFilename ./keyfile.json --sourceFolder lib --targetFolder my-project --predefinedAcl publicAccess
```
