package com.fpoly.ooc.service.impl;

import com.fpoly.ooc.entity.Brand;
import com.fpoly.ooc.repository.BrandDAORepository;
import com.fpoly.ooc.service.interfaces.BrandServiceI;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class BrandServiceImpl implements BrandServiceI {
    @Autowired
    private BrandDAORepository repo;

    @Override
    public Brand create(Brand brand) {
        return repo.save(brand);
    }

    @Override
    public Brand update(Brand brand) {
        Brand brandCheck = this.getOne(brand.getId());
        if(brandCheck==null){
            return null;
        }
        return repo.save(brand);
    }

    @Override
    public Boolean delete(Long id) {
        Brand brandCheck = this.getOne(id);
        if(brandCheck==null){
            return false;
        }
        repo.delete(brandCheck);
        return true;
    }

    @Override
    public List<Brand> findAll() {
        return repo.findAll();
    }

    @Override
    public Brand getOne(Long id) {
        return repo.findById(id).orElse(null);
    }
}
