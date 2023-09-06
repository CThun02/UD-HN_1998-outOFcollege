package com.fpoly.ooc.repository;

import com.fpoly.ooc.entity.Pattern;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PatternDAORepositoryI extends JpaRepository<Pattern, Long> {
}
