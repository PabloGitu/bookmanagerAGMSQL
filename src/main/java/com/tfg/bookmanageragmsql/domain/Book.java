package com.tfg.bookmanageragmsql.domain;


import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;
import javax.validation.constraints.*;

import java.io.Serializable;
import java.time.LocalDate;
import java.util.HashSet;
import java.util.Set;
import java.util.Objects;

import com.tfg.bookmanageragmsql.domain.enumeration.BookCover;

import com.tfg.bookmanageragmsql.domain.enumeration.BookGenre;

/**
 * A Book.
 */
@Entity
@Table(name = "book")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class Book implements Serializable {

    private static final long serialVersionUID = 1L;
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull
    @Column(name = "title", nullable = false)
    private String title;

    @NotNull
    @Size(min = 10)
    @Column(name = "description", nullable = false)
    private String description;

    @NotNull
    @Column(name = "publication_date", nullable = false)
    private LocalDate publicationDate;

    @Column(name = "price")
    private Double price;

    @NotNull
    @Enumerated(EnumType.STRING)
    @Column(name = "book_cover", nullable = false)
    private BookCover bookCover;

    @NotNull
    @Enumerated(EnumType.STRING)
    @Column(name = "genre", nullable = false)
    private BookGenre genre;

    @NotNull
    @Column(name = "is_best_seller", nullable = false)
    private Boolean isBestSeller;

    @Lob
    @Column(name = "image")
    private byte[] image;

    @Column(name = "image_content_type")
    private String imageContentType;

    @OneToMany(mappedBy = "book")
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<Comment> comments = new HashSet<>();
    @ManyToOne(optional = false)
    @NotNull
    @JsonIgnoreProperties("authors")
    private Author author;

    @ManyToOne(optional = false)
    @NotNull
    @JsonIgnoreProperties("publishers")
    private Publisher publisher;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getTitle() {
        return title;
    }

    public Book title(String title) {
        this.title = title;
        return this;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getDescription() {
        return description;
    }

    public Book description(String description) {
        this.description = description;
        return this;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public LocalDate getPublicationDate() {
        return publicationDate;
    }

    public Book publicationDate(LocalDate publicationDate) {
        this.publicationDate = publicationDate;
        return this;
    }

    public void setPublicationDate(LocalDate publicationDate) {
        this.publicationDate = publicationDate;
    }

    public Double getPrice() {
        return price;
    }

    public Book price(Double price) {
        this.price = price;
        return this;
    }

    public void setPrice(Double price) {
        this.price = price;
    }

    public BookCover getBookCover() {
        return bookCover;
    }

    public Book bookCover(BookCover bookCover) {
        this.bookCover = bookCover;
        return this;
    }

    public void setBookCover(BookCover bookCover) {
        this.bookCover = bookCover;
    }

    public BookGenre getGenre() {
        return genre;
    }

    public Book genre(BookGenre genre) {
        this.genre = genre;
        return this;
    }

    public void setGenre(BookGenre genre) {
        this.genre = genre;
    }

    public Boolean isIsBestSeller() {
        return isBestSeller;
    }

    public Book isBestSeller(Boolean isBestSeller) {
        this.isBestSeller = isBestSeller;
        return this;
    }

    public void setIsBestSeller(Boolean isBestSeller) {
        this.isBestSeller = isBestSeller;
    }

    public byte[] getImage() {
        return image;
    }

    public Book image(byte[] image) {
        this.image = image;
        return this;
    }

    public void setImage(byte[] image) {
        this.image = image;
    }

    public String getImageContentType() {
        return imageContentType;
    }

    public Book imageContentType(String imageContentType) {
        this.imageContentType = imageContentType;
        return this;
    }

    public void setImageContentType(String imageContentType) {
        this.imageContentType = imageContentType;
    }

    public Set<Comment> getComments() {
        return comments;
    }

    public Book comments(Set<Comment> comments) {
        this.comments = comments;
        return this;
    }

    public Book addComment(Comment comment) {
        this.comments.add(comment);
        comment.setBook(this);
        return this;
    }

    public Book removeComment(Comment comment) {
        this.comments.remove(comment);
        comment.setBook(null);
        return this;
    }

    public void setComments(Set<Comment> comments) {
        this.comments = comments;
    }

    public Author getAuthor() {
        return author;
    }

    public Book author(Author author) {
        this.author = author;
        return this;
    }

    public void setAuthor(Author author) {
        this.author = author;
    }

    public Publisher getPublisher() {
        return publisher;
    }

    public Book publisher(Publisher publisher) {
        this.publisher = publisher;
        return this;
    }

    public void setPublisher(Publisher publisher) {
        this.publisher = publisher;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }
        Book book = (Book) o;
        if (book.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), book.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "Book{" +
            "id=" + getId() +
            ", title='" + getTitle() + "'" +
            ", description='" + getDescription() + "'" +
            ", publicationDate='" + getPublicationDate() + "'" +
            ", price=" + getPrice() +
            ", bookCover='" + getBookCover() + "'" +
            ", genre='" + getGenre() + "'" +
            ", isBestSeller='" + isIsBestSeller() + "'" +
            ", image='" + getImage() + "'" +
            ", imageContentType='" + getImageContentType() + "'" +
            "}";
    }
}
