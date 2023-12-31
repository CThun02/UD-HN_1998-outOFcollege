package com.fpoly.ooc.service.interfaces;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fpoly.ooc.entity.Material;
import com.fpoly.ooc.exception.NotFoundException;
import com.fpoly.ooc.request.material.MaterialRequest;

import java.util.List;

public interface MaterialServiceI {
    public Material create(Material material) throws JsonProcessingException, NotFoundException;

    public Material update( Material material,Long id);

    public Boolean delete(Long id);

    public List<Material> findAll();

    public Material getOne(Long id);

    Material updateStatus(MaterialRequest request, Long id) throws NotFoundException;
}
