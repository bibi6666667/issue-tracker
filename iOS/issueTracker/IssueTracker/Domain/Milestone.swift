import Foundation

struct Milestone: Decodable {
    let id: Int
    var title: String
    var content: String
    var dueDate: String
    var openIssues: Int
    var closeIssues: Int
    var progress: Int
    
    enum CodingKeys: String, CodingKey {
        case id
        case title
        case content
        case dueDate = "due_date"
        case openIssues = "open_issue"
        case closeIssues = "close_issue"
        case progress
    }
}
