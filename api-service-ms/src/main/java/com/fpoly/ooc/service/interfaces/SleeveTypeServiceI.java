package com.fpoly.ooc.service.interfaces;

import com.fpoly.ooc.entity.SleeveType;

import java.util.List;

public interface SleeveTypeServiceI {
    public SleeveType create(SleeveType sleeveType);
    public SleeveType update(SleeveType sleeveType);
    public Boolean delete(Long id);
    public List<SleeveType> getAll();
    public SleeveType getOne(Long id);
}
