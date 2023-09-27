package com.fpoly.ooc.service.impl;

import com.fpoly.ooc.entity.Pattern;
import com.fpoly.ooc.repository.PatternDAORepository;
import com.fpoly.ooc.service.interfaces.PatternServiceI;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class PatternServiceImpl implements PatternServiceI {
    @Autowired
    private PatternDAORepository repo;

    @Override
    public Pattern create(Pattern pattern) {
        return repo.save(pattern);
    }

    @Override
    public Pattern update(Pattern pattern) {
        Pattern patternCheck = this.getOne(pattern.getId());
        if(patternCheck==null){
            return null;
        }
        return repo.save(pattern);
    }

    @Override
    public Boolean delete(Long id) {
        Pattern patternCheck = this.getOne(id);
        if(patternCheck==null){
            return false;
        }
        repo.delete(patternCheck);
        return true;
    }

    @Override
    public List<Pattern> findAll() {
        return repo.findAll();
    }

    @Override
    public Pattern getOne(Long id) {
        return repo.findById(id).orElse(null);
    }
}
