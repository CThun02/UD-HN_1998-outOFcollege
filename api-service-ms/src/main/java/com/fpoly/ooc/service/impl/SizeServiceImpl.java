package com.fpoly.ooc.service.impl;

import com.fpoly.ooc.entity.Size;
import com.fpoly.ooc.repository.SizeDAORepository;
import com.fpoly.ooc.service.interfaces.SizeServiceI;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class SizeServiceImpl implements SizeServiceI {
    @Autowired
    private SizeDAORepository repo;

    @Override
    public Size create(Size size) {
        return repo.save(size);
    }

    @Override
    public Size update(Size size, Long id) {
        Optional<Size> optional = repo.findById(id);

        return optional.map(o->{
            o.setSizeName(size.getSizeName());
            o.setStatus(size.getStatus());
            return repo.save(o);
        }).orElse(null);
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
