package com.fpoly.ooc.repository;

import com.fpoly.ooc.entity.Pattern;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PatternDAORepository extends JpaRepository<Pattern, Long> {
    public Pattern findFirstByPatternName(String patternName);

}
