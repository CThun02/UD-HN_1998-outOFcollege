package com.fpoly.ooc.repository;

import com.fpoly.ooc.entity.Color;
import com.fpoly.ooc.entity.ProductDetail;
import com.fpoly.ooc.entity.Size;
import com.fpoly.ooc.responce.product.ProductDetailResponse;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import java.util.List;


@Repository
public interface ProductDetailDAORepositoryI extends JpaRepository<ProductDetail, Long> {
    @Query("select pd.id as id, pd.product as product, pd.button as button, pd.material as material" +
            ", pd.collar as collar, pd.sleeve as sleeve, pd.size as size, pd.color as color" +
            ", pd.shirtTail as shirtTail, pd.price as price, pd.quantity as quantity," +
            "pd.descriptionDetail as descriptionDetail from ProductDetail pd where  pd.product.id=?1")
    public List<ProductDetailResponse> getProductDetailsByIdProduct(Long idPro);

    @Query("select distinct pd.product as product, pd.button as button, pd.material as material, pd.shirtTail as shirtTail" +
            ", pd.collar as collar, pd.sleeve as sleeve, pd.price as price, pd.descriptionDetail as descriptionDetail" +
            " from ProductDetail pd where  pd.product.id=?1")
    public List<ProductDetailResponse> getProductDetailsTableByIdProduct(Long idPro);

    @Query("select pd.id as id, pd.product as product, pd.button as button, pd.material as material" +
            ", pd.collar as collar, pd.sleeve as sleeve, pd.size as size, pd.color as color" +
            ", pd.shirtTail as shirtTail, pd.price as price, pd.quantity as quantity," +
            "pd.descriptionDetail as descriptionDetail from ProductDetail pd where  pd.product.id = ?1" +
            " and pd.button.id = ?2 and pd.material.id = ?3 and pd.shirtTail.id = ?4" +
            " and pd.sleeve.id = ?5 and pd.collar.id = ?6")
    public List<ProductDetailResponse> getProductDetailsResponseByIdCompo
            (Long productId, Long idButton, Long idMaterial, Long idShirtTail, Long idSleeve, Long idCollar);

    @Query("select distinct pd.color from ProductDetail pd where  pd.product.id = ?1" +
            " and pd.button.id = ?2 and pd.material.id = ?3 and pd.shirtTail.id = ?4" +
            " and pd.sleeve.id = ?5 and pd.collar.id = ?6")
    public List<Color> getColorsByIdCompoPDAndIdPro
            (Long productId, Long idButton, Long idMaterial, Long idShirtTail, Long idSleeve, Long idCollar);

    @Query("select pd.id as id, pd.size as size from ProductDetail pd where  pd.product.id = ?1" +
            " and pd.button.id = ?2 and pd.material.id = ?3 and pd.shirtTail.id = ?4" +
            " and pd.sleeve.id = ?5 and pd.collar.id = ?6 and pd.color.id=?7")
    public List<ProductDetailResponse> getSizesPDByIdCompoPDAndIdPro
            (Long productId, Long idButton, Long idMaterial, Long idShirtTail, Long idSleeve, Long idCollar, Long idColor);
}
