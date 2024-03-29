package com.fpoly.ooc.service.impl;

import com.fpoly.ooc.entity.Product;
import com.fpoly.ooc.repository.ProductDAORepositoryI;
import com.fpoly.ooc.responce.product.ProductDetailResponse;
import com.fpoly.ooc.responce.product.ProductPromotionResponse;
import com.fpoly.ooc.responce.product.ProductResponse;
import com.fpoly.ooc.responce.product.ProductTableResponse;
import com.fpoly.ooc.service.interfaces.ProductServiceI;
import com.fpoly.ooc.utilities.UniqueRandomHex;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
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
        while(true){
            String productCode= "PRO_"+ UniqueRandomHex.generateUniqueRandomHex();
            productCode = productCode.replace("#", "");
            Optional<Product> check = Optional.ofNullable(repo.findFirstByProductCode(productCode));
            if(check.isEmpty()){
                product.setProductCode(productCode);
                break;
            }
        };
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
    public Product getOneByCode(String code) {
        return repo.findFirstByProductCode(code);
    }

    @Override
    public ProductTableResponse getProductEdit(Long id) {
        return null;
    }

    @Override
    public ProductResponse getProductResponseById(Long id) {
        return repo.getProductResponseById(id);
    }

    @Override
    public List<ProductTableResponse> getProductFilterByCom(String status, String keywords) {
        return repo.getProductFilterByCom(status, keywords);
    }

    @Override
    public List<ProductPromotionResponse> findProductPromotion() {
        return repo.findProductPromotion();
    }

    @Override
    public List<Long> findIdsProductsByIdPromotion(Long idPromotion) {
        return repo.findAllByIdPromotion(idPromotion);
    }
}
