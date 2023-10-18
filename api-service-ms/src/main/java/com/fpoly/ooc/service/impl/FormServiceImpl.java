package com.fpoly.ooc.service.impl;

import com.fpoly.ooc.constant.Const;
import com.fpoly.ooc.constant.ErrorCodeConfig;
import com.fpoly.ooc.entity.Form;
import com.fpoly.ooc.entity.Material;
import com.fpoly.ooc.exception.NotFoundException;
import com.fpoly.ooc.repository.FormDAORepository;
import com.fpoly.ooc.request.form.FormRequest;
import com.fpoly.ooc.service.interfaces.FormServiceI;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class FormServiceImpl implements FormServiceI {
    @Autowired
    private FormDAORepository repo;

    @Override
    public Form create(Form form) {
        return repo.save(form);
    }

    @Override
    public Form update(Form form, Long id) {

        Optional<Form> material1 = repo.findById(id);
        return material1.map(o -> {
            o.setFormName(form.getFormName());

            return repo.save(o);
        }).orElse(null);

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

    @Override
    public Form updateStatus(FormRequest request, Long id) {
        Form form = repo.findById(id).orElseThrow(() ->
                new NotFoundException(ErrorCodeConfig.getMessage(Const.ID_NOT_FOUND)));
        form.setStatus(request.getStatus());
        return repo.save(form);

    }
}
