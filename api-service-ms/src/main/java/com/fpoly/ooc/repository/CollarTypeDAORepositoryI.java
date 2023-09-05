package com.fpoly.ooc.repository;

import com.fpoly.ooc.entity.CollarType;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CollarTypeDAORepositoryI extends JpaRepository<CollarType, Long> {
}
