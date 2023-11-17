package com.fpoly.ooc.repository;

import com.fpoly.ooc.dto.AddressDTO;
import com.fpoly.ooc.entity.Address;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Repository
public interface AddressRepository extends JpaRepository<Address, Long> {
    @Modifying
    @Transactional
    @Query("UPDATE Address a SET a.defaultaddress = ?2 WHERE a.id = ?1")
    void updateAddressDefault(Long addressId, Boolean value);

    @Query("""
        select new com.fpoly.ooc.dto.AddressDTO(address.id, user.numberPhone, user.email,
        address.city, address.district, address.ward, address.street, address.descriptionDetail,
        address.defaultaddress, address.fullName)
        from AddressDetail addressDetail
            left join Address address on addressDetail.addressDetail.id = address.id
            left join Account user on addressDetail.accountAddress.username = user.username
        where (addressDetail is null or addressDetail.status = com.fpoly.ooc.constant.Const.STATUS_ACTIVE)
        and (address is null or address.status = com.fpoly.ooc.constant.Const.STATUS_ACTIVE)
        and (user is null or user.status = com.fpoly.ooc.constant.Const.STATUS_ACTIVE)
        and user.username = ?1
    """)
    List<AddressDTO> addressByUsername(String username);

    @Query("SELECT add " +
            "FROM Address add JOIN AddressDetail ad ON add.id = ad.addressDetail.id " +
            "WHERE ad.accountAddress.username = :username")
    List<Address> getListAddress(@Param("username") String username);
}
