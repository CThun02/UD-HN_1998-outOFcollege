package com.fpoly.ooc.service.impl;

import com.fpoly.ooc.entity.ShirtTailType;
import com.fpoly.ooc.entity.Size;
import com.fpoly.ooc.repository.ShirtTailTypeDAORepositoryI;
import com.fpoly.ooc.repository.SizeDAORepositoryI;
import com.fpoly.ooc.service.interfaces.ShirtTailTypeServiceI;
import com.fpoly.ooc.service.interfaces.SizeTypeServiceI;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class SizeServiceImpl implements SizeTypeServiceI {

    @Autowired
    private SizeDAORepositoryI repo;

    @Override
    public Size create(Size size) {
        return repo.save(size);
    }

    @Override
    public Size update(Size size) {
        Size sizeCheck = this.getOne(size.getId());
        if(sizeCheck != null){
            sizeCheck = repo.save(size);
        }
        return sizeCheck;
    }

    @Override
    public Boolean delete(Long id) {
        boolean deleted = false;
        Size shirtTailType = this.getOne(id);
        if(shirtTailType!=null){
            repo.delete(shirtTailType);
            deleted = true;
        }
        return deleted;
    }

    @Override
    public List<Size> getAll() {
        return repo.findAll();
    }

    @Override
    public Size getOne(Long id) {
        Optional<Size> sizeOptional = repo.findById(id);
        return sizeOptional.orElse(null);
    }
}
