package com.fpoly.ooc.repository;

import com.fpoly.ooc.entity.CollarType;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CollarDAORepository extends JpaRepository<CollarType, Long> {
}
