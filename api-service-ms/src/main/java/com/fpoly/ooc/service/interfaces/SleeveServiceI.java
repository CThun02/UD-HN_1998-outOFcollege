package com.fpoly.ooc.service.interfaces;

import com.fpoly.ooc.entity.SleeveType;

import java.util.List;

public interface SleeveServiceI {
    public SleeveType create(SleeveType sleeveType);
    public SleeveType update(SleeveType sleeveType, Long id);
    public Boolean delete(Long id);
    public List<SleeveType> findAll();
    public SleeveType getOne(Long id);
}
