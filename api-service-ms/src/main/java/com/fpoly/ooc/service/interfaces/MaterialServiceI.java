package com.fpoly.ooc.service.interfaces;

import com.fpoly.ooc.entity.Material;

import java.util.List;

public interface MaterialServiceI {
    public Material create(Material material);
    public Material update(Material material,Long id);
    public Boolean delete(Long id);
    public List<Material> findAll();
    public Material getOne(Long id);
}
