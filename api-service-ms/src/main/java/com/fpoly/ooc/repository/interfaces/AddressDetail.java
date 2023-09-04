package com.fpoly.ooc.repository.interfaces;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface AddressDetail extends JpaRepository<AddressDetail, Long> {
}
