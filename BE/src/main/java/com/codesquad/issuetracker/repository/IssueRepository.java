package com.codesquad.issuetracker.repository;

import com.codesquad.issuetracker.domain.Issue;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface IssueRepository extends CrudRepository<Issue, Long> {

    List<Issue> getIssuesByStatusFalse();

    List<Issue> getIssuesByStatusTrue();
}
