package com.example.editorial.controller;


import com.example.editorial.model.Editorial;
import com.example.editorial.service.EditorialService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController

public class EditorialController {

    @Autowired
    EditorialService editorialService;

    @GetMapping("/editorials")
    private List<Editorial> getAllEditorials(){
        return editorialService.getAllEditorials();
    }

    @DeleteMapping("/editorial/{id}")
    private void deleteEdi(@PathVariable("id") int id ){
        editorialService.delete(id);
    }

    @PostMapping("/editorial")
    private Editorial saveEditorial(@RequestBody Editorial editorial){
        return editorialService.save(editorial);
    }

    @PutMapping("/editorial")
    private int updateEditorial(@RequestBody Editorial editorial){
        return editorialService.update(editorial);
    }
}