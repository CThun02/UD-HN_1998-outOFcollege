package com.fpoly.ooc.service.interfaces;

import com.fpoly.ooc.entity.Address;
import com.fpoly.ooc.entity.Bill;
import com.fpoly.ooc.request.bill.BillRequest;
import com.fpoly.ooc.responce.account.AccountResponce;
import com.fpoly.ooc.responce.account.GetListCustomer;

import java.util.List;

public interface BillService {

    Bill createBill(BillRequest request);

    void deleteBill(Long id);

    List<GetListCustomer> getListCustomer();

    List<Address> getListAddressByUserName(String username);

}
