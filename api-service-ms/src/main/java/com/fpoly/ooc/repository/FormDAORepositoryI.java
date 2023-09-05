package com.fpoly.ooc.repository;

import com.fpoly.ooc.entity.Form;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface FormDAORepositoryI extends JpaRepository<Form, Long> {
}
