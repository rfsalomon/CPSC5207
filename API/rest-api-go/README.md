# REST API

This is a simple REST server written in golang with endpoints for chaincode invoke and query.

  
## Usage

- Setup fabric network and deploy the asset_contract chaincode.

- cd into rest-api-go directory
- Download required dependencies using `go mod download`
- Run `go run main.go` to run the REST server

## Sending Requests

Invoke endpoint accepts POST requests with chaincode function and arguments. Query endpoint accepts get requests with chaincode function and arguments.

Sample chaincode invoke for the "createAsset" function. Response will contain transaction ID for a successful invoke.

``` sh
curl --request POST \
  --url http://localhost:3030/invoke \
  --header 'content-type: application/x-www-form-urlencoded' \
  --data = \
  --data channelid=cpsc5207 \
  --data chaincodeid=asset_contract \
  --data function=createAsset \
  --data args=asset<x> \
  --data args=hash value \
  --data args="A description of the asset" \
  --data args=Owner \
  --data args=Assignee
```
Sample chaincode query for getting asset details.

``` sh
curl --request GET \
  --url 'http://localhost:3030/query?channelid=cpsc5207&chaincodeid=asset_contract&function=ReadAsset&args=asset1' 
  ```
