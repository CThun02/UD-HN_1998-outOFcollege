package com.fpoly.ooc.repository;

import com.fpoly.ooc.entity.Material;

import com.fpoly.ooc.responce.MaterialReponce;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface MaterialDAORepositoryI extends JpaRepository<Material, Long> {
    @Query("SELECT new com.fpoly.ooc.responce.MaterialReponce(m.id, m.materialName, m.status)" +
            " from Material  m")
    List<MaterialReponce> getAll();

}
