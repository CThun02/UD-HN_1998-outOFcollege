package com.fpoly.ooc.repository.interfaces;

import com.fpoly.ooc.entity.Pattern;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PatternDAORepositoryI extends JpaRepository<Pattern, Long> {
}
