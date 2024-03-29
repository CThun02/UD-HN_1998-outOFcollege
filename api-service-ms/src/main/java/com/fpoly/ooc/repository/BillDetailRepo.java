package com.fpoly.ooc.repository;

import com.fpoly.ooc.entity.BillDetail;
import com.fpoly.ooc.responce.bill.BillResponse;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface BillDetailRepo extends JpaRepository<BillDetail, Long> {
    @Query("SELECT new com.fpoly.ooc.responce.bill.BillResponse(b.id, bd.id, p.id , bd.quantity, " +
            "p.productName, b.price, bd.status, bd.createdAt) " +
            "FROM BillDetail bd " +
            "JOIN bd.bill b " +
            "JOIN bd.productDetail pd " +
            "JOIN pd.product p")
    List<BillResponse> getAllBill();

}
