package com.fpoly.ooc.service.impl;

import com.fpoly.ooc.constant.Const;
import com.fpoly.ooc.constant.ErrorCodeConfig;
import com.fpoly.ooc.dto.VoucherConditionDTO;
import com.fpoly.ooc.entity.Voucher;
import com.fpoly.ooc.exception.NotFoundException;
import com.fpoly.ooc.repository.VoucherRepository;
import com.fpoly.ooc.request.voucher.VoucherRequest;
import com.fpoly.ooc.responce.voucher.VoucherResponse;
import com.fpoly.ooc.service.interfaces.EmailService;
import com.fpoly.ooc.service.interfaces.VoucherService;
import lombok.extern.slf4j.Slf4j;
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
@Slf4j
public class VoucherServiceImpl implements VoucherService {

    @Autowired
    private VoucherRepository voucherRepository;

    @Autowired
    private EmailService emailService;

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

        String result = emailService.sendSimpleMail(voucherRequest.getEmailDetails());
        log.info("Email: " + result);

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

        if (request.getVoucherName().equalsIgnoreCase(request.getVoucherNameCurrent())) {
            voucher.setVoucherName(request.getVoucherName());
        } else {
            Optional<Voucher> voucherOptional = voucherRepository.findVoucherByVoucherName(request.getVoucherName());

            if (voucherOptional.isPresent()) {
                throw new NotFoundException(Const.VOUCHER_NAME_ALREADY_EXISTS, "voucherName");
            } else {
                voucher.setVoucherName(request.getVoucherName());
            }
        }

        Double voucherValue = convertBigDecimal(request.getVoucherValue());
        Double voucherValueMax = convertBigDecimal(request.getVoucherValueMax());
        Double voucherCondition = convertBigDecimal(request.getVoucherCondition());

        switch (request.getVoucherMethod()) {
            case "vnd":
                if (StringUtils.isEmpty(String.valueOf(voucherValue))) {
                    throw new NotFoundException(Const.VOUCHER_VALUE_EMPTY, "voucherValue");
                }
                break;
            case "%":
                if (StringUtils.isEmpty(String.valueOf(voucherValue)) || voucherValue > 100 || voucherValue < 1) {
                    throw new NotFoundException(Const.VOUCHER_VALUE_EMPTY, "voucherValue");
                }

                if (StringUtils.isEmpty(String.valueOf(voucherValueMax))) {
                    throw new NotFoundException(Const.VOUCHER_VALUE_MAX_EMPTY, "voucherValueMax");

                }
                break;
            default:
                throw new NotFoundException(Const.VOUCHER_METHOD_EMPTY, "voucherMethod");
        }

        if (request.getLimitQuantity() < 1) {
            throw new NotFoundException(Const.LIMIT_QUANTITY_LESS_ZERO, "limitQuantity");
        }

        if (voucherCondition < 1) {
            throw new NotFoundException(Const.VOUCHER_CONDITION_LESS_ZERO, "voucherCondition");
        }

        LocalDateTime dateNow = LocalDateTime.now();

        switch (request.getStatus()) {
            case "":
            case "UPCOMING":

                if (dateNow.isAfter(request.getStartDate()) && dateNow.isAfter(request.getEndDate())) {
                    throw new NotFoundException(Const.DATE_LESS_NOW, "date");
                } else {
                    if (dateNow.isAfter(request.getStartDate())) {
                        throw new NotFoundException(Const.START_DATE_LESS_DATE_NOW, "startDate");
                    }

                    if (dateNow.isAfter(request.getEndDate())){
                        throw new NotFoundException(Const.END_DATE_LESS_DATE_NOW, "endDate");
                    }
                }

                if(request.getStartDate().isAfter(request.getEndDate())) {
                    throw new NotFoundException(Const.END_DATE_LESS_START_DATE, "endDate");
                }


                voucher.setStartDate(request.getStartDate());
                voucher.setEndDate(request.getEndDate());
                voucher.setStatus(Const.STATUS_UPCOMING);

                break;
            case "ACTIVE":
                if(request.getStartDate().isAfter(request.getEndDate())) {
                    throw new NotFoundException(Const.END_DATE_LESS_START_DATE, "endDate");
                }

                voucher.setEndDate(request.getEndDate());
                break;
            default:
                throw new NotFoundException(Const.STATUS_INVALID, "status");
        }

        voucher.setId(
                StringUtils.isEmpty(String.valueOf(request.getVoucherId())) ? null : request.getVoucherId()
        );
        voucher.setVoucherCode(
                StringUtils.isEmpty(request.getVoucherCode()) ? generatorCode() : request.getVoucherCode()
        );
        voucher.setVoucherMethod(request.getVoucherMethod());
        voucher.setVoucherValue(request.getVoucherValue());
        voucher.setVoucherValueMax(request.getVoucherValueMax());
        voucher.setLimitQuantity(request.getLimitQuantity());

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

    private Double convertBigDecimal(BigDecimal bigDecimal) {

        if (bigDecimal == null) {
            return null;
        }

        return Double.valueOf(String.valueOf(bigDecimal));
    }

}
