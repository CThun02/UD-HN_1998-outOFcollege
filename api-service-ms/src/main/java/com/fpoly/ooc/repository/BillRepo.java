package com.fpoly.ooc.repository;

import com.fpoly.ooc.entity.Address;
import com.fpoly.ooc.entity.Bill;
import com.fpoly.ooc.responce.account.GetListCustomer;
import com.fpoly.ooc.responce.bill.BillProductResponse;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface BillRepo extends JpaRepository<Bill, Long> {
    @Query("SELECT new com.fpoly.ooc.responce.account.GetListCustomer(a.username, a.fullName, a.numberPhone, " +
            "   a.email, a.gender,a.status ) " +
            "FROM Account a " +
            "where a.role.id = 2")
    List<GetListCustomer> getListCustomer();

    @Query("SELECT ad.addressDetail " +
            "FROM AddressDetail ad JOIN Address address ON ad.addressDetail.id = address.id " +
            "WHERE ad.accountAddress.username = ?1 ")
    List<Address> getListAddressByUsername(String username);

}
