package com.fpoly.ooc.service.impl;

import com.fpoly.ooc.constant.Const;
import com.fpoly.ooc.constant.ErrorCodeConfig;
import com.fpoly.ooc.dto.VoucherConditionDTO;
import com.fpoly.ooc.entity.Voucher;
import com.fpoly.ooc.exception.NotFoundException;
import com.fpoly.ooc.repository.VoucherRepository;
import com.fpoly.ooc.request.voucher.VoucherRequest;
import com.fpoly.ooc.responce.voucher.VoucherResponse;
import com.fpoly.ooc.service.interfaces.VoucherService;
import org.apache.commons.lang3.RandomStringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.Objects;
import java.util.Optional;
import java.util.UUID;

@Service
public class VoucherServiceImpl implements VoucherService {

    @Autowired
    private VoucherRepository voucherRepository;

    @Override
    public Page<VoucherResponse> findAllVoucher(Pageable pageable, VoucherConditionDTO voucherConditionDTO) {
        return voucherRepository.findAllVoucher(
                Objects.isNull(voucherConditionDTO.getVoucherCode()) ? null : "%" + voucherConditionDTO.getVoucherCode() + "%",
                Objects.isNull(voucherConditionDTO.getVoucherName()) ? null : "%" + voucherConditionDTO.getVoucherName() + "%",
                Objects.isNull(voucherConditionDTO.getStartDate()) ? null : voucherConditionDTO.getStartDate(),
                Objects.isNull(voucherConditionDTO.getEndDate()) ? null : voucherConditionDTO.getEndDate(),
                voucherConditionDTO.getStatus(),
                pageable
        );
    }

    @Override
    public Voucher saveOrUpdate(VoucherRequest voucherRequest) {
        Voucher voucher = convertVoucherRequest(voucherRequest);
        voucher.setVoucherCode(generatorCode());

        return voucherRepository.save(voucher);
    }

    @Override
    public Voucher updateStatus(Long id) {
        Voucher voucher = findVoucherById(id);
        voucher.setStatus(Const.STATUS_INACTIVE);
        voucher.setDeletedAt(LocalDateTime.now());

        return voucherRepository.save(voucher);
    }

    @Override
    public VoucherRequest findVoucherRequestById(Long id) {
        Voucher voucher = findVoucherById(id);

        return VoucherRequest.builder()
                .voucherId(voucher.getId())
                .voucherCode(voucher.getVoucherCode())
                .voucherName(voucher.getVoucherName())
                .voucherMethod(voucher.getVoucherMethod())
                .voucherValue(voucher.getVoucherValue())
                .voucherValueMax(voucher.getVoucherValueMax())
                .limitQuantity(voucher.getLimitQuantity())
                .voucherCondition(voucher.getVoucherCondition())
                .startDate(voucher.getStartDate())
                .endDate(voucher.getEndDate())
                .status(voucher.getStatus())
                .build();
    }

    @Override
    public Voucher findVoucherById(Long id) {
        Optional<Voucher> voucherRequestOptional = voucherRepository.findById(id);

        if(voucherRequestOptional.isPresent()) {
            return voucherRequestOptional.get();
        } else {
            throw new NotFoundException(ErrorCodeConfig.getMessage(Const.ID_NOT_FOUND));
        }
    }

    private Voucher convertVoucherRequest(VoucherRequest request) {

        Voucher voucher = new Voucher();

        voucher.setId(request.getVoucherId());
        voucher.setVoucherCode(request.getVoucherCode());
        voucher.setVoucherName(request.getVoucherName());
        voucher.setVoucherMethod(request.getVoucherMethod());
        voucher.setVoucherValue(request.getVoucherValue());
        voucher.setVoucherValueMax(request.getVoucherValueMax());
        voucher.setLimitQuantity(request.getLimitQuantity());
        voucher.setVoucherCondition(request.getVoucherCondition());
        voucher.setStartDate(request.getStartDate());
        voucher.setEndDate(request.getEndDate());
        voucher.setStatus(request.getStatus());

        return voucher;
    }

    private String generatorCode() {
        return RandomStringUtils.random(15, true, true);
    }

}
