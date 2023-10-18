package com.fpoly.ooc.service.interfaces;

import com.fpoly.ooc.entity.Brand;
import com.fpoly.ooc.entity.Form;
import com.fpoly.ooc.request.brand.BrandRequest;
import com.fpoly.ooc.request.form.FormRequest;

import java.util.List;
public interface BrandServiceI {
    public Brand create(Brand brand);
    public Brand update(Brand brand , Long id);
    public Boolean delete(Long id);
    public List<Brand> findAll();
    public Brand getOne(Long id);
    public Brand findFirstByBrandName(String brandName);
   Brand updateStatus(BrandRequest request, Long id);

}
