package main

import (
	"bufio"
	"fmt"
	"os"
	"os/signal"
	"rest-api-go/web"
	"syscall"
)

func waitForKeypress(shutdownChan chan os.Signal) {
	bufio.NewReader(os.Stdin).ReadBytes('\n') // Wait for Enter key
	shutdownChan <- syscall.SIGTERM           // Send a SIGTERM to shutdownChan
}

func main() {
	// Initialize setup for Org1
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
		return
	}

	// Create a channel to listen for an interrupt or termination signal
	shutdownChan := make(chan os.Signal, 1)
	signal.Notify(shutdownChan, os.Interrupt, syscall.SIGTERM)

	// Start the web server in a goroutine
	go func() {
		web.Serve(web.OrgSetup(*orgSetup))
	}()

	// Start a goroutine that waits for a key press to initiate shutdown
	go waitForKeypress(shutdownChan)

	// Wait for a shutdown signal
	<-shutdownChan
	fmt.Println("Shutting down...")
	// Perform any cleanup and shutdown tasks here
}
