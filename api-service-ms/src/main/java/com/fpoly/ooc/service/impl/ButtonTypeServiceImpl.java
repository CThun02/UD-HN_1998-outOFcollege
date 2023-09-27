package com.fpoly.ooc.service.impl;

import com.fpoly.ooc.entity.Brand;
import com.fpoly.ooc.entity.ButtonType;
import com.fpoly.ooc.repository.BrandDAORepository;
import com.fpoly.ooc.repository.ButtonTypeDAORepository;
import com.fpoly.ooc.service.interfaces.BrandServiceI;
import com.fpoly.ooc.service.interfaces.ButtonTypeServiceI;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ButtonTypeServiceImpl implements ButtonTypeServiceI {
    @Autowired
    private ButtonTypeDAORepository repo;

    @Override
    public ButtonType create(ButtonType buttonType) {
        return repo.save(buttonType);
    }

    @Override
    public ButtonType update(ButtonType buttonType) {
        ButtonType buttonTypeCheck = this.getOne(buttonType.getId());
        if(buttonTypeCheck==null){
            return null;
        }
        return repo.save(buttonType);
    }

    @Override
    public Boolean delete(Long id) {
        ButtonType buttonTypeCheck = this.getOne(id);
        if(buttonTypeCheck==null){
            return false;
        }
        repo.delete(buttonTypeCheck);
        return true;
    }

    @Override
    public List<ButtonType> findAll() {
        return repo.findAll();
    }

    @Override
    public ButtonType getOne(Long id) {
        return repo.findById(id).orElse(null);
    }
}
