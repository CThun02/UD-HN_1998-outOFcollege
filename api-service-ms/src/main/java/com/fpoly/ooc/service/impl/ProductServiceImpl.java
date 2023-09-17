package com.fpoly.ooc.service.impl;

import com.fpoly.ooc.entity.Product;
import com.fpoly.ooc.repository.ProductDAORepositoryI;
import com.fpoly.ooc.responce.product.ProductTableResponse;
import com.fpoly.ooc.service.interfaces.ProductServiceI;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ProductServiceImpl implements ProductServiceI {

    @Autowired
    private ProductDAORepositoryI repo;

    @Override
    public Product create(Product product) {
        return repo.save(product);
    }

    @Override
    public Product update(Product product) {
        Product productCheck = this.getOne(product.getId());
        if(productCheck != null){
            productCheck = repo.save(product);
        }
        return productCheck;
    }

    @Override
    public Boolean delete(Long id) {
        boolean deleted = false;
        Product product = this.getOne(id);
        if(product!=null){
            repo.delete(product);
            deleted = true;
        }
        return deleted;
    }

    @Override
    public List<Product> getAll() {
        return repo.findAll();
    }

    @Override
    public Product getOne(Long id) {
        Optional<Product> productOptional = repo.findById(id);
        return productOptional.orElse(null);
    }

    @Override
    public Page<ProductTableResponse> getProductsTable(int pageNumber) {
        Pageable pageable = PageRequest.of(pageNumber, 5);
        return repo.getProductsTable(pageable);
    }

    @Override
    public ProductTableResponse getProductEdit(Long id) {
        return null;
    }
}
