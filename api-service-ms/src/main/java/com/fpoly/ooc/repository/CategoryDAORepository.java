package com.fpoly.ooc.repository;

import com.fpoly.ooc.entity.Category;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CategoryDAORepository extends JpaRepository<Category, Long> {
    public Category findFirstByCategoryName(String categoryName);
}
