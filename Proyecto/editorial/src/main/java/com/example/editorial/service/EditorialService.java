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
    public int update(Editorial editorial){

        if (!editorial.getName().isEmpty()){
            Editorial editorial1 = editorialRepository.findById(editorial.getId()).get();
            editorial1.setName(editorial.getName());
            editorialRepository.save(editorial1);
            return ExpiresFilter.XHttpServletResponse.SC_OK;
        }
        else{
            return ExpiresFilter.XHttpServletResponse.SC_NO_CONTENT;
        }
    }

    public void delete(int id){
        editorialRepository.deleteById(id);
    }
}
