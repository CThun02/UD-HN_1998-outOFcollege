package com.fpoly.ooc.service.interfaces;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fpoly.ooc.entity.Category;
import com.fpoly.ooc.entity.Form;
import com.fpoly.ooc.exception.NotFoundException;
import com.fpoly.ooc.request.category.CategoryRequest;
import com.fpoly.ooc.request.form.FormRequest;

import java.util.List;

public interface CategoryServiceI {
    public Category create(Category category) throws JsonProcessingException, NotFoundException;
    public Category update(Category category , Long id);
    public Boolean delete(Long id);
    public List<Category> findAll();
    public Category getOne(Long id);
    public Category findFirstByCategoryName(String categoryName);
    Category updateStatus(CategoryRequest request, Long id) throws NotFoundException;

}
