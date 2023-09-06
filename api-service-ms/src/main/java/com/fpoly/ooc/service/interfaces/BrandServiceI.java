package com.fpoly.ooc.service.interfaces;

import com.fpoly.ooc.entity.Brand;
import java.util.List;

public interface BrandServiceI {
    public Brand create(Brand brand);
    public Brand update(Brand brand);
    public Boolean delete(Long id);
    public List<Brand> getAll();
    public Brand getOne(Long id);
}
