package com.fpoly.ooc.service.impl;

import com.fpoly.ooc.constant.Const;
import com.fpoly.ooc.constant.ErrorCodeConfig;
import com.fpoly.ooc.dto.ProductDetailsDTO;
import com.fpoly.ooc.entity.*;
import com.fpoly.ooc.exception.NotFoundException;
import com.fpoly.ooc.repository.ProductDAORepositoryI;
import com.fpoly.ooc.repository.ProductDetailDAORepositoryI;
import com.fpoly.ooc.responce.product.ProductDetailResponse;
import com.fpoly.ooc.responce.productdetail.ProductsDetailsResponse;
import com.fpoly.ooc.service.interfaces.ProductDetailServiceI;
import com.fpoly.ooc.util.PageUltil;
import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Objects;
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
    public ProductDetail findById(Long id) {
        ProductDetail productDetail = repo.findById(id).orElseThrow(() ->
                new NotFoundException(ErrorCodeConfig.getMessage(Const.PRODUCT_DETAIL_NOT_FOUND)));
        return productDetail;
    }

    @Override
    public List<Long> findAllIdsResponseProductDetails(Long idPromotion) {
        return repo.findAllByIdPromotion(idPromotion);
    }

    @Override
    public List<ProductsDetailsResponse> findListProductdetailsByListProductId(ProductDetailsDTO dto) {
        return repo.getProductDetailsTableByConditionDTO(
                dto.getIdProducts(), dto.getIdButtons(), dto.getIdMaterials(),
                dto.getIdCollars(), dto.getIdSleeves(), dto.getIdShirtTails(),
                dto.getIdSizes(), dto.getIdColors(),
                StringUtils.isEmpty(dto.getSearchText()) ? null : "%" + dto.getSearchText() + "%"
        );
    }

}
