package com.fpoly.ooc.service.impl;

import com.fpoly.ooc.entity.CollarType;
import com.fpoly.ooc.repository.CollarTypeDAORepositoryI;
import com.fpoly.ooc.service.interfaces.CollarTypeServiceI;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class CollarTypeServiceImpl implements CollarTypeServiceI {

    @Autowired
    private CollarTypeDAORepositoryI repo;

    @Override
    public CollarType create(CollarType collarType) {
        return repo.save(collarType);
    }

    @Override
    public CollarType update(CollarType collarType) {
        CollarType collarTypeCheck = this.getOne(collarType.getId());
        if(collarTypeCheck != null){
            collarTypeCheck = repo.save(collarType);
        }
        return collarTypeCheck;
    }

    @Override
    public Boolean delete(Long id) {
        boolean deleted = false;
        CollarType collarType = this.getOne(id);
        if(collarType!=null){
            repo.delete(collarType);
            deleted = true;
        }
        return deleted;
    }

    @Override
    public List<CollarType> getAll() {
        return repo.findAll();
    }

    @Override
    public CollarType getOne(Long id) {
        Optional<CollarType> collarTypeOptional = repo.findById(id);
        return collarTypeOptional.orElse(null);
    }
}
