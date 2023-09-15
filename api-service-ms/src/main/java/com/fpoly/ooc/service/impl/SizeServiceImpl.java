package com.fpoly.ooc.service.impl;

import com.fpoly.ooc.entity.Pattern;
import com.fpoly.ooc.entity.Size;
import com.fpoly.ooc.repository.PatternDAORepository;
import com.fpoly.ooc.repository.SizeDAORepository;
import com.fpoly.ooc.service.interfaces.PatternServiceI;
import com.fpoly.ooc.service.interfaces.SizeServiceI;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class SizeServiceImpl implements SizeServiceI {
    @Autowired
    private SizeDAORepository repo;

    @Override
    public Size create(Size size) {
        return repo.save(size);
    }

    @Override
    public Size update(Size size) {
        Size sizeCheck = this.getOne(size.getId());
        if(sizeCheck==null){
            return null;
        }
        return repo.save(size);
    }

    @Override
    public Boolean delete(Long id) {
        Size sizeCheck = this.getOne(id);
        if(sizeCheck==null){
            return false;
        }
        repo.delete(sizeCheck);
        return true;
    }

    @Override
    public List<Size> findAll() {
        return repo.findAll();
    }

    @Override
    public Size getOne(Long id) {
        return repo.findById(id).orElse(null);
    }
}
