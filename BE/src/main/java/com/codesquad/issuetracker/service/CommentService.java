package com.codesquad.issuetracker.service;

import com.codesquad.issuetracker.domain.Comment;
import com.codesquad.issuetracker.repository.CommentRepository;
import com.codesquad.issuetracker.request.EditedComment;
import com.codesquad.issuetracker.response.CommentResponse;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
@Transactional(readOnly = true)
public class CommentService {

    private final CommentRepository commentRepository;

    public CommentService(CommentRepository commentRepository) {
        this.commentRepository = commentRepository;
    }

    @Transactional
    public Comment create(Comment comment) {
        return commentRepository.save(comment);
    }

    public List<CommentResponse> getList(Long issueId) {
        return commentRepository.getCommentsByIssueId(issueId).stream()
                .map(comment -> CommentResponse.create(comment))
                .collect(Collectors.toList());
    }

    @Transactional
    public void edit(Long commentId, EditedComment content) {
        Comment comment = commentRepository.getById(commentId);
        comment.setContent(content.getContent());
        commentRepository.save(comment);
    }

    @Transactional
    public void remove(Long commentId) {
        commentRepository.deleteById(commentId);
    }
}
