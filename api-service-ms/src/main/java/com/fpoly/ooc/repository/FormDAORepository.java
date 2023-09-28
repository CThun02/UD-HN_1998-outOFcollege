package com.fpoly.ooc.repository;

import com.fpoly.ooc.entity.Form;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface FormDAORepository extends JpaRepository<Form, Long> {
    public Form findFirstByFormName(String formName);

}
