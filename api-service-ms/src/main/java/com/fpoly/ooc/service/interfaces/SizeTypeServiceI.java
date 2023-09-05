package com.fpoly.ooc.service.interfaces;

import com.fpoly.ooc.entity.Size;

import java.util.List;

public interface SizeTypeServiceI {
    public Size create(Size Size);
    public Size update(Size Size);
    public Boolean delete(Long id);
    public List<Size> getAll();
    public Size getOne(Long id);
}
