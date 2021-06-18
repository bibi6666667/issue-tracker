import UIKit
import AuthenticationServices
import RxSwift
import RxCocoa
import NSObject_Rx

class LoginViewController: UIViewController {

    @IBOutlet weak var appleSignInButton: UIStackView!
    @IBOutlet weak var gitbubSignInButton: UIButton!
    override func viewDidLoad() {
        super.viewDidLoad()
        setupProviderLoginView()
        setupButtonAction()
    }
    
    func setupProviderLoginView() {
      let authorizationButton = ASAuthorizationAppleIDButton()
      authorizationButton.addTarget(self, action: #selector(handleAuthorizationAppleIDButtonPress), for: .touchUpInside)
      self.appleSignInButton.addArrangedSubview(authorizationButton)
    }
    
    @objc
    func handleAuthorizationAppleIDButtonPress() {
      let appleIDProvider = ASAuthorizationAppleIDProvider()
      let request = appleIDProvider.createRequest()
      request.requestedScopes = [.fullName, .email]
      let authorizationController = ASAuthorizationController(authorizationRequests: [request])
      authorizationController.delegate = self
      authorizationController.presentationContextProvider = self
      authorizationController.performRequests()
    }
    
    private func setupButtonAction() {
        setupGitbubSignInButton()
    }
    
    
    private func setupGitbubSignInButton() {
        gitbubSignInButton.rx.tap
            .subscribe(onNext: { [weak self] _ in
                LoginManager.loginPost(API.githubLogin)
                self?.moveToRedirectionVC()
            }).disposed(by: rx.disposeBag)
    }
    
    private func moveToRedirectionVC() {
        guard let redirectionVC = storyboard?.instantiateViewController(withIdentifier: ViewControllerID.redirect) else { return }
        redirectionVC.modalPresentationStyle = .fullScreen
        present(redirectionVC, animated: true, completion: nil)
    }
    
    private func moveToNextVC() {
        guard let issueVC = storyboard?.instantiateViewController(withIdentifier: ViewControllerID.blue) else { return }
        issueVC.modalPresentationStyle = .fullScreen
        present(issueVC, animated: true, completion: nil)
    }
}

extension LoginViewController: ASAuthorizationControllerDelegate {
  func authorizationController(controller: ASAuthorizationController, didCompleteWithAuthorization authorization: ASAuthorization) {
    if let appleIDCredential = authorization.credential as? ASAuthorizationAppleIDCredential {
        // Create an account in your system.
        let userIdentifier = appleIDCredential.user
        let userFirstName = appleIDCredential.fullName?.givenName
        let userLastName = appleIDCredential.fullName?.familyName
        let userEmail = appleIDCredential.email
        //Navigate to other view controller
    } else if let passwordCredential = authorization.credential as? ASPasswordCredential {
        // Sign in using an existing iCloud Keychain credential.
        let username = passwordCredential.user
        let password = passwordCredential.password
        
        //Navigate to other view controller
    }
  }
  
  func authorizationController(controller: ASAuthorizationController, didCompleteWithError error: Error) {
    // handle Error.
  }
}

extension LoginViewController: ASAuthorizationControllerPresentationContextProviding {
    func presentationAnchor(for controller: ASAuthorizationController) -> ASPresentationAnchor {
        return self.view.window!
    }
}
