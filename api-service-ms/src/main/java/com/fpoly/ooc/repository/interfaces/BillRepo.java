package com.fpoly.ooc.repository.interfaces;

import com.fpoly.ooc.entity.Bill;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface BillRepo extends JpaRepository<Bill, Long> {
}
