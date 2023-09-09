package com.fpoly.ooc.repository;

import com.fpoly.ooc.entity.ProductDetail;
import com.fpoly.ooc.entity.Size;
import com.fpoly.ooc.responce.product.ProductDetailColorResponse;
import com.fpoly.ooc.responce.product.ProductDetailResponse;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ProductDetailDAORepositoryI extends JpaRepository<ProductDetail, Long> {
    @Query("select new com.fpoly.ooc.responce.product.ProductDetailResponse(" +
            "pd.id, pd.product, pd.pattern, pd.button, pd.material, pd.collar, " +
            "pd.sleeve, s, c, pd.form, pd.shirtTail, pd.price, " +
            "pd.quantity, pd.descriptionDetail, pd.status, pd.createdAt, pd.createdBy, " +
            "pd.updatedAt, pd.updatedBy, pd.deletedAt) " +
            "from ProductDetail pd " +
            "left join Color  c on pd.color.id = c.id " +
            "left join Size s on s.id = pd.size.id where pd.product.id=?1 and pd.color is null and pd.size is null" )
    public ProductDetailResponse getProductDetail(Long id);

    @Query("select od.id as productDetailId, od.color.id as colorId, od.quantity as quantity" +
            ", od.price as price from ProductDetail od where od.product.id = ?1 and od.size.id=?2")
    public List<ProductDetailColorResponse> getProductDetailColorSizeByIdPAndSizeId(Long id, Long sizeId);

    @Query("select distinct od.size as size from ProductDetail od join Product o on o.id = od.product.id where o.id = ?1 " +
            "and od.size.id is not null")
    public List<Size> getSizeIdByProductId(Long id);

    @Query("select new com.fpoly.ooc.responce.product.ProductDetailResponse(" +
            "pd.id, pd.product, pd.pattern, pd.button, pd.material, pd.collar, " +
            "pd.sleeve, s, c, pd.form, pd.shirtTail, pd.price, " +
            "pd.quantity, pd.descriptionDetail, pd.status, pd.createdAt, pd.createdBy, " +
            "pd.updatedAt, pd.updatedBy, pd.deletedAt) " +
            "from ProductDetail pd " +
            "left join Color  c on pd.color.id = c.id " +
            "left join Size s on s.id = pd.size.id where pd.color is not null and pd.size is not null" )
    public List<ProductDetailResponse> getAllProductDetail();

    @Query("select od from ProductDetail od where od.product.id=?1")
    public List<ProductDetail> getProductDetailByIdPro(Long id);

}
