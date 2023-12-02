package com.fpoly.ooc.service.interfaces;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fpoly.ooc.entity.SleeveType;
import com.fpoly.ooc.request.sleevetype.SleeveTypeRequest;

import java.util.List;

public interface SleeveServiceI {
    public SleeveType create(SleeveType sleeveType) throws JsonProcessingException;

    public SleeveType update(SleeveType sleeveType, Long id);

    public Boolean delete(Long id);

    public List<SleeveType> findAll();

    public SleeveType getOne(Long id);

    SleeveType updateStatus(SleeveTypeRequest request, Long id);
}
