package com.fpoly.ooc.service.impl;

import com.fpoly.ooc.entity.Brand;
import com.fpoly.ooc.entity.CollarType;
import com.fpoly.ooc.repository.BrandDAORepository;
import com.fpoly.ooc.repository.CollarDAORepository;
import com.fpoly.ooc.service.interfaces.CollarServiceI;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CollarServiceImpl implements CollarServiceI {
    @Autowired
    private CollarDAORepository repo;

    @Override
    public CollarType create(CollarType collarType) {
        return repo.save(collarType);
    }

    @Override
    public CollarType update(CollarType collarType) {
        CollarType collarTypeCheck = this.getOne(collarType.getId());
        if(collarTypeCheck==null){
            return null;
        }
        return repo.save(collarType);
    }

    @Override
    public Boolean delete(Long id) {
        CollarType brandCheck = this.getOne(id);
        if(brandCheck==null){
            return false;
        }
        repo.delete(brandCheck);
        return true;
    }

    @Override
    public List<CollarType> findAll() {
        return repo.findAll();
    }

    @Override
    public CollarType getOne(Long id) {
        return repo.findById(id).orElse(null);
    }
}
