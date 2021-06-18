//
//  DTO.swift
//  IssueTracker
//
//  Created by 김지선 on 2021/06/18.
//

import Foundation

struct DTO: Decodable {
    let data: LoginDTO
}

struct LoginDTO:Decodable {
    let jwt: String
    let data: User
    let type: String
}

struct User: Decodable {
    let id: Int
    let name: String
    let login_id: String
}
