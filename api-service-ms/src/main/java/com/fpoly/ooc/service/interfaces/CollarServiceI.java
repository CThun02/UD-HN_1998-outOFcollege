package com.fpoly.ooc.service.interfaces;

import com.fpoly.ooc.entity.CollarType;

import java.util.List;

public interface CollarServiceI {
    public CollarType create(CollarType collarType);
    public CollarType update(CollarType collarType);
    public Boolean delete(Long id);
    public List<CollarType> findAll();
    public CollarType getOne(Long id);
}