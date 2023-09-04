package com.fpoly.ooc.repository.interfaces;

import com.fpoly.ooc.entity.Color;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ColorDAORepositoryI extends JpaRepository<Color, Long> {
}
