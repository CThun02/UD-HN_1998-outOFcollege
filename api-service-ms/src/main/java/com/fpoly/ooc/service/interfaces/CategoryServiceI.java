package com.fpoly.ooc.service.interfaces;

import com.fpoly.ooc.entity.Category;

import java.util.List;

public interface CategoryServiceI {
    public Category create(Category category);
    public Category update(Category category);
    public Boolean delete(Long id);
    public List<Category> getAll();
    public Category getOne(Long id);
}
