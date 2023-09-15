package com.fpoly.ooc.repository;

import com.fpoly.ooc.entity.ShirtTailType;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ShirtTailTypeDAORepository extends JpaRepository<ShirtTailType, Long> {
}
