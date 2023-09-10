package com.fpoly.ooc.repository;

import com.fpoly.ooc.entity.Category;
import com.fpoly.ooc.responce.CategoryResponce;
import org.springframework.data.domain.Page;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;


import java.util.List;

@Repository
public interface CategoryDAORepositoryI extends JpaRepository<Category, Long> {

    @Query("SELECT new com.fpoly.ooc.responce.CategoryResponce(c.id, c.categoryName, c.status)" +
            " FROM Category c ")
    List<CategoryResponce> getAll();


}
