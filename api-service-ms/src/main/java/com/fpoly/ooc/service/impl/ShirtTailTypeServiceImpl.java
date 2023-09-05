package com.fpoly.ooc.service.impl;

import com.fpoly.ooc.entity.Product;
import com.fpoly.ooc.entity.ShirtTailType;
import com.fpoly.ooc.repository.ProductDAORepositoryI;
import com.fpoly.ooc.repository.ShirtTailTypeDAORepositoryI;
import com.fpoly.ooc.service.interfaces.ProductServiceI;
import com.fpoly.ooc.service.interfaces.ShirtTailTypeServiceI;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ShirtTailTypeServiceImpl implements ShirtTailTypeServiceI {

    @Autowired
    private ShirtTailTypeDAORepositoryI repo;

    @Override
    public ShirtTailType create(ShirtTailType shirtTailType) {
        return repo.save(shirtTailType);
    }

    @Override
    public ShirtTailType update(ShirtTailType shirtTailType ) {
        ShirtTailType shirtTailTypeCheck = this.getOne(shirtTailType.getId());
        if(shirtTailTypeCheck != null){
            shirtTailTypeCheck = repo.save(shirtTailType);
        }
        return shirtTailTypeCheck;
    }

    @Override
    public Boolean delete(Long id) {
        boolean deleted = false;
        ShirtTailType shirtTailType = this.getOne(id);
        if(shirtTailType!=null){
            repo.delete(shirtTailType);
            deleted = true;
        }
        return deleted;
    }

    @Override
    public List<ShirtTailType> getAll() {
        return repo.findAll();
    }

    @Override
    public ShirtTailType getOne(Long id) {
        Optional<ShirtTailType> shirtTailTypeOptional = repo.findById(id);
        return shirtTailTypeOptional.orElse(null);
    }
}
