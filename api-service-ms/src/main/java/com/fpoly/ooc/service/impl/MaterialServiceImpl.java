package com.fpoly.ooc.service.impl;

import com.fpoly.ooc.constant.Const;
import com.fpoly.ooc.constant.ErrorCodeConfig;
import com.fpoly.ooc.entity.Material;
import com.fpoly.ooc.exception.NotFoundException;
import com.fpoly.ooc.repository.MaterialDAORepository;
import com.fpoly.ooc.request.material.MaterialRequest;
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
        Material materialCheck = repo.findFirstByMaterialName(material.getMaterialName());
        if(materialCheck==null){
            return repo.save(material);
        }
        return null;
    }

    @Override
    public Material update(Material material, Long id) {
        Optional<Material> optionalMaterial = repo.findById(id);

        return optionalMaterial.map(o -> {
            o.setMaterialName(material.getMaterialName());
            o.setStatus(material.getStatus());
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

    @Override
    public Material updateStatus(MaterialRequest request, Long id) {
        Material material = repo.findById(id).orElseThrow(() ->
                new NotFoundException(ErrorCodeConfig.getMessage(Const.ID_NOT_FOUND)));
        material.setStatus(request.getStatus());
        return repo.save(material);
    }
}
