package com.fpoly.ooc.service.interfaces;

import com.fpoly.ooc.entity.Form;
import com.fpoly.ooc.entity.Material;

import java.util.List;

public interface MaterialServiceI {
    public Material create(Material material);
    public Material update(Material materia);
    public Boolean delete(Long id);
    public List<Material> getAll();
    public Material getOne(Long id);
}
