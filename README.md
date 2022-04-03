# my-azure-storage
An overly simplified API to work with Azure Storage Blob.

## Technology used
- Express
- Azure Storage Blob

## Deployed link
https://guarded-dawn-38804.herokuapp.com/

## Run server on local
### Install dependencies
```
yarn
```
#### Create `.env` file in the root folder and set these variables
```
PORT
SECRET_KEYS
AZURE_STORAGE_CONNECTION_STRING
```
### Run server
```
yarn start dev
```
## Usage
### Upload file
#### POST /blob/:containerName
* Parameters
	* `containerName`: See this as a folder where files will be stored
* Body: FormData
	*  `file`: The file will be uploaded
* Headers
	* `secret`: One of the secret keys specified in the environment variables
	* `content-type`: `multipart/form-data`
* Response
	* `url`: Direct URL of the uploaded file  

### Delete file
#### DELETE /blob/:containerName/:fileName
* Parameters
	* `containerName`: See this as a folder where files will be stored
	* `fileName`: Full name of the file to be deleted (with extension)
* Headers
	* `secret`: One of the secret keys specified in the environment variables
