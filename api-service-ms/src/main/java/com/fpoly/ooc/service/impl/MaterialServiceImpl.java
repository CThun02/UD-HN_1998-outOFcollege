package com.fpoly.ooc.service.impl;

import com.fpoly.ooc.entity.Material;
import com.fpoly.ooc.repository.MaterialDAORepositoryI;
import com.fpoly.ooc.service.interfaces.MaterialServiceI;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class MaterialServiceImpl implements MaterialServiceI {

    @Autowired
    private MaterialDAORepositoryI repo;

    @Override
    public Material create(Material material) {
        return repo.save(material);
    }

    @Override
    public Material update(Material material) {
        Material materialCheck = this.getOne(material.getId());
        if(materialCheck != null){
            materialCheck = repo.save(material);
        }
        return materialCheck;
    }

    @Override
    public Boolean delete(Long id) {
        boolean deleted = false;
        Material material = this.getOne(id);
        if(material!=null){
            repo.delete(material);
            deleted = true;
        }
        return deleted;
    }

    @Override
    public List<Material> getAll() {
        return repo.findAll();
    }

    @Override
    public Material getOne(Long id) {
        Optional<Material> materialOptional = repo.findById(id);
        return materialOptional.orElse(null);
    }
}
