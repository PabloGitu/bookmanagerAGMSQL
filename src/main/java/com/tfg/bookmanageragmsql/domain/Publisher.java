package com.tfg.bookmanageragmsql.domain;


import com.fasterxml.jackson.annotation.JsonIgnore;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;
import javax.validation.constraints.*;

import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;
import java.util.Objects;

import com.tfg.bookmanageragmsql.domain.enumeration.Distribution;

/**
 * A Publisher.
 */
@Entity
@Table(name = "publisher")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class Publisher implements Serializable {

    private static final long serialVersionUID = 1L;
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull
    @Column(name = "name", nullable = false)
    private String name;

    @Enumerated(EnumType.STRING)
    @Column(name = "distribution")
    private Distribution distribution;

    @Column(name = "localization")
    private String localization;

    @OneToMany(mappedBy = "publisher")
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<Book> books = new HashSet<>();
    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public Publisher name(String name) {
        this.name = name;
        return this;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Distribution getDistribution() {
        return distribution;
    }

    public Publisher distribution(Distribution distribution) {
        this.distribution = distribution;
        return this;
    }

    public void setDistribution(Distribution distribution) {
        this.distribution = distribution;
    }

    public String getLocalization() {
        return localization;
    }

    public Publisher localization(String localization) {
        this.localization = localization;
        return this;
    }

    public void setLocalization(String localization) {
        this.localization = localization;
    }

    public Set<Book> getBooks() {
        return books;
    }

    public Publisher books(Set<Book> books) {
        this.books = books;
        return this;
    }

    public Publisher addBook(Book book) {
        this.books.add(book);
        book.setPublisher(this);
        return this;
    }

    public Publisher removeBook(Book book) {
        this.books.remove(book);
        book.setPublisher(null);
        return this;
    }

    public void setBooks(Set<Book> books) {
        this.books = books;
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
        Publisher publisher = (Publisher) o;
        if (publisher.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), publisher.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "Publisher{" +
            "id=" + getId() +
            ", name='" + getName() + "'" +
            ", distribution='" + getDistribution() + "'" +
            ", localization='" + getLocalization() + "'" +
            "}";
    }
}
