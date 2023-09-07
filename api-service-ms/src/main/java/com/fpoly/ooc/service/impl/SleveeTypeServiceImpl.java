package com.fpoly.ooc.service.impl;

import com.fpoly.ooc.entity.SleeveType;
import com.fpoly.ooc.repository.SleeveTypeDAORepositoryI;
import com.fpoly.ooc.service.interfaces.SleeveTypeServiceI;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class SleveeTypeServiceImpl implements SleeveTypeServiceI {

    @Autowired
    private SleeveTypeDAORepositoryI repo;

    @Override
    public SleeveType create(SleeveType sleeveType) {
        return repo.save(sleeveType);
    }

    @Override
    public SleeveType update(SleeveType sleeveType) {
        SleeveType sleeveTypeCheck = this.getOne(sleeveType.getId());
        if(sleeveTypeCheck != null){
            sleeveTypeCheck = repo.save(sleeveType);
        }
        return sleeveTypeCheck;
    }

    @Override
    public Boolean delete(Long id) {
        boolean deleted = false;
        SleeveType sleeveType = this.getOne(id);
        if(sleeveType!=null){
            repo.delete(sleeveType);
            deleted = true;
        }
        return deleted;
    }

    @Override
    public List<SleeveType> getAll() {
        return repo.findAll();
    }

    @Override
    public SleeveType getOne(Long id) {
        Optional<SleeveType> sleeveTypeOptional = repo.findById(id);
        return sleeveTypeOptional.orElse(null);
    }
}
