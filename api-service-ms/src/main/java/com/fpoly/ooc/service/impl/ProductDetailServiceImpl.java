package com.fpoly.ooc.service.impl;

import com.fpoly.ooc.entity.*;
import com.fpoly.ooc.repository.ProductDAORepositoryI;
import com.fpoly.ooc.repository.ProductDetailDAORepositoryI;
import com.fpoly.ooc.responce.product.ProductDetailResponse;
import com.fpoly.ooc.service.interfaces.ProductDetailServiceI;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ProductDetailServiceImpl implements ProductDetailServiceI {
    @Autowired
    private ProductDetailDAORepositoryI repo;

    @Override
    public ProductDetail create(ProductDetail productDetail) {
        return repo.save(productDetail);
    }

    @Override
    public ProductDetail update(ProductDetail productDetail) {
        ProductDetail productDetailtCheck = this.getOne(productDetail.getId());
        if(productDetailtCheck != null){
            productDetailtCheck = repo.save(productDetail);
        }
        return productDetailtCheck;
    }

    @Override
    public Boolean delete(Long id) {
        boolean deleted = false;
        ProductDetail productDetail = this.getOne(id);
        if(productDetail!=null){
            repo.delete(productDetail);
            deleted = true;
        }
        return deleted;
    }
    @Override
    public ProductDetail getOne(Long id) {
        return repo.findById(id).get();
    }

    @Override
    public List<ProductDetail> getAll() {
        return repo.findAll();
    }

    @Override
    public List<ProductDetailResponse> getProductDetailsByIdProduct(Long idPro) {
        return repo.getProductDetailsByIdProduct(idPro);
    }

    @Override
    public List<ProductDetailResponse> getProductDetailsTableByIdProduct(Long idPro, String status) {
        return repo.getProductDetailsTableByIdProduct(idPro, status);
    }

    @Override
    public List<ProductDetailResponse> getProductDetailsResponseByIdCompo
            (Long id, Long idButton, Long idMaterial, Long idShirtTail, Long idSleeve, Long idCollar) {
        return repo.getProductDetailsResponseByIdCompo(id, idButton, idMaterial, idShirtTail, idSleeve, idCollar);
    }

    @Override
    public List<Color> getColorsByIdCompoPDAndIdPro(Long productId, Long idButton, Long idMaterial, Long idShirtTail,
                                                    Long idSleeve, Long idCollar) {
        return repo.getColorsByIdCompoPDAndIdPro(productId, idButton, idMaterial, idShirtTail,
                 idSleeve,  idCollar);
    }

    @Override
    public List<ProductDetailResponse> getSizesPDByIdCompoPDAndIdPro(Long productId, Long idButton, Long idMaterial, Long idShirtTail, Long idSleeve, Long idCollar, Long idColor) {
        return repo.getSizesPDByIdCompoPDAndIdPro(productId, idButton, idMaterial, idShirtTail,
                idSleeve,  idCollar, idColor);
    }

    @Override
    public ProductDetailResponse getOneByIdCom(Long productId, Long idButton, Long idMaterial, Long idShirtTail, Long idSleeve, Long idCollar, Long idColor, Long idSize) {
        return repo.getOneByIdCom(productId, idButton, idMaterial, idShirtTail,
                idSleeve,  idCollar, idColor, idSize);
    }

    @Override
    public List<ProductDetailResponse> filterProductDetailsByIdCom(Long productId, Long idButton, Long idMaterial, Long idShirtTail, Long idSleeve, Long idCollar, Long idColor, Long idSize) {
        return repo.filterProductDetailsByIdCom(productId, idButton, idMaterial, idShirtTail, idSleeve, idCollar, idColor, idSize);
    }
}
