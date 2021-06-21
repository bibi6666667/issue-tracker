import UIKit
//  상속받은 struct instane type
// generic으로 struct init

//protocol Car {
//
//    func drive() -> String {
//        return "Good"
//    }
//}
//
//struct Hyundai: Car {
//
//}
//
struct MyData<T> {
    var item: T
}
    
let integer = MyData<Int>(item: 1)
print(type(of: integer))

//protocol Fruit {
//    associatedtype T
//    var type: T { get set }
//}
//
//struct apple: Fruit {
//    var type: Int
//}
//
//struct banana: Fruit {
//    var type: Float
//}
//
//
//
//protocol SomeProtocol {
//    var mustBeSettable: Int { get set }
//    var doesNotNeedToBeSettable: Int { get }
//}
//
//struct test: SomeProtocol {
//    var mustBeSettable: Int
//    var doesNotNeedToBeSettable: Int {
//        return 3
//    }
//}
//
//let mouse = test(mustBeSettable: 0, doesNotNeedToBeSettable: 0)
//mouse.mustBeSettable

enum Path {
    case github
    case label(String?)
    case milestone(String?)
    
    var description: String {
        switch self {
        case .github: return "/login/github/iOS?code="
        case let .label(number):
            if number = 
        case let .milestone(number):
            
        }
    }
}

struct Endpoint {
    static let githubLogin = URL(string: "https://github.com/login/oauth/authorize?client_id=5eba16bd99f4c0182a12")
    
    var url: URL? {
        var components = URLComponents()
        components.host = "3.35.137.242:8080"
        components.scheme = "http"
        components.path = path.description
        
//            http://3.35.137.242:8080/milestone
    }
}
