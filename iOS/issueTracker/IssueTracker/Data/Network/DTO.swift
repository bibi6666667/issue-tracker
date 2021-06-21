import Foundation

struct DTO<T: Decodable>: Decodable {
    var data: T?
}

struct LoginDTO: Decodable {
    let jwt: String
    let data: User
    let type: String
}

struct User: Decodable {
    let id: Int
    let name: String
    let login_id: String
}
