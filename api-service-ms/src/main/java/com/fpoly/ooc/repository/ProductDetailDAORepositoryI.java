package com.fpoly.ooc.repository;

import com.fpoly.ooc.entity.Color;
import com.fpoly.ooc.entity.ProductDetail;
import com.fpoly.ooc.entity.Size;
import com.fpoly.ooc.responce.Product.ProductDetailColorResponse;
import com.fpoly.ooc.responce.Product.ProductDetailResponse;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ProductDetailDAORepositoryI extends JpaRepository<ProductDetail, Long> {
    @Query("Select od.id as id, o.id as productId, od.pattern.id as patternId, od.button.id as buttonId, od.material.id as materialId, od.form.id as formId " +
            ",od.collar.id as collarId, od.sleeve.id as sleeveId, od.shirtTail.id as shirtTailId, od.price as price, od.descriptionDetail as descriptionDetail" +
            ", od.status as status from Product o join ProductDetail od on od.product.id = o.id where o.id=?1 and od.color.id=NULL")
    public ProductDetailResponse getProductDetail(Long id);


    @Query("select od.id as productDetailId, od.color.id as colorId, od.quantity as quantity" +
            ", od.price as price from ProductDetail od where od.product.id = ?1 and od.size.id=?2")
    public List<ProductDetailColorResponse> getProductDetailColorSizeByIdPAndSizeId(Long id, Long sizeId);

    @Query("select distinct od.size as sizeName from ProductDetail od join Product o on o.id = od.product.id where o.id = ?1 " +
            "and od.size.id is not null")
    public List<Size> getSizeIdByProductId(Long id);
}
