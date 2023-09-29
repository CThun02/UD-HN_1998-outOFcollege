package com.fpoly.ooc.service.impl;

import com.fpoly.ooc.entity.Form;
import com.fpoly.ooc.repository.FormDAORepository;
import com.fpoly.ooc.service.interfaces.FormServiceI;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class FormServiceImpl implements FormServiceI {
    @Autowired
    private FormDAORepository repo;

    @Override
    public Form create(Form form) {
        return repo.save(form);
    }

    @Override
    public Form update(Form form) {
        Form formCheck = this.getOne(form.getId());
        if(formCheck==null){
            return null;
        }
        return repo.save(form);
    }

    @Override
    public Boolean delete(Long id) {
        Form formCheck = this.getOne(id);
        if(formCheck==null){
            return false;
        }
        repo.delete(formCheck);
        return true;
    }

    @Override
    public List<Form> findAll() {
        return repo.findAll();
    }

    @Override
    public Form getOne(Long id) {
        return repo.findById(id).orElse(null);
    }

    @Override
    public Form findFirstByFormName(String formName) {
        return repo.findFirstByFormName(formName);
    }
}
