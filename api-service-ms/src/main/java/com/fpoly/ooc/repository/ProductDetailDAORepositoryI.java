package com.fpoly.ooc.repository;

import com.fpoly.ooc.entity.ProductDetail;
import com.fpoly.ooc.request.ProductDetailRequest;
import com.fpoly.ooc.responce.ProductDetailColorSizeResponse;
import com.fpoly.ooc.responce.ProductDetailResponse;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ProductDetailDAORepositoryI extends JpaRepository<ProductDetail, Long> {
    @Query("Select od.id as id, o.id as productId, od.pattern.id as patternId, od.button.id as buttonId, od.material.id as materialId, od.form.id as formId " +
            ",od.collar.id as collarId, od.sleeve.id as sleeveId, od.shirtTail.id as shirtTailId, od.price as price, od.descriptionDetail as descriptionDetail" +
            ", od.status as status from Product o join ProductDetail od on od.product.id = o.id where od.id=?1 ")
    public ProductDetailResponse getProductDetail(Long id);

    @Query("select od.id as productDetailId, od.size.id as sizeId, od.color.id as colorId, od.quantity as quantity" +
            ", od.price as price from ProductDetail od where od.id = ?1")
    public List<ProductDetailColorSizeResponse> getProductDetailColorSizeByIdPD(Long id);
}
