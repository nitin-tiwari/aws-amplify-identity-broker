# AWS Amplify Identity Broker: code sample

__DISCLAIMER:__ _This project is a code sample provided as an illustration of how to achieve and identity broker and SSO on top of Amazon Cognito. Doing this provides extra flexibility at the price of more responsibility on customer side (see section "Comparison with the Amazon Cognito Hosted UI" for a visual comparison of the responsibility shift). Most customers should use the  [Amazon Cognito hosted UI](https://docs.aws.amazon.com/cognito/latest/developerguide/cognito-user-pools-app-integration.html) as a production ready solution. If you decide to use this project in production make sure you have engineering resources to maintain it as well as expertise to keep it secure._

This project demonstrates how to build a login application to authenticate several websites and mobile apps. It is based on [AWS Amplify](https://aws.amazon.com/amplify/) and [Amazon Cognito](https://aws.amazon.com/cognito/). Authentication is based on standard JWT token and can be integrated with any application supporting Oauth2/OIDC.

![Short Demo](Documentation/Images/broker-demo.gif "Short Demo")

__Current features are:__

* login flows: sign-in, sign-up, forgot password, reset-password ...
* central SSO
* is a __standard OIDC Identity Provider__
* 100% UI customizable (fork the project)
* i18n : _languages in this demo: English and French_
* Social login federation: _Facebook, Twitter, Amazon, Google logins_
* Corporate federation: _SAML_ and _OIDC (JWT token)_
* MFA : _SMS, OTP_
* PKCE and Implicit Oauth2 flows : _for secured web and mobile application login_
* deep customization of flows
* Migration helper (transparent migration from an existing user base to this project)
* account setting page with various customer attributes
* SSO dashboard (listing apps)
* consent approbation

This is a simplified view of the scope of the project (what this repository is about):

![Projet Scope Image](Documentation/Images/SimplifiedProjectScope.png "Simplified Project Scope")

## Live demo

You can sign-up, sign-in, try SSO from any of these two client application demos:

* Website 1 : https://master.dv7odw7xb73ou.amplifyapp.com _(this could be __myapp1.yourcompany.com__)_
* Website 2 : https://master.dgt79y8acfq6b.amplifyapp.com _(this could be __www.yoursubsidiary.com__ or __myapp2.yourcompany.com__)_

In a real use case, your user will only go to the broker from a client website or app, but for reference the Broker demo url itself is:

* https://master.dw8p5s05jola3.amplifyapp.com _(this could be __login.yourcompany.com__)_

> __Demo Credentials__
> 
> For the main app you can sign-up to create your own account (_we don't use emails and phone numbers for anything else than the demo_)
> - AWS SSO SAML Demo User Credentials: __Username:__ demouser __Password:__ &7P4X^rd5fJVfd&h5h
> - OIDC Demo User Credentials: __Username:__ demo __Password:__ P@ssw0rd
> - Social login: use an account of your own

See [client demo code repository](https://github.com/awslabs/aws-amplify-identity-broker-client)

## Documentation

- __[User Documentation](Documentation/UserDocumentation.md)__ : Explains, how to deploy, how to customize the broker, how to migrate from your existing user pool system.
- __[Client Developer Documentation](Documentation/ClientDeveloperDocumentation.md)__ : Explains how to integrate the broker in your website or mobile application.
- __[Developer Documentation](Documentation/DeveloperDocumentation.md)__ : Documentation for the contributor of this project: _PR are welcome !_

### Comparison with the Amazon Cognito Hosted UI

<details>
  <summary>Click to expand!</summary>
  
  This project is similar to the [Amazon Cognito hosted UI](https://docs.aws.amazon.com/cognito/latest/developerguide/cognito-user-pools-app-integration.html) by many aspects. Here is the list of similarities and differences.

  __Similarities__

  * both expose similar APIs : they are standard OIDC identity provider (with [few exceptions for the current project](Documentation/UserDocumentation.md#differences-with-the-oidc-standard))
  * feature scope is similar (but this project has more features)
  * both require very low effort to deploy
  * both are managed within the AWS account of the customer

  __Differences__

  * The Hosted UI is managed, you don’t have access to the code or deployment infrastructure. This project is a code project with an simplified deployment system into a Serverless infrastructure you control.
  * This project can be customized deeply. UI, languages, specific behaviors (depending on IP address, link, ...). Again since you have access to the code you can do whatever you want with it
  * This project comes with some missing feature of the Hosted UI: i18n, full CSS, JS customization, consent approbation
  * This project diverge a bit here and there of standard OAuth flows (because of some current restrictions). The limitation is in the way Oauth scope are injected in tokens and some oauth2 API are handled (see [User Documentation](Documentation/UserDocumentation.md#differences-with-the-oidc-standard)). _We are working on it to fill the gap._

  __VISUAL COMPARISON__

  with the Amplify Identity Broker:

  ![Without Hosted UI](Documentation/Images/HostedUIByPass.png "Without Hosted UI")

  with Hosted UI only:

  ![With Hosted UI](Documentation/Images/HostedUIClassic.png "With Hosted UI")

</details>


## Architecture

The project architecture is the following:

![Projet Architecture Image](Documentation/Images/DeployedArchitecture.png "Projet Architecture")

See __[Developer Documentation](Documentation/DeveloperDocumentation.md)__ to see more detailed information on every component. 

## Contributing

Your contribution is welcome, see [CONTRIBUTING](CONTRIBUTING.md) for ideas of PR and for contribution guidelines.

## Security

See [Security Issue Notifications](CONTRIBUTING.md#security-issue-notifications) for more information.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file.
