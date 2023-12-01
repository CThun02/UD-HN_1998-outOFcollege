package com.fpoly.ooc.service.interfaces;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fpoly.ooc.entity.ShirtTailType;
import com.fpoly.ooc.request.shirttailtype.ShirtTailTypeRequest;

import java.util.List;

public interface ShirtTailTypeServiceI {
    public ShirtTailType create(ShirtTailType shirtTailType) throws JsonProcessingException;

    public ShirtTailType update(ShirtTailType shirtTailType, Long id);

    public Boolean delete(Long id);

    public List<ShirtTailType> findAll();

    public ShirtTailType getOne(Long id);

    ShirtTailType updateStatus(ShirtTailTypeRequest request, Long id);
}
