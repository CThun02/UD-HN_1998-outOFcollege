package com.fpoly.ooc.service.impl;

import com.fpoly.ooc.constant.Const;
import com.fpoly.ooc.constant.ErrorCodeConfig;
import com.fpoly.ooc.entity.ShirtTailType;
import com.fpoly.ooc.exception.NotFoundException;
import com.fpoly.ooc.repository.ShirtTailTypeDAORepository;
import com.fpoly.ooc.request.shirttailtype.ShirtTailTypeRequest;
import com.fpoly.ooc.service.interfaces.ShirtTailTypeServiceI;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ShirtTailTypeServiceImpl implements ShirtTailTypeServiceI {
    @Autowired
    private ShirtTailTypeDAORepository repo;

    @Override
    public ShirtTailType create(ShirtTailType shirtTailType) {
        ShirtTailType check = repo.findFirstByShirtTailTypeName(shirtTailType.getShirtTailTypeName());
        if(check==null){
            return repo.save(shirtTailType);
        }
        return null;
    }

    @Override
    public ShirtTailType update(ShirtTailType shirtTailType, Long id) {
        Optional<ShirtTailType> optional = repo.findById(id);

        return optional.map(o -> {
            o.setShirtTailTypeName(shirtTailType.getShirtTailTypeName());
            o.setStatus(shirtTailType.getStatus());
            return repo.save(o);
        }).orElse(null);
    }

    @Override
    public Boolean delete(Long id) {
        ShirtTailType shirtTailTypeCheck = this.getOne(id);
        if (shirtTailTypeCheck == null) {
            return false;
        }
        repo.delete(shirtTailTypeCheck);
        return true;
    }

    @Override
    public List<ShirtTailType> findAll() {
        return repo.findAll();
    }

    @Override
    public ShirtTailType getOne(Long id) {
        return repo.findById(id).orElse(null);
    }

    @Override
    public ShirtTailType updateStatus(ShirtTailTypeRequest request, Long id) {
        ShirtTailType shirtTailType = repo.findById(id).orElseThrow(() ->
                new NotFoundException(ErrorCodeConfig.getMessage(Const.ID_NOT_FOUND)));
        shirtTailType.setStatus(request.getStatus());
        return repo.save(shirtTailType);
    }
}
