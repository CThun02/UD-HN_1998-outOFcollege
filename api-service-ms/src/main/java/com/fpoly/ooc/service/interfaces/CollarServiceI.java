package com.fpoly.ooc.service.interfaces;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fpoly.ooc.entity.CollarType;
import com.fpoly.ooc.entity.Form;
import com.fpoly.ooc.exception.NotFoundException;
import com.fpoly.ooc.request.collar.CollarRequest;
import com.fpoly.ooc.request.form.FormRequest;

import java.util.List;

public interface CollarServiceI {
    public CollarType create(CollarType collarType) throws JsonProcessingException, NotFoundException;
    public CollarType update(CollarType collarType , Long id);
    public Boolean delete(Long id);
    public List<CollarType> findAll();
    public CollarType getOne(Long id);
    CollarType updateStatus(CollarRequest request, Long id) throws NotFoundException;
}
