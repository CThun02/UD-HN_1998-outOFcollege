package com.fpoly.ooc.repository;

import com.fpoly.ooc.entity.AddressDetail;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface AddressDetailRepository extends JpaRepository<AddressDetail, Long> {
    @Query("select ad from AddressDetail ad where ad.accountAddress.username=?1")
    public List<AddressDetail> getAddressDetailByUserName(String userName);

    @Query("select ad from AddressDetail ad where ad.accountAddress.role.id = 2")
    List<AddressDetail> getAllCustomer();

}
