package com.fpoly.ooc.service.impl;

import com.fpoly.ooc.entity.Form;
import com.fpoly.ooc.repository.FormDAORepositoryI;
import com.fpoly.ooc.service.interfaces.FormServiceI;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class FormServiceImpl implements FormServiceI {

    @Autowired
    private FormDAORepositoryI repo;

    @Override
    public Form create(Form form) {
        return repo.save(form);
    }

    @Override
    public Form update(Form form) {
        Form formCheck = this.getOne(form.getId());
        if(formCheck != null){
            formCheck = repo.save(form);
        }
        return formCheck;
    }

    @Override
    public Boolean delete(Long id) {
        boolean deleted = false;
        Form form = this.getOne(id);
        if(form!=null){
            repo.delete(form);
            deleted = true;
        }
        return deleted;
    }

    @Override
    public List<Form> getAll() {
        return repo.findAll();
    }

    @Override
    public Form getOne(Long id) {
        Optional<Form> formOptional = repo.findById(id);
        return formOptional.orElse(null);
    }
}
