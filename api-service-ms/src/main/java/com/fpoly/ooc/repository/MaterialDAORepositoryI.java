package com.fpoly.ooc.repository;

import com.fpoly.ooc.entity.Material;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface MaterialDAORepositoryI extends JpaRepository<Material, Long> {
}
