# CPSC5207
Major rebuild

Basic startup instructions

Ensure docker is running.

From the CPSC-5207 directory, move to the network subdirectory and run

./network.sh prereq

This will download all the necessary tools and images.

To start the network:

./network.sh up createChannel -ca -c cpsc5207 -s leveldb

This will start the network with one Orderer + CA, one Peer + CA for Org 1, and one Peer + CA for Org2 all using leveldb

To install the sample go chaincode:

./network.sh deployCC -ccn basic -ccp ../app/chaincode-go/ -ccl go -c cpsc5207
