package com.fpoly.ooc.service.impl;

import com.fpoly.ooc.constant.Const;
import com.fpoly.ooc.constant.ErrorCodeConfig;
import com.fpoly.ooc.entity.Form;
import com.fpoly.ooc.entity.Material;
import com.fpoly.ooc.entity.Pattern;
import com.fpoly.ooc.exception.NotFoundException;
import com.fpoly.ooc.repository.PatternDAORepository;
import com.fpoly.ooc.request.pattern.PatternRequest;
import com.fpoly.ooc.service.interfaces.PatternServiceI;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class PatternServiceImpl implements PatternServiceI {
    @Autowired
    private PatternDAORepository repo;

    @Override
    public Pattern create(Pattern pattern) {
        return repo.save(pattern);
    }

    @Override
    public Pattern update(Pattern pattern, Long id) {

        Optional<Pattern> material1 = repo.findById(id);
        return material1.map(o -> {
            o.setPatternName(pattern.getPatternName());

            return repo.save(o);
        }).orElse(null);

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

    @Override
    public Pattern findFirstByPatternName(String patternName) {
        return repo.findFirstByPatternName(patternName);
    }

    @Override
    public Pattern updateStatus(PatternRequest request, Long id) {
        Pattern pattern = repo.findById(id).orElseThrow(() ->
                new NotFoundException(ErrorCodeConfig.getMessage(Const.ID_NOT_FOUND)));
        pattern.setStatus(request.getStatus());
        return repo.save(pattern);
    }
}
