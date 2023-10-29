package com.fpoly.ooc.service.impl;

import com.fpoly.ooc.constant.Const;
import com.fpoly.ooc.constant.ErrorCodeConfig;
import com.fpoly.ooc.entity.Category;
import com.fpoly.ooc.entity.CollarType;
import com.fpoly.ooc.entity.Form;
import com.fpoly.ooc.exception.NotFoundException;
import com.fpoly.ooc.repository.CategoryDAORepository;
import com.fpoly.ooc.request.category.CategoryRequest;
import com.fpoly.ooc.service.interfaces.CategoryServiceI;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class CategoryServiceImpl implements CategoryServiceI {
    @Autowired
    private CategoryDAORepository repo;

    @Override
    public Category create(Category category) {
        Category check = repo.findFirstByCategoryName(category.getCategoryName());
        if(check==null){
            return repo.save(category);
        }
        return null;
    }

    @Override
    public Category update(Category category , Long id) {

        Optional<Category> material1 = repo.findById(id);
        return material1.map(o -> {
            o.setCategoryName(category.getCategoryName());

            return repo.save(o);
        }).orElse(null);
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

    @Override
    public Category updateStatus(CategoryRequest request, Long id) {
        Category category = repo.findById(id).orElseThrow(() ->
                new NotFoundException(ErrorCodeConfig.getMessage(Const.ID_NOT_FOUND)));
        category.setStatus(request.getStatus());
        return repo.save(category);
    }
}
