import Foundation
import Alamofire

class LoginManager {
    static func loginPost(_ url: URL?) {
        guard let url = url else { return }
        UIApplication.shared.open(url)
    }
    
    static func requestAccessToken(_ code:String) {
        guard let url = URL(string: API.getAccessToken+code) else { return }
        AF.request(url, method: .get)
            .responseJSON { response in
                dump(response)
//            .responseDecodable(of: DTO<LoginDTO>.self) { response in
                switch response.result {
                case .success(let loginData):
                    LoginObserver.validLoginTry.post(object: loginData)
                case .failure(let error):
                    print(error)
                    LoginObserver.InvalidLoginTry.post(object: error)
                }
            }
    }
}
