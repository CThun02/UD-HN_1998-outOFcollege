package com.fpoly.ooc.repository;

import com.fpoly.ooc.entity.BillDetail;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface BillDetailRepo extends JpaRepository<BillDetail, Long> {
}
