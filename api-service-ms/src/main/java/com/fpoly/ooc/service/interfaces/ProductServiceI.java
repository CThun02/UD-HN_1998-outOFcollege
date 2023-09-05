package com.fpoly.ooc.service.interfaces;

import com.fpoly.ooc.entity.Product;
import com.fpoly.ooc.responce.ProductResponse;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;

public interface ProductServiceI {
    public Product create(Product product);
    public Product update(Product product);
    public Boolean delete(Long id);
    public List<Product> getAll();
    public Product getOne(Long id);
    public Page<ProductResponse> pageIndex(int pageNumber);
}
