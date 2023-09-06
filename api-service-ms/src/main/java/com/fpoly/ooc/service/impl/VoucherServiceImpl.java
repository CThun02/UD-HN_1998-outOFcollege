package com.fpoly.ooc.service.impl;

import com.fpoly.ooc.constant.Const;
import com.fpoly.ooc.constant.ExceptionResponse;
import com.fpoly.ooc.entity.Voucher;
import com.fpoly.ooc.exception.CustomNotFoundException;
import com.fpoly.ooc.repository.interfaces.VoucherRepository;
import com.fpoly.ooc.request.voucher.VoucherRequest;
import com.fpoly.ooc.responce.voucher.VoucherResponse;
import com.fpoly.ooc.service.interfaces.VoucherService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class VoucherServiceImpl implements VoucherService {

    @Autowired
    private VoucherRepository voucherRepository;

    @Override
    public List<VoucherResponse> findAllVoucher() {
        return voucherRepository.findAllVoucher();
    }

    @Override
    public Page<VoucherResponse> pageAllVoucher(Pageable pageable) {
        return voucherRepository.pageAllVoucher(pageable);
    }

    @Override
    public Voucher saveOrUpdate(VoucherRequest voucherRequest) {

        Voucher voucher = Voucher.builder()
                .id(voucherRequest.getId())
                .voucherCode(voucherRequest.getVoucherCode())
                .voucherName(voucherRequest.getVoucherName())
                .startDate(voucherRequest.getStartDate())
                .endDate(voucherRequest.getEndDate())
                .voucherValue(voucherRequest.getVoucherValue())
                .voucherValueMax(voucherRequest.getVoucherValueMax())
                .voucherMethod(voucherRequest.getVoucherMethod())
                .voucherCondition(voucherRequest.getVoucherCondition())
                .limitQuantity(voucherRequest.getLimitQuantity())
                .permission(voucherRequest.getPermission())
                .build();

        return voucherRepository.save(voucher);
    }

    @Override
    public VoucherRequest findVoucherById(Long id) {

        Optional<Voucher> voucherOptional = voucherRepository.findById(id);
        Voucher voucher = null;

        if (voucherOptional.isPresent()) {
            throw new CustomNotFoundException("NOT FOUND EXCEPTION");
        } else {
            voucher = voucherOptional.get();
        }
        return VoucherRequest.builder()
                .id(voucher.getId())
                .voucherCode(voucher.getVoucherCode())
                .voucherName(voucher.getVoucherName())
                .startDate(voucher.getStartDate())
                .endDate(voucher.getEndDate())
                .voucherValue(voucher.getVoucherValue())
                .voucherValueMax(voucher.getVoucherValueMax())
                .voucherCondition(voucher.getVoucherCondition())
                .limitQuantity(voucher.getLimitQuantity())
                .permission(voucher.getPermission())
                .build();
    }

    @Override
    public void delete(Long id) {
        voucherRepository.deleteById(id);
    }
}
