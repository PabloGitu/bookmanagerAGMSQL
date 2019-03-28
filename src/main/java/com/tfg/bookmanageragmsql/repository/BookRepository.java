package com.tfg.bookmanageragmsql.repository;

import com.tfg.bookmanageragmsql.domain.Book;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the Book entity.
 */
@SuppressWarnings("unused")
@Repository
public interface BookRepository extends JpaRepository<Book, Long> {

    @Query("SELECT b FROM Book b WHERE b.author.id = ?1")
    Page<Book> getBooksByAuthor(Long id, Pageable pageable);

    @Query("SELECT b FROM Book b WHERE b.publisher.id = ?1")
    Page<Book> getBooksByPublisher(Long id, Pageable pageable);

}
