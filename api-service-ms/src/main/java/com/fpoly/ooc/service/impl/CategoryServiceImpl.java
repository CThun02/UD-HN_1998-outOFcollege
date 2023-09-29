package com.fpoly.ooc.service.impl;

import com.fpoly.ooc.entity.Category;
import com.fpoly.ooc.repository.CategoryDAORepository;
import com.fpoly.ooc.service.interfaces.CategoryServiceI;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CategoryServiceImpl implements CategoryServiceI {
    @Autowired
    private CategoryDAORepository repo;

    @Override
    public Category create(Category category) {
        return repo.save(category);
    }

    @Override
    public Category update(Category category) {
        Category categoryCheck = this.getOne(category.getId());
        if(categoryCheck==null){
            return null;
        }
        return repo.save(category);
    }

    @Override
    public Boolean delete(Long id) {
        Category categoryCheck = this.getOne(id);
        if(categoryCheck==null){
            return false;
        }
        repo.delete(categoryCheck);
        return true;
    }

    @Override
    public List<Category> findAll() {
        return repo.findAll();
    }

    @Override
    public Category getOne(Long id) {
        return repo.findById(id).orElse(null);
    }

    @Override
    public Category findFirstByCategoryName(String categoryName) {
        return repo.findFirstByCategoryName(categoryName);
    }
}
