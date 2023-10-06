package com.fpoly.ooc.repository;

import com.fpoly.ooc.entity.Bill;
import com.fpoly.ooc.responce.bill.BillInfoResponse;
import com.fpoly.ooc.responce.bill.BillProductResponse;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface BillRepo extends JpaRepository<Bill, Long> {

    @Query("SELECT new com.fpoly.ooc.responce.bill.BillProductResponse(p.id, p.imgDefault, p.productName, " +
            "   b.brandName, c.categoryName, f.formName, pt.patternName  ) " +
            "FROM Product p JOIN Brand b ON p.brand.id = b.id " +
            "JOIN Category c ON p.category.id = c.id " +
            "JOIN Form f ON p.form.id = f.id " +
            "JOIN Pattern pt ON p.pattern.id = pt.id")
    List<BillProductResponse> getAll();

}
