package com.example.editorial.service;

import com.example.editorial.model.Editorial;
import com.example.editorial.repository.EditorialRepository;
import org.apache.catalina.filters.ExpiresFilter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

/**
 * Este servicio es usado para llamar el repositorio y proveer los métodos necesarios
 * para administrar una editorial.
 * @author  Mateo Rocero y Javier Ramírez
 * @version 1.0
 * @since   2022-10-16
 */
@Service
public class EditorialService {

    @Autowired
    EditorialRepository editorialRepository;
    /**
     * En este método se buscan todas las editoriales
     * @return Editorial corresponde a las editoriales encontradas.
     */
    public List<Editorial> getAllEditorials(){
        return editorialRepository.findAll();
    }
    /**
     * En este método se buscan una editorial por nombre.
     * @param name Corresponde al nombre de la editorial a buscar.
     * @return Editorial corresponde a la editorial encontrada.
     */
    public Editorial getEditorialByName(String name){
        return editorialRepository.findEditorialByName(name);
    }
    /**
     * En este método se guarda una editorial.
     * @param editorial Corresponde a la editorial a guardar.
     * @return Editorial corresponde a la editorial guardada.
     */
    public Editorial save(Editorial editorial){
        return editorialRepository.save(editorial);
    }
    /**
     * En este método se busca una editorial por id
     * @param id Corresponde al id de la editorial a buscar
     * @return Editorial corresponde a la editorial encontrada.
     */
    public Editorial getEditorialById(Integer id){ return editorialRepository.findEditorialById(id);}
    /**
     * En este método se actualiza una editorial
     * @param editorial Corresponde a la editorial a aztualizar
     * @return Editorial corresponde a la editorial actualizada.
     */
    public Editorial update(Editorial editorial){
        return editorialRepository.save(editorial);

    }
    /**
     * En este método se actualiza una elimina
     * @param id Corresponde al id de la editorial a aztualizar
     * @return Editorial corresponde a la editorial eliminada.
     */
    public void delete(Integer id){
         editorialRepository.deleteById(id);
    }
}
