package com.fpoly.ooc.service.impl;

import com.fpoly.ooc.entity.Material;
import com.fpoly.ooc.entity.ShirtTailType;
import com.fpoly.ooc.repository.MaterialDAORepository;
import com.fpoly.ooc.repository.ShirtTailTypeDAORepository;
import com.fpoly.ooc.service.interfaces.MaterialServiceI;
import com.fpoly.ooc.service.interfaces.ShirtTailTypeServiceI;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ShirtTailTypeServiceImpl implements ShirtTailTypeServiceI {
    @Autowired
    private ShirtTailTypeDAORepository repo;

    @Override
    public ShirtTailType create(ShirtTailType shirtTailType) {
        return repo.save(shirtTailType);
    }

    @Override
    public ShirtTailType update(ShirtTailType shirtTailType) {
        ShirtTailType brandCheck = this.getOne(shirtTailType.getId());
        if(brandCheck==null){
            return null;
        }
        return repo.save(shirtTailType);
    }

    @Override
    public Boolean delete(Long id) {
        ShirtTailType shirtTailTypeCheck = this.getOne(id);
        if(shirtTailTypeCheck==null){
            return false;
        }
        repo.delete(shirtTailTypeCheck);
        return true;
    }

    @Override
    public List<ShirtTailType> findAll() {
        return repo.findAll();
    }

    @Override
    public ShirtTailType getOne(Long id) {
        return repo.findById(id).orElse(null);
    }
}
