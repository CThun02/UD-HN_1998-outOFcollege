package com.fpoly.ooc.service.impl;

import com.fpoly.ooc.constant.Const;
import com.fpoly.ooc.constant.ErrorCodeConfig;
import com.fpoly.ooc.entity.*;
import com.fpoly.ooc.exception.NotFoundException;
import com.fpoly.ooc.repository.ProductDAORepositoryI;
import com.fpoly.ooc.repository.ProductDetailDAORepositoryI;
import com.fpoly.ooc.responce.product.ProductDetailResponse;
import com.fpoly.ooc.service.interfaces.ProductDetailServiceI;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

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
        if (productDetailtCheck != null) {
            productDetailtCheck = repo.save(productDetail);
        }
        return productDetailtCheck;
    }

    @Override
    public Boolean delete(Long id) {
        boolean deleted = false;
        ProductDetail productDetail = this.getOne(id);
        if (productDetail != null) {
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
    public List<ProductDetailResponse> getAll() {
        return repo.getAll();
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
    public ProductDetailResponse getOneByIdCom(Long productId, Long idButton, Long idMaterial, Long idShirtTail, Long idSleeve, Long idCollar, Long idColor, Long idSize) {
        return repo.getOneByIdCom(productId, idButton, idMaterial, idShirtTail,
                idSleeve, idCollar, idColor, idSize);
    }

    @Override
    public List<ProductDetailResponse> filterProductDetailsByIdCom(Long productId, Long idButton, Long idMaterial, Long idShirtTail, Long idSleeve, Long idCollar, Long idColor, Long idSize) {
        return repo.filterProductDetailsByIdCom(productId, idButton, idMaterial, idShirtTail, idSleeve, idCollar, idColor, idSize);
    }

    @Override
    public List<ProductDetailResponse> searchByCodeOrName(String keyWords) {
        keyWords = "%" + keyWords + "%";
        Optional<List<ProductDetailResponse>> values = Optional.of(repo.searchProductDetailByProductName(keyWords));
        if (values.get().isEmpty()) {
            values = Optional.of(repo.searchProductDetailByProductCode(keyWords));
        }
        return values.orElse(null);
    }

    @Override
    public List<Color> getColorsBydIdPro(Long productId) {
        return repo.getColorsBydIdPro(productId);
    }

    @Override
    public List<Size> getSizesBydIdPro(Long productId) {
        return repo.getSizesBydIdPro(productId);
    }

    @Override
    public List<ShirtTailType> getShirtTailsBydIdPro(Long productId) {
        return repo.getShirtTailsBydIdPro(productId);
    }

    @Override
    public List<Material> getMaterialsBydIdPro(Long productId) {
        return repo.getMaterialsBydIdPro(productId);
    }

    @Override
    public List<CollarType> getCollarsBydIdPro(Long productId) {
        return repo.getCollarsBydIdPro(productId);
    }

    @Override
    public List<ButtonType> getButtonsBydIdPro(Long productId) {
        return repo.getButtonsBydIdPro(productId);
    }

    @Override
    public List<SleeveType> getSleevesBydIdPro(Long productId) {
        return repo.getSleevesBydIdPro(productId);
    }

    public ProductDetail findById(Long id) {
        ProductDetail productDetail = repo.findById(id).orElseThrow(() ->
                new NotFoundException(ErrorCodeConfig.getMessage(Const.PRODUCT_DETAIL_NOT_FOUND)));
        return productDetail;
    }

    @Override
    public Integer updateProductDetailsByCom(Long productId, Long idButton, Long idMaterial, Long idShirtTail,
                                             Long idSleeve, Long idCollar, Long idColor, Long idSize, String status) {
        return repo.updateProductDetailsByCom(productId, idButton, idMaterial, idShirtTail, idSleeve, idCollar, idColor,
                idSize, status);
    }

    @Override
    public List<Long> findAllResponseProduct(Long idPromotion) {
        return repo.findAllByIdPromotion(idPromotion);
    }
}
