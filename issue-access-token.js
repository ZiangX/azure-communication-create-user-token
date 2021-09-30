const { CommunicationIdentityClient } = require("@azure/communication-identity");

const main = async () => {
  console.log("Azure Communication Services - Access Tokens Quickstart");

  // Quickstart code goes here
  const connectionString =
    "endpoint=https://hausvalet-communication.communication.azure.com/;accesskey=jRp0EfDg5Dp99uDG5aRu9c8UJ9tuEy2qPU1Y8HlfRLi6xLNvCEfhxr/LGpck2OLYZdqAhkyDlLsd6oCpQT0jZw==";

  // Instantiate the identity client
  const identityClient = new CommunicationIdentityClient(connectionString);

  //   Store received identity with mapping to your application's users. For example, by storing them in your application server's database. The identity is required later to issue access tokens.
  let identityResponse = await identityClient.createUser();
  console.log(`\nCreated an identity with ID: ${identityResponse.communicationUserId}`);

  // Issue an access token with the "voip" scope for an identity
  let tokenResponse = await identityClient.getToken(identityResponse, ["chat"]);
  const { token, expiresOn } = tokenResponse;
  console.log(`\nIssued an access token with 'voip' scope that expires at ${expiresOn}:`);
  console.log(token);

  /*
      // Issue an identity and an access token with the "voip" scope for the new identity
      let identityTokenResponse = await identityClient.createUserAndToken(["voip"]);
      const { token, expiresOn, user } = identityTokenResponse;
      console.log(`\nCreated an identity with ID: ${user.communicationUserId}`);
      console.log(`\nIssued an access token with 'voip' scope that expires at ${expiresOn}:`);
      console.log(token);
   */

   /* 
      // Value of identityResponse represents the Azure Communication Services identity stored during identity creation and then used to issue the tokens being refreshed
      let refreshedTokenResponse = await identityClient.getToken(identityResponse, ["voip"]);
   */
};

main().catch((error) => {
  console.log("Encountered an error");
  console.log(error);
});
