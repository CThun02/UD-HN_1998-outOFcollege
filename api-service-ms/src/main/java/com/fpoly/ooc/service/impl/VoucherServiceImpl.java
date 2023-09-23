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
import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.Collections;
import java.util.List;
import java.util.Objects;
import java.util.Optional;
import java.util.UUID;

@Service
public class VoucherServiceImpl implements VoucherService {

    @Autowired
    private VoucherRepository voucherRepository;

    @Override
    public Page<VoucherResponse> findAllVoucher(Pageable pageable, VoucherConditionDTO voucherConditionDTO) {

        String status = Objects.isNull(voucherConditionDTO.getStatus()) ?
                null : voucherConditionDTO.getStatus().equals("ALL") ?
                null : voucherConditionDTO.getStatus();

        System.out.println("status: " + status);

        return page(
                voucherRepository.findAllVoucher(
                        Objects.isNull(voucherConditionDTO.getVoucherCodeOrName()) ? null : "%" + voucherConditionDTO.getVoucherCodeOrName() + "%",
                        Objects.isNull(voucherConditionDTO.getStartDate()) ? null : voucherConditionDTO.getStartDate(),
                        Objects.isNull(voucherConditionDTO.getEndDate()) ? null : voucherConditionDTO.getEndDate(),
                        status
                ), pageable);
    }

    @Override
    public Voucher saveOrUpdate(VoucherRequest voucherRequest) {
        Voucher voucher = convertVoucherRequest(voucherRequest);

        return voucherRepository.save(voucher);
    }

    @Override
    public Voucher updateStatus(String code) {
        Optional<Voucher> voucherOptional = voucherRepository.findVoucherByVoucherCode(code);

        if (voucherOptional.isEmpty()) {
            throw new NotFoundException(ErrorCodeConfig.getMessage(Const.CODE_NOT_FOUND));
        } else {
            voucherOptional.get().setStatus(Const.STATUS_INACTIVE);
            voucherOptional.get().setDeletedAt(LocalDateTime.now());

            return voucherRepository.save(voucherOptional.get());
        }

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
//        Optional<Voucher> voucherRequestOptional = voucherRepository.findById(id);
//
//        if(voucherRequestOptional.isPresent()) {
//            return voucherRequestOptional.get();
//        } else {
//            throw new NotFoundException(ErrorCodeConfig.getMessage(Const.ID_NOT_FOUND));
//        }

        return null;
    }

    @Override
    public VoucherRequest findByVoucherCode(String code) {
        Optional<Voucher> voucherOptional = voucherRepository.findVoucherByVoucherCode(code);

        if (voucherOptional.isEmpty()) {
            throw new NotFoundException(ErrorCodeConfig.getMessage(Const.CODE_NOT_FOUND));
        } else {
            return convertVoucher(voucherOptional.get());
        }
    }

    private VoucherRequest convertVoucher(Voucher voucher) {

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

    private Voucher convertVoucherRequest(VoucherRequest request) {

        Voucher voucher = new Voucher();

        if(request.getStartDate().isBefore(request.getEndDate())
                && request.getStartDate().isAfter(LocalDateTime.now())) {
            voucher.setStatus(Const.STATUS_UPCOMING);
        } else {
            throw new NotFoundException(ErrorCodeConfig.getMessage(Const.END_DATE_LESS_START_DATE));
        }

        if (request.getVoucherMethod().equals("%")) {
            if (request.getVoucherValue().compareTo(BigDecimal.valueOf(100l)) == 1) {
                throw new NotFoundException(ErrorCodeConfig.getMessage(Const.VOUCHER_VALUE_LESS_100_PERCENT));
            }
        }

        if (request.getLimitQuantity() < 0) {
            throw new NotFoundException(ErrorCodeConfig.getMessage(Const.LIMIT_QUANTITY_LESS_ZERO));
        }

        if (request.getVoucherCondition().compareTo(BigDecimal.valueOf(0l)) == -1) {
            throw new NotFoundException(ErrorCodeConfig.getMessage(Const.VOUCHER_CONDITION_LESS_ZERO));
        }

        if (StringUtils.isNotBlank(String.valueOf(request.getVoucherId()))
                && StringUtils.isNotEmpty(String.valueOf(request.getVoucherId()))) {
            voucher.setId(request.getVoucherId());

        } else {
            Optional<Voucher> voucherOptional =
                    voucherRepository.findVoucherByVoucherName(request.getVoucherName());

            if (voucherOptional.isPresent()) {
                throw new NotFoundException(ErrorCodeConfig.getMessage(Const.VOUCHER_NAME_ALREADY_EXISTS));

            }
        }

        voucher.setVoucherCode(StringUtils.isBlank(voucher.getVoucherCode()) ? generatorCode() : voucher.getVoucherCode());
        voucher.setVoucherName(request.getVoucherName());
        voucher.setVoucherMethod(request.getVoucherMethod());
        voucher.setVoucherValue(request.getVoucherValue());
        voucher.setVoucherValueMax(request.getVoucherValueMax());
        voucher.setLimitQuantity(request.getLimitQuantity());
        voucher.setVoucherCondition(request.getVoucherCondition());
        voucher.setStartDate(request.getStartDate());
        voucher.setEndDate(request.getEndDate());

        return voucher;
    }

    private String generatorCode() {
        return RandomStringUtils.random(15, true, true).toUpperCase();
    }

    private Page<VoucherResponse> page(List<VoucherResponse> inputList, Pageable pageable) {

        int pageNo = pageable.getPageNumber();
        int pageSize = pageable.getPageSize();
        int startItem = pageNo * pageSize;

        List<VoucherResponse> outputList;

        if (inputList.size() < startItem) {
            outputList = Collections.emptyList();
        } else {
            int toIndex = Math.min(startItem + pageSize, inputList.size());
            outputList = inputList.subList(startItem, toIndex);
        }

        return new PageImpl<>(outputList, PageRequest.of(pageNo, pageSize), inputList.size());
    }

}
