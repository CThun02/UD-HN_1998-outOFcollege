package com.fpoly.ooc.service.impl;

import com.fpoly.ooc.constant.Const;
import com.fpoly.ooc.constant.ErrorCodeConfig;
import com.fpoly.ooc.entity.Color;
import com.fpoly.ooc.entity.SleeveType;
import com.fpoly.ooc.exception.NotFoundException;
import com.fpoly.ooc.repository.SleeveDAORepository;
import com.fpoly.ooc.request.sleevetype.SleeveTypeRequest;
import com.fpoly.ooc.service.interfaces.SleeveServiceI;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class SleeveServiceImpl implements SleeveServiceI {
    @Autowired
    private SleeveDAORepository repo;

    @Override
    public SleeveType create(SleeveType sleeveType) {
        return repo.save(sleeveType);
    }

    @Override
    public SleeveType update(SleeveType sleeveType, Long id) {
        Optional<SleeveType> optional = repo.findById(id);

        return optional.map(o -> {
            o.setSleeveName(sleeveType.getSleeveName());
            o.setStatus(sleeveType.getStatus());
            return repo.save(o);
        }).orElse(null);
    }

    @Override
    public Boolean delete(Long id) {
        SleeveType sleeveTypeCheck = this.getOne(id);
        if (sleeveTypeCheck == null) {
            return false;
        }
        repo.delete(sleeveTypeCheck);
        return true;
    }

    @Override
    public List<SleeveType> findAll() {
        return repo.findAll();
    }

    @Override
    public SleeveType getOne(Long id) {
        return repo.findById(id).orElse(null);
    }

    @Override
    public SleeveType updateStatus(SleeveTypeRequest request, Long id) {
        SleeveType sleeveType = repo.findById(id).orElseThrow(() ->
                new NotFoundException(ErrorCodeConfig.getMessage(Const.ID_NOT_FOUND)));
        sleeveType.setStatus(request.getStatus());
        return repo.save(sleeveType);
    }
}
