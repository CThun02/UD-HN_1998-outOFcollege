package com.fpoly.ooc.repository;

import com.fpoly.ooc.entity.ButtonType;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ButtonTypeDAORepositoryI extends JpaRepository<ButtonType, Long> {
}
