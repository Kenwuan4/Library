package com.javeriana.book.model;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
/**
 * En este se manejan las editoriales.
 *
 * @author  Mateo Rocero y Javier Ramírez
 * @version 1.0
 * @since   2022-10-16
 */
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class Editorial {

    private Integer id;
    private String name;
    private String webSite;
    private String img;
}
