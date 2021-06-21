import Foundation

enum API {
    static let githubLogin = URL(string: "https://github.com/login/oauth/authorize?client_id=5eba16bd99f4c0182a12")
    static let getAccessToken = "http://3.35.137.242:8080/login/github/iOS?code="
}

enum Path {
    case github
    case label(String?)
    case milestone(String?)
    
}

//struct Endpoint {
//    static let githubLogin = URL(string: "https://github.com/login/oauth/authorize?client_id=5eba16bd99f4c0182a12")
//    
//    var url: URL? {
//        var components = URLComponents()
//        components.host = "3.35.137.242:8080"
//        components.scheme = "http"
//        components.path = path.description
//        
//            http://3.35.137.242:8080/milestone
//    }
//}
