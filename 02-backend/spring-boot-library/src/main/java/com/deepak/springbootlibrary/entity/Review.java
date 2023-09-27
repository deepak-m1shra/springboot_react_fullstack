package com.deepak.springbootlibrary.entity;

import lombok.Data;
import org.hibernate.annotations.CreationTimestamp;

import javax.persistence.*;
import java.util.Date;

@Table
@Entity
@Data
public class Review {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String userEmail;
    @CreationTimestamp
    private Date date;
    private double rating;
    private Long bookId;
    private String reviewDescription;
}
