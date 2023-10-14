package com.fpoly.ooc.service.interfaces;

import com.fpoly.ooc.entity.ShirtTailType;

import java.util.List;

public interface ShirtTailTypeServiceI {
    public ShirtTailType create(ShirtTailType shirtTailType);
    public ShirtTailType update(ShirtTailType shirtTailType, Long id);
    public Boolean delete(Long id);
    public List<ShirtTailType> findAll();
    public ShirtTailType getOne(Long id);
}
