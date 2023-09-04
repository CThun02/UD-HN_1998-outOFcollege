package com.fpoly.ooc.repository.interfaces;

import com.fpoly.ooc.entity.Material;
import org.springframework.data.jpa.repository.JpaRepository;

public interface MaterialDAORepositoryI extends JpaRepository<Material, Long> {
}
