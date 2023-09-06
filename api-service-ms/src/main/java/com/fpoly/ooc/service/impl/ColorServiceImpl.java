package com.fpoly.ooc.service.impl;

import com.fpoly.ooc.entity.Color;
import com.fpoly.ooc.repository.ColorDAORepositoryI;
import com.fpoly.ooc.service.interfaces.ColorServiceI;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ColorServiceImpl implements ColorServiceI {

    @Autowired
    private ColorDAORepositoryI repo;

    @Override
    public Color create(Color brand) {
        return repo.save(brand);
    }

    @Override
    public Color update(Color color ) {
        Color colorCheck = this.getOne(color.getId());
        if(colorCheck != null){
            colorCheck = repo.save(color);
        }
        return colorCheck;
    }

    @Override
    public Boolean delete(String id) {
        boolean deleted = false;
        Color color = this.getOne(id);
        if(color!=null){
            repo.delete(color);
            deleted = true;
        }
        return deleted;
    }

    @Override
    public List<Color> getAll() {
        return repo.findAll();
    }

    @Override
    public Color getOne(String id) {
        Optional<Color> colorOptional = repo.findById(id);
        return colorOptional.orElse(null);
    }
}
