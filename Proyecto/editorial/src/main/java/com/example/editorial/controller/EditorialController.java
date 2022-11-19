package com.example.editorial.controller;
import com.example.editorial.model.Editorial;
import com.example.editorial.service.EditorialService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
/**
 * Es el controlador de las editoriales.
 *
 * @author  Mateo Rocero y Javier Ramírez
 * @version 1.0
 * @since   2022-10-16
 */

@RestController
@RequestMapping("editorialAPI")
@CrossOrigin("http://localhost:4200/")
public class EditorialController {

    @Autowired
    EditorialService editorialService;

    /**
     * En este método HTTP GET se buscan todas las editoriales.
     * @return List<Editorial> corresponde a las editoriales encontradas.
     */

    @GetMapping("/editorials")
    private List<Editorial> getAllEditorials(){
        return editorialService.getAllEditorials();
    }
    /**
     * En este método HTTP GET se busca una editorial por nombre
     * @return Editorial corresponde a la editorial encontrada.
     */
    @GetMapping ("/editorials/{name}")
    private Editorial getEditorialbyName(@PathVariable ("name") String name){
        return editorialService.getEditorialByName(name);
    }

    /**
     * En este método HTTP GET se busca una editorial por id
     * @param id Corresponde al id de la editorial a buscar.
     * @return Editorial corresponde a la editorial encontrada.
     */
    @GetMapping("/editorial/{id}")
    private Editorial getEditorialById(@PathVariable("id") Integer id){
        return editorialService.getEditorialById(id);
    }
    /**
     * En este método HTTP DELETE se elimina una editorial por id
     * @param id Corresponde al id de la editorial a eliminar.
     * @return Editorial corresponde a la editorial eliminada
     */
    @DeleteMapping("/editorial/{id}")
    private ResponseEntity deleteEdi(@PathVariable("id") Integer id ){
         editorialService.delete(id);
         return ResponseEntity.ok().build();
    }
    /**
     * En este método HTTP POST se guarda una editorial
     * @param editorial Corresponde a la editorial a guardar.
     * @return Editorial corresponde a la editorial guardada.
     */
    @PostMapping("/editorial")
    private Editorial saveEditorial(@RequestBody Editorial editorial){
        return editorialService.save(editorial);
    }
    /**
     * En este método HTTP PUT se actuliza una editorial
     * @param editorial Corresponde a la editorial a actualizar.
     * @return Editorial corresponde a la editorial actualizada.
     */
    @PutMapping("/editorial")
    private Editorial updateEditorial(@RequestBody Editorial editorial){
        return editorialService.update(editorial);
    }
}
