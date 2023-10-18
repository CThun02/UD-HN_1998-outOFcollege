package com.fpoly.ooc.service.impl;

import com.fpoly.ooc.entity.Brand;
import com.fpoly.ooc.entity.Material;
import com.fpoly.ooc.repository.BrandDAORepository;
import com.fpoly.ooc.repository.MaterialDAORepository;
import com.fpoly.ooc.service.interfaces.BrandServiceI;
import com.fpoly.ooc.service.interfaces.MaterialServiceI;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class MaterialServiceImpl implements MaterialServiceI {
    @Autowired
    private MaterialDAORepository repo;

    @Override
    public Material create(Material material) {
        return repo.save(material);
    }

    @Override
    public Material update(Material material, Long id) {

        Optional<Material> material1 = repo.findById(id);
        return material1.map(o -> {
            o.setMaterialName(material.getMaterialName());

            return repo.save(o);
        }).orElse(null);

    }

    @Override
    public Boolean delete(Long id) {
        Material materialCheck = this.getOne(id);
        if (materialCheck == null) {
            return false;
        }
        repo.delete(materialCheck);
        return true;
    }

    @Override
    public List<Material> findAll() {
        return repo.findAll();
    }

    @Override
    public Material getOne(Long id) {
        return repo.findById(id).orElse(null);
    }
}
