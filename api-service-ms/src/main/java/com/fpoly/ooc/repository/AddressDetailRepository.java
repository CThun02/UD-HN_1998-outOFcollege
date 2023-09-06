package com.fpoly.ooc.repository;

import com.fpoly.ooc.entity.Address;
import com.fpoly.ooc.entity.AddressDetail;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface AddressDetailRepository extends JpaRepository<AddressDetail, Long> {
}
