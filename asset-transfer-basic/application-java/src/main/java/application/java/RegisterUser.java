/*
SPDX-License-Identifier: Apache-2.0
*/

package application.java;

import java.nio.file.Paths;
import java.security.PrivateKey;
import java.util.Properties;
import java.util.Set;

import org.hyperledger.fabric.gateway.Wallet;
import org.hyperledger.fabric.gateway.Wallets;
import org.hyperledger.fabric.gateway.Identities;
import org.hyperledger.fabric.gateway.Identity;
import org.hyperledger.fabric.gateway.X509Identity;
import org.hyperledger.fabric.sdk.Enrollment;
import org.hyperledger.fabric.sdk.User;
import org.hyperledger.fabric.sdk.security.CryptoSuite;
import org.hyperledger.fabric.sdk.security.CryptoSuiteFactory;
import org.hyperledger.fabric_ca.sdk.HFCAClient;
import org.hyperledger.fabric_ca.sdk.RegistrationRequest;

public class RegisterUser {

	public static void main(String[] args) throws Exception {

		// Create a CA client for interacting with the CA.
		Properties props = new Properties();
		props.put("pemFile",
			"../../test-network/organizations/peerOrganizations/org1.cpsc5207.ca/ca/ca.org1.cpsc5207.ca-cert.pem");
		props.put("allowAllHostNames", "true");
		HFCAClient caClient = HFCAClient.createNewInstance("https://localhost:7054", props);
		CryptoSuite cryptoSuite = CryptoSuiteFactory.getDefault().getCryptoSuite();
		caClient.setCryptoSuite(cryptoSuite);

		// Create a wallet for managing identities
		Wallet wallet = Wallets.newFileSystemWallet(Paths.get("wallet"));

		// Check to see if we've already enrolled the user.
		if (wallet.get("javaAppUser") != null) {
			System.out.println("An identity for the user \"javaAppUser\" already exists in the wallet");
			return;
		}

		X509Identity adminIdentity = (X509Identity)wallet.get("admin");
		if (adminIdentity == null) {
			System.out.println("\"admin\" needs to be enrolled and added to the wallet first");
			return;
		}
		User admin = new User() {

			@Override
			public String getName() {
				return "admin";
			}

			@Override
			public Set<String> getRoles() {
				return null;
			}

			@Override
			public String getAccount() {
				return null;
			}

			@Override
			public String getAffiliation() {
				return "org1.department1";
			}

			@Override
			public Enrollment getEnrollment() {
				return new Enrollment() {

					@Override
					public PrivateKey getKey() {
						return adminIdentity.getPrivateKey();
					}

					@Override
					public String getCert() {
						return Identities.toPemString(adminIdentity.getCertificate());
					}
				};
			}

			@Override
			public String getMspId() {
				return "Org1MSP";
			}

		};

		// Register the user, enroll the user, and import the new identity into the wallet.
		RegistrationRequest registrationRequest = new RegistrationRequest("javaAppUser");
		registrationRequest.setAffiliation("org1.department1");
		registrationRequest.setEnrollmentID("javaAppUser");
		String enrollmentSecret = caClient.register(registrationRequest, admin);
		Enrollment enrollment = caClient.enroll("javaAppUser", enrollmentSecret);
		Identity user = Identities.newX509Identity("Org1MSP", enrollment);
		wallet.put("javaAppUser", user);
		System.out.println("Successfully enrolled user \"javaAppUser\" and imported it into the wallet");
	}

}
