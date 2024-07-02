package main

import (
	"fmt"
	"rest-api-go/web"
)

func main() {
	//Initialize setup for Org1
	cryptoPath := "../../network/organizations/peerOrganizations/org1.cpsc5207.ca"
	orgConfig := web.OrgSetup{
		OrgName:      "Org1",
		MSPID:        "Org1MSP",
		CertPath:     cryptoPath + "/users/User1@org1.cpsc5207.ca/msp/signcerts/cert.pem",
		KeyPath:      cryptoPath + "/users/User1@org1.cpsc5207.ca/msp/keystore/",
		TLSCertPath:  cryptoPath + "/peers/peer0.org1.cpsc5207.ca/tls/ca.crt",
		PeerEndpoint: "dns:///localhost:7051",
		GatewayPeer:  "peer0.org1.cpsc5207.ca",
	}

	orgSetup, err := web.Initialize(orgConfig)
	if err != nil {
		fmt.Println("Error initializing setup for Org1: ", err)
	}
	web.Serve(web.OrgSetup(*orgSetup))
}
