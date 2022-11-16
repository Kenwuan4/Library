package com.example.editorial.controller;


import com.example.editorial.model.Editorial;
import com.example.editorial.service.EditorialService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("editorialAPI")
@CrossOrigin("http://localhost:4200/")
public class EditorialController {

    @Autowired
    EditorialService editorialService;

    @GetMapping("/editorials")
    private List<Editorial> getAllEditorials(){
        return editorialService.getAllEditorials();
    }

    @GetMapping ("/editorials/{name}")
    private Editorial getEditorialbyName(@PathVariable ("name") String name){
        return editorialService.getEditorialByName(name);
    }

    @GetMapping("/editorial/{id}")
    private Editorial getEditorialById(@PathVariable("id") Integer id){
        return editorialService.getEditorialById(id);
    }

    @DeleteMapping("/editorial/{id}")
    private ResponseEntity deleteEdi(@PathVariable("id") Integer id ){
         editorialService.delete(id);
         return ResponseEntity.ok().build();
    }

    @PostMapping("/editorial")
    private Editorial saveEditorial(@RequestBody Editorial editorial){
        return editorialService.save(editorial);
    }

    @PutMapping("/editorial")
    private Editorial updateEditorial(@RequestBody Editorial editorial){
        return editorialService.update(editorial);
    }
}
