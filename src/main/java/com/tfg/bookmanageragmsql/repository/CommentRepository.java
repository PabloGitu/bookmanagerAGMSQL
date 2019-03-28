package com.tfg.bookmanageragmsql.repository;

import com.tfg.bookmanageragmsql.domain.Comment;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * Spring Data  repository for the Comment entity.
 */
@SuppressWarnings("unused")
@Repository
public interface CommentRepository extends JpaRepository<Comment, Long> {

    @Query("select comment from Comment comment where comment.user.login = ?#{principal.username}")
    List<Comment> findByUserIsCurrentUser();

    @Query("SELECT c FROM Comment c WHERE c.book.id = ?1")
    Page<Comment> getCommentsByBook(Long id, Pageable pageable);

}
