package com.fpoly.ooc.repository;

import com.fpoly.ooc.entity.Size;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface SizeDAORepositoryI extends JpaRepository<Size, Long> {
}
