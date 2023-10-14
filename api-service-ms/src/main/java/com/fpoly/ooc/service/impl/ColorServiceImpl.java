package com.fpoly.ooc.service.impl;

import com.fpoly.ooc.entity.Color;
import com.fpoly.ooc.repository.ColorDAORepository;
import com.fpoly.ooc.service.interfaces.ColorServiceI;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ColorServiceImpl implements ColorServiceI {
    @Autowired
    private ColorDAORepository repo;

    @Override
    public Color create(Color color) {
        return repo.save(color);
    }

    @Override
    public Color update(Color color, Long id) {
        Optional<Color> optional = repo.findById(id);

        return optional.map(o->{
            o.setColorName(color.getColorName());
            o.setStatus(color.getStatus());
            return repo.save(o);
        }).orElse(null);
    }

    @Override
    public Boolean delete(Long id) {
        Color colorCheck = this.getOne(id);
        if (colorCheck == null) {
            return false;
        }
        repo.delete(colorCheck);
        return true;
    }

    @Override
    public List<Color> findAll() {
        return repo.findAll();
    }

    @Override
    public Color getOne(Long id) {
        return repo.findById(id).orElse(null);
    }
}
