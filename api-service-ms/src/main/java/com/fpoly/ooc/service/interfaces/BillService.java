package com.fpoly.ooc.service.interfaces;

import com.fpoly.ooc.dto.BillStatusDTO;
import com.fpoly.ooc.entity.Address;
import com.fpoly.ooc.entity.Bill;
import com.fpoly.ooc.request.bill.BillRequest;
import com.fpoly.ooc.responce.account.AccountResponce;
import com.fpoly.ooc.responce.account.GetListCustomer;
import com.fpoly.ooc.responce.bill.BillManagementResponse;
import org.springframework.data.domain.Page;

import java.time.LocalDateTime;
import java.util.List;

public interface BillService {

    Bill createBill(BillRequest request);

    List<BillManagementResponse> getAllBillManagement(
                                                      String billCode,
                                                      LocalDateTime startDate,
                                                      LocalDateTime endDate,
                                                      String status,
                                                      String billType);

    void deleteBill(Long id);

    List<GetListCustomer> getListCustomer();

    Integer updateBillStatus(BillStatusDTO dto, Long id);

    List<Address> getListAddressByUserName(String username);

}
