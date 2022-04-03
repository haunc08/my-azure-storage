# my-azure-storage
An overly simplified API to work with Azure Storage Blob.

## Technology used
- Express
- Azure Storage Blob

## Run server on local
### Install dependencies
```
yarn
```
#### Create `.env` file in the root folder and set these variables
```
SECRET_KEYS
AZURE_STORAGE_CONNECTION_STRING
```
Example:
```
SECRET_KEYS=EXAMPLE1_EXAMPLE2
AZURE_STORAGE_CONNECTION_STRING=DefaultEndpointsProtocol=https;AccountName=example;AccountKey=example;EndpointSuffix=example
```
### Run server
```
yarn start
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
