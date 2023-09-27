package com.fpoly.ooc.service.interfaces;

import com.fpoly.ooc.entity.Size;

import java.util.List;

public interface SizeServiceI {
    public Size create(Size size);
    public Size update(Size size);
    public Boolean delete(Long id);
    public List<Size> findAll();
    public Size getOne(Long id);
}
