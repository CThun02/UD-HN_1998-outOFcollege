package com.fpoly.ooc.repository;

import com.fpoly.ooc.entity.Pattern;

import com.fpoly.ooc.responce.PatternResponce;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PatternDAORepositoryI extends JpaRepository<Pattern, Long> {

    @Query("SELECT new com.fpoly.ooc.responce.PatternResponce(p.id, p.patternName, p.status)" +
            " from Pattern p")
    List<PatternResponce> getAll();

}
