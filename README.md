# CPSC5207

## Term Project Report submitted to Dr. Khalil Abuosba in partial fulfillment of the requirements of the Master’s Course in Introduction to Cloud Computing (CPSC-5207) – Spring 2024

## Group 3
### Yinfeng Chen
### Krupa Kadecha
### Roberto Salomon

## Basic startup instructions

- Ensure docker is running.

- From the CPSC5207 directory, move to the network subdirectory and run

./network.sh prereq

This will download all the necessary tools and images.

## To start the network:

./network.sh up createChannel -ca -c cpsc5207 -s leveldb

This will start the network with one Orderer + CA, one Peer + CA for Org 1, and one Peer + CA for Org2 all using leveldb

## To install the go chaincode:

./network.sh deployCC -ccn asset_contract -ccp ../app/chaincode-go/ -ccl go -c cpsc5207

## Once the chaincode is installed, cd into the API/rest-api-go directory and run

go mod download

and then

go run main.go

Code based on the Hyperledger Fabric foundation test network project.
