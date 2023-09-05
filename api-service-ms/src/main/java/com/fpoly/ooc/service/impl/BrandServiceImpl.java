package com.fpoly.ooc.service.impl;

import com.fpoly.ooc.entity.Brand;
import com.fpoly.ooc.repository.BrandDAORepositoryI;
import com.fpoly.ooc.service.interfaces.BrandServiceI;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class BrandServiceImpl implements BrandServiceI {

    @Autowired
    private BrandDAORepositoryI repo;

    @Override
    public Brand create(Brand brand) {
        return repo.save(brand);
    }

    @Override
    public Brand update(Brand brand ) {
        Brand brandcheck = this.getOne(brand.getId());
        if(brandcheck != null){
            brandcheck = repo.save(brand);
        }
        return brandcheck;
    }

    @Override
    public Boolean delete(Long id) {
        boolean deleted = false;
        Brand brand = this.getOne(id);
        if(brand!=null){
            repo.delete(brand);
            deleted = true;
        }
        return deleted;
    }

    @Override
    public List<Brand> getAll() {
        return repo.findAll();
    }

    @Override
    public Brand getOne(Long id) {
        Optional<Brand> brandOptional = repo.findById(id);
        return brandOptional.orElse(null);
    }
}
