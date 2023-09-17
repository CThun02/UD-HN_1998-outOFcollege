package com.fpoly.ooc.repository;

import com.fpoly.ooc.entity.Bill;
import com.fpoly.ooc.responce.BillProductResponse;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface BillRepo extends JpaRepository<Bill, Long> {

    @Query("SELECT new com.fpoly.ooc.responce.BillProductResponse(p.id, pd.id, p.imgDefault, p.productName, " +
            "   s.sizeName, c.colorName, pd.price, pd.quantity) " +
            "FROM Product p join ProductDetail pd on p.id = pd.id " +
            "join  Size s on pd.size.id = s.id " +
            "join Color c on c.id = pd.color.id")
    List<BillProductResponse> getAll();

}
