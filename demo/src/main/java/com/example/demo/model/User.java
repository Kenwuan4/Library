package com.example.demo.model;

import com.sun.istack.NotNull;
import lombok.*;

import javax.persistence.*;
import java.sql.Date;
import java.util.Collection;

@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table
@Getter
@Setter
public class User {

    @Id
    @Column
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @Column
    private String userName;

    @Column
    private String password;

    @Column
    private boolean active;

    @Column
    private String name;

    @Column
    private String lastName;

    @Column
    private long identification;

    @Column
    private Date birth;

    @Column
    private String roles;


}
