package com.fpoly.ooc.repository;

import com.fpoly.ooc.entity.DeliveryNote;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface DeliveryNoteRepo extends JpaRepository<DeliveryNote, Long> {
}
