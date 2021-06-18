//
//  DTO.swift
//  IssueTracker
//
//  Created by 김지선 on 2021/06/18.
//

import Foundation

struct LoginDTO:Decodable {
    let avatarUrl:String
    let email:String?
    let name:String
    let token:String
    let userName:String
}
