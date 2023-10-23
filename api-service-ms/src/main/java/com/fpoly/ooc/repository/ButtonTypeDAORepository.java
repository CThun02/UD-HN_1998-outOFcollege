package com.fpoly.ooc.repository;

import com.fpoly.ooc.entity.ButtonType;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ButtonTypeDAORepository extends JpaRepository<ButtonType, Long> {
    ButtonType findFirstByButtonName(String buttonName);
}
