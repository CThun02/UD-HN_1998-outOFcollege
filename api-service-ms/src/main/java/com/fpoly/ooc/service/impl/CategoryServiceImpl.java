package com.fpoly.ooc.service.impl;

import com.fpoly.ooc.entity.Category;
import com.fpoly.ooc.repository.CategoryDAORepositoryI;
import com.fpoly.ooc.request.CategoryRequest;
import com.fpoly.ooc.service.interfaces.CategoryServiceI;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class CategoryServiceImpl implements CategoryServiceI {

    @Autowired
    private CategoryDAORepositoryI repo;

    @Override
    public Category create(Category category) {
        return repo.save(category);
    }

    @Override
    public Category update(Category category) {
        Category categoryCheck = this.getOne(category.getId());
        if(categoryCheck != null){
            categoryCheck = repo.save(category);
        }
        return categoryCheck;
    }

    @Override
    public Boolean delete(Long id) {
        boolean deleted = false;
        Category category = this.getOne(id);
        if(category!=null){
            repo.delete(category);
            deleted = true;
        }
        return deleted;
    }

    @Override
    public List<Category> getAll() {
        return repo.findAll();
    }

    @Override
    public Category getOne(Long id) {
        Optional<Category> categoryOptional = repo.findById(id);
        return categoryOptional.orElse(null);
    }
}
