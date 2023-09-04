package com.fpoly.ooc.repository.interfaces;

import com.fpoly.ooc.entity.Category;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CategoryDAORepositoryI extends JpaRepository<Category, Long> {
}
