package com.fpoly.ooc.repository;



import com.fpoly.ooc.entity.Address;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

@Repository
public interface AddressRepository extends JpaRepository<Address,Long> {
    @Modifying
    @Transactional
    @Query("UPDATE Address a SET a.defaultaddress = ?2 WHERE a.id = ?1")
    void updateAddressDefault(Long addressId, Boolean value);
}
