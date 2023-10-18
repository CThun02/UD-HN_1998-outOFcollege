package com.fpoly.ooc.repository;

import com.fpoly.ooc.entity.Color;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ColorDAORepository extends JpaRepository<Color, Long> {
    Color findByColorCode(String colorCode);
}
