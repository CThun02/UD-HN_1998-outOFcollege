package com.fpoly.ooc.service.impl;

import com.fpoly.ooc.entity.Pattern;
import com.fpoly.ooc.repository.PatternDAORepositoryI;
import com.fpoly.ooc.service.interfaces.PatternServiceI;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class PatternServiceImpl implements PatternServiceI {

    @Autowired
    private PatternDAORepositoryI repo;

    @Override
    public Pattern create(Pattern pattern) {
        return repo.save(pattern);
    }

    @Override
    public Pattern update(Pattern pattern) {
        Pattern patternCheck = this.getOne(pattern.getId());
        if(patternCheck != null){
            patternCheck = repo.save(pattern);
        }
        return patternCheck;
    }

    @Override
    public Boolean delete(Long id) {
        boolean deleted = false;
        Pattern pattern = this.getOne(id);
        if(pattern!=null){
            repo.delete(pattern);
            deleted = true;
        }
        return deleted;
    }

    @Override
    public List<Pattern> getAll() {
        return repo.findAll();
    }

    @Override
    public Pattern getOne(Long id) {
        Optional<Pattern> patternOptional = repo.findById(id);
        return patternOptional.orElse(null);
    }
}
