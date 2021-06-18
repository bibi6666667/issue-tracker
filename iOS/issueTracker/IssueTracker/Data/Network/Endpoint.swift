import Foundation

enum API {
    static let githubLogin = URL(string: "https://github.com/login/oauth/authorize?client_id=5eba16bd99f4c0182a12")
    static let getAccessToken = "http://3.35.137.242:8080/login/github/iOS?code={code}"
}
