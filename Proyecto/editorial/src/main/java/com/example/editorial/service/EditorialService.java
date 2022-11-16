package com.example.editorial.service;

import com.example.editorial.model.Editorial;
import com.example.editorial.repository.EditorialRepository;
import org.apache.catalina.filters.ExpiresFilter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class EditorialService {

    @Autowired
    EditorialRepository editorialRepository;

    public List<Editorial> getAllEditorials(){
        return editorialRepository.findAll();
    }

    public Editorial getEditorialByName(String name){
        return editorialRepository.findEditorialByName(name);
    }
    public Editorial save(Editorial editorial){
        return editorialRepository.save(editorial);
    }

    public Editorial getEditorialById(Integer id){ return editorialRepository.findEditorialById(id);}
    public Editorial update(Editorial editorial){
        return editorialRepository.save(editorial);

    }

    public void delete(Integer id){
         editorialRepository.deleteById(id);
    }
}
