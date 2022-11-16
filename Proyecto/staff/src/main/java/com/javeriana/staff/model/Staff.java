package com.javeriana.staff.model;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.sql.Date;

@Entity
@Table(name="staf")
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter

public class Staff {

    @Id
    @Column
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @Column
    private String name;

    @Column (nullable = true)
    private String lastname;

    @Column (nullable = true)
    private long identification;

    @Column (nullable = true)
    private Date birth;

    @Column
    private String email;

    @Column
    private boolean status;

}