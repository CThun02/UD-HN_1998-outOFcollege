package com.fpoly.ooc.service.impl;

import com.fpoly.ooc.entity.ButtonType;
import com.fpoly.ooc.repository.ButtonTypeDAORepositoryI;
import com.fpoly.ooc.service.interfaces.ButtonTypeServiceI;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ButtonTypeServiceImpl implements ButtonTypeServiceI {

    @Autowired
    private ButtonTypeDAORepositoryI repo;

    @Override
    public ButtonType create(ButtonType buttonType) {
        return repo.save(buttonType);
    }

    @Override
    public ButtonType update(ButtonType buttonType) {
        ButtonType buttonTypechekc = this.getOne(buttonType.getId());
        if(buttonTypechekc != null){
            buttonTypechekc = repo.save(buttonType);
        }
        return buttonTypechekc;
    }

    @Override
    public Boolean delete(Long id) {
        boolean deleted = false;
        ButtonType buttonType = this.getOne(id);
        if(buttonType!=null){
            repo.delete(buttonType);
            deleted = true;
        }
        return deleted;
    }

    @Override
    public List<ButtonType> getAll() {
        return repo.findAll();
    }

    @Override
    public ButtonType getOne(Long id) {
        Optional<ButtonType> buttonTypeOptional = repo.findById(id);
        return buttonTypeOptional.orElse(null);
    }
}
