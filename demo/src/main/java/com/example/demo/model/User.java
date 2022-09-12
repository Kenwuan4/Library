package com.example.demo.model;

import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.sql.Date;

@MappedSuperclass
@NoArgsConstructor
@AllArgsConstructor
public abstract class User {

    @Id
    @Column
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @Column
    private String name;

    @Column
    private String lastName;

    @Column
    private long identification;

    @Column
    private Date birth;


}
