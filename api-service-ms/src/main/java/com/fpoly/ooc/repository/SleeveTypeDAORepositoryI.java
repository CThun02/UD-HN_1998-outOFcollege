package com.fpoly.ooc.repository;

import com.fpoly.ooc.entity.SleeveType;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface SleeveTypeDAORepositoryI extends JpaRepository<SleeveType, Long> {
}
