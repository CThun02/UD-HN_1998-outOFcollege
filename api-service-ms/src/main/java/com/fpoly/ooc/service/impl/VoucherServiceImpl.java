package com.fpoly.ooc.service.impl;

import com.fpoly.ooc.common.Commons;
import com.fpoly.ooc.constant.Const;
import com.fpoly.ooc.constant.ErrorCodeConfig;
import com.fpoly.ooc.dto.VoucherAccountConditionDTO;
import com.fpoly.ooc.dto.VoucherAndPromotionConditionDTO;
import com.fpoly.ooc.entity.Account;
import com.fpoly.ooc.entity.Voucher;
import com.fpoly.ooc.entity.VoucherAccount;
import com.fpoly.ooc.exception.NotFoundException;
import com.fpoly.ooc.repository.VoucherRepository;
import com.fpoly.ooc.request.voucher.DisplayVoucherRequest;
import com.fpoly.ooc.request.voucher.VoucherRequest;
import com.fpoly.ooc.responce.account.AccountVoucher;
import com.fpoly.ooc.responce.voucher.VoucherAccountResponse;
import com.fpoly.ooc.responce.voucher.VoucherResponse;
import com.fpoly.ooc.service.interfaces.AccountService;
import com.fpoly.ooc.service.interfaces.EmailService;
import com.fpoly.ooc.service.interfaces.VoucherAccountService;
import com.fpoly.ooc.service.interfaces.VoucherService;
import com.fpoly.ooc.util.CommonUtils;
import lombok.extern.slf4j.Slf4j;
import org.apache.commons.collections4.CollectionUtils;
import org.apache.commons.lang3.RandomStringUtils;
import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.Collection;
import java.util.Comparator;
import java.util.List;
import java.util.Objects;
import java.util.Optional;
import java.util.concurrent.CompletableFuture;

@Service
@Slf4j
public class VoucherServiceImpl implements VoucherService {

    @Autowired
    private VoucherRepository voucherRepository;

    @Autowired
    private EmailService emailService;

    @Autowired
    private AccountService accountService;

    @Autowired
    private VoucherAccountService voucherAccountService;

    @Override
    public List<VoucherResponse> findAllVoucher(VoucherAndPromotionConditionDTO voucherConditionDTO) {

        String status = Objects.isNull(voucherConditionDTO.getStatus()) ?
                null : voucherConditionDTO.getStatus().equalsIgnoreCase("ALL") ?
                null : voucherConditionDTO.getStatus();

        return voucherRepository.findAllVoucher(
                        StringUtils.isEmpty(voucherConditionDTO.getCodeOrName()) ? null : "%" + Commons.lower(voucherConditionDTO.getCodeOrName()) + "%",
                        Objects.isNull(voucherConditionDTO.getStartDate()) ? null : voucherConditionDTO.getStartDate(),
                        Objects.isNull(voucherConditionDTO.getEndDate()) ? null : voucherConditionDTO.getEndDate(),
                        Commons.lower(status)
                );
    }

    @Transactional
    @Override
    @Async
    public CompletableFuture<Voucher> saveOrUpdate(VoucherRequest voucherRequest) {
        Voucher voucherDb = null;
        if(voucherRequest.getVoucherId() != null) {
            voucherDb = voucherRepository.findById(voucherRequest.getVoucherId()).orElse(null);
        }
        Voucher voucher = convertVoucherRequest(voucherRequest, voucherDb);
        Voucher dbVoucher = voucherRepository.save(voucher);
        String result = null;

        if (voucher.getIsSendEmail()) {
            if (voucher.getObjectUse().equalsIgnoreCase("all")) {
                List<String> emails = accountService.findAllEmailAccount();

                if (emails.isEmpty()) {
                    throw new NotFoundException(ErrorCodeConfig.getMessage(Const.SEND_EMAIL_ERROR));
                }

                voucherRequest.getEmailDetails().setRecipient(emails);
            } else {
                List<Account> accounts = voucherRequest.getUsernames()
                        .stream().map((e) -> accountService.findByUsername(e.getUsername())).toList();
                List<String> recipient = accounts.stream().map(Account::getEmail).toList();
                voucherRequest.getEmailDetails().setRecipient(recipient);
            }
            result = String.valueOf(emailService.sendSimpleMail(voucherRequest.getEmailDetails(), voucher.getId()));
        }

        if (result != null && result.equals("ERROR")) {
            throw new NotFoundException(ErrorCodeConfig.getMessage(Const.SEND_EMAIL_ERROR));
        } else {
            for (AccountVoucher account : voucherRequest.getUsernames()) {
                VoucherAccountConditionDTO voucherAccountConditionDTO = new VoucherAccountConditionDTO();
                voucherAccountConditionDTO.setUsername(account.getUsername());
                voucherAccountConditionDTO.setVoucher(dbVoucher);
                voucherAccountService.saveOrUpdate(voucherAccountConditionDTO);
            }
        }

        return CompletableFuture.completedFuture(dbVoucher);
    }

    @Override
    public Voucher updateStatus(String code) {
        Voucher voucher = findVoucherByVoucherCode(code);
        voucher.setStatus(Const.STATUS_CANCEL);
        voucher.setDeletedAt(LocalDateTime.now());

        return voucherRepository.save(voucher);
    }

    @Override
    public Voucher updateStatus(String code, String status) {
        Voucher voucher = findVoucherByVoucherCode(code);
        voucher.setStatus(status);

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
        return convertVoucher(findVoucherByVoucherCode(code));
    }

    @Override
    public List<VoucherResponse> searchVoucherByCode(String code) {
        Voucher voucher = voucherRepository.findVoucherByVoucherCodeAndStatus(code, Const.STATUS_ACTIVE).orElse(null);
        if (Objects.nonNull(voucher)) {
            VoucherResponse voucherRes = new VoucherResponse();
            voucherRes.setVoucherId(voucher.getId());
            voucherRes.setVoucherCode(voucher.getVoucherCode());
            voucherRes.setVoucherName(voucher.getVoucherName());
            voucherRes.setVoucherValue(voucher.getVoucherValue());
            voucherRes.setVoucherValueMax(voucher.getVoucherValueMax());
            voucherRes.setVoucherMethod(voucher.getVoucherMethod());
            voucherRes.setLimitQuantity(voucher.getLimitQuantity());
            voucherRes.setStartDate(voucher.getStartDate());
            voucherRes.setEndDate(voucher.getEndDate());
            voucherRes.setStatus(voucher.getStatus());
            voucherRes.setObjectUse(voucher.getObjectUse());
            voucherRes.setVoucherCondition(voucher.getVoucherCondition());

            return List.of(voucherRes);
        }
        return null;
    }

    @Override
    public Boolean isCheckAccountOwnerVoucher(Long idVoucher, String username) {
        return voucherRepository.isCheckAccountOwnerVoucher(idVoucher, Commons.lower(username));
    }

    @Override
    public List<VoucherResponse> findAllNoFilter() {
        return voucherRepository.findAllVoucherResponseNoCondition();
    }

    @Override
    public List<VoucherResponse> findAllVoucherResponseDisplayModalUsing(DisplayVoucherRequest request) {
        log.warn("RequestData: " + request);
        return voucherRepository.findAllDisplayModalUsingVoucher(
                StringUtils.isBlank(request.getVoucherCodeOrName()) ? null : "%" + Commons.lower(request.getVoucherCodeOrName()) + "%",
                StringUtils.isBlank(request.getUsername()) ? null : Commons.lower(request.getUsername()),
                StringUtils.isEmpty(String.valueOf(request.getPriceBill())) ? null : request.getPriceBill()
        );
    }

    @Override
    public Voucher findVoucherByVoucherCode(String voucherCode) {
        log.info("VoucherCode: " + voucherCode);
        return voucherRepository.findVoucherByVoucherCodeAndStatus(voucherCode, Const.STATUS_ACTIVE)
                .orElseThrow(() -> new NotFoundException(ErrorCodeConfig.getFormatMessage(Const.CODE_NOT_FOUND)));
    }

    @Override
    public Boolean isCheckTimeUse(String voucherCode, String username) {
        return voucherRepository.isCheckTimeUseAndAccount(Commons.lower(voucherCode), Commons.lower(username));
    }

    @Override
    public Voucher updateVoucher(Voucher voucher) {
        return voucherRepository.save(voucher);
    }

    @Override
    public VoucherResponse autoFillVoucher(DisplayVoucherRequest req) {
        if(Objects.isNull(req)) return null;
        log.warn("DataReq: " + req);
        List<VoucherResponse> voucherResList = voucherRepository
                .autoFillVoucherByPrice(
                        StringUtils.isEmpty(String.valueOf(req.getPriceBill())) ? null : req.getPriceBill(),
                        StringUtils.isBlank(req.getUsername()) ? null : Commons.lower(req.getUsername())
                );

        if (CollectionUtils.isEmpty(voucherResList)) {
            return null;
        }

        VoucherResponse voucherRes = CommonUtils.getOneElementsInArrays(voucherResList);
        if(Objects.isNull(voucherRes)) {
            return null;
        }

        VoucherResponse resultSort = null;
        for (VoucherResponse res: voucherResList) {
            if(Objects.nonNull(res.getVoucherValueMax()) && Objects.nonNull(voucherRes.getVoucherValue())) {
                if (res.getVoucherValueMax().compareTo(voucherRes.getVoucherValue()) > 0) {
                    resultSort = res;
                    voucherRes = resultSort;
                }
            }
        }

        return Objects.nonNull(resultSort) ? resultSort : voucherRes;
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
                .objectUse(voucher.getObjectUse())
                .isCheckSendEmail(voucher.getIsSendEmail())
                .usernames(convertVoucherAccount(voucher.getVoucherAccount()))
                .build();
    }

    private Voucher convertVoucherRequest(VoucherRequest request, Voucher voucherDb) {
        Voucher voucher = new Voucher();

        if (request.getVoucherName().equalsIgnoreCase(request.getVoucherNameCurrent())) {
            voucher.setVoucherName(request.getVoucherName());
        } else {
            if (StringUtils.isNotEmpty(request.getVoucherNameCurrent())) {
                Optional<Voucher> voucherOptional = voucherRepository.findVoucherByVoucherName(request.getVoucherNameCurrent());

                if (voucherOptional.isPresent()) {
                    throw new NotFoundException(ErrorCodeConfig.getMessage(Const.VOUCHER_NAME_ALREADY_EXISTS), "voucherName");
                } else {
                    voucher.setVoucherName(request.getVoucherNameCurrent());
                }
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
                    throw new NotFoundException(ErrorCodeConfig.getMessage(Const.VOUCHER_VALUE_EMPTY), "voucherValue");
                }
                break;
            case "%":
                if (StringUtils.isEmpty(String.valueOf(voucherValue)) || voucherValue > 100 || voucherValue < 1) {
                    throw new NotFoundException(ErrorCodeConfig.getMessage(Const.VOUCHER_VALUE_EMPTY), "voucherValue");
                }

                if (StringUtils.isEmpty(String.valueOf(voucherValueMax))) {
                    throw new NotFoundException(ErrorCodeConfig.getMessage(Const.VOUCHER_VALUE_MAX_EMPTY), "voucherValueMax");
                }
                break;
            default:
                throw new NotFoundException(ErrorCodeConfig.getMessage(Const.VOUCHER_METHOD_EMPTY), "voucherMethod");
        }

        if (request.getLimitQuantity() < 1) {
            throw new NotFoundException(ErrorCodeConfig.getMessage(Const.LIMIT_QUANTITY_LESS_ZERO), "limitQuantity");
        }

        if (voucherCondition < 1) {
            throw new NotFoundException(ErrorCodeConfig.getMessage(Const.VOUCHER_CONDITION_LESS_ZERO), "voucherCondition");
        }

        LocalDateTime dateNow = LocalDateTime.now();
        switch (request.getStatus()) {
            case "":
            case "UPCOMING":

                if (dateNow.isAfter(request.getStartDate()) && dateNow.isAfter(request.getEndDate())) {
                    throw new NotFoundException(ErrorCodeConfig.getMessage(Const.DATE_LESS_NOW), "date");
                } else {
                    if (dateNow.isAfter(request.getStartDate())) {
                        throw new NotFoundException(ErrorCodeConfig.getMessage(Const.START_DATE_LESS_DATE_NOW), "startDate");
                    }

                    if (dateNow.isAfter(request.getEndDate())) {
                        throw new NotFoundException(ErrorCodeConfig.getMessage(Const.END_DATE_LESS_DATE_NOW), "endDate");
                    }
                }

                if (request.getStartDate().isAfter(request.getEndDate())) {
                    throw new NotFoundException(ErrorCodeConfig.getMessage(Const.END_DATE_LESS_START_DATE), "endDate");
                }

                voucher.setStatus(Const.STATUS_UPCOMING);
                break;
            case "ACTIVE":
                if (request.getStartDate().isAfter(request.getEndDate())) {
                    throw new NotFoundException(ErrorCodeConfig.getMessage(Const.END_DATE_LESS_START_DATE), "endDate");
                }

                voucher.setStatus(Const.STATUS_ACTIVE);
                break;
            default:
                throw new NotFoundException(ErrorCodeConfig.getMessage(Const.STATUS_INVALID), "status");
        }

        voucher.setId(
                StringUtils.isEmpty(String.valueOf(request.getVoucherId())) ? null : request.getVoucherId()
        );
        voucher.setVoucherCode(
                StringUtils.isEmpty(request.getVoucherCode()) ? generatorCode() : request.getVoucherCode()
        );

        if(voucherDb != null && voucherDb.getIsSendEmail() != request.getIsCheckSendEmail()) {
            if (request.getObjectUse().equals("member") && !request.getIsCheckSendEmail()) {
                throw new NotFoundException(ErrorCodeConfig.getMessage(Const.IS_SEND_EMAIL_MEMBER_REQUIRED));
            }
        }

        if(voucherDb == null) {
            if (request.getObjectUse().equals("member") && request.getUsernames().isEmpty()) {
                throw new NotFoundException(ErrorCodeConfig.getMessage(Const.ARRAYS_CUSTOMER_NOT_NULL));
            }
        }

        voucher.setVoucherMethod(request.getVoucherMethod());
        voucher.setVoucherValue(request.getVoucherValue());
        voucher.setVoucherValueMax(request.getVoucherValueMax());
        voucher.setLimitQuantity(request.getLimitQuantity());
        voucher.setVoucherCondition(request.getVoucherCondition());
        voucher.setIsSendEmail(request.getIsCheckSendEmail());
        voucher.setObjectUse(request.getObjectUse());

        voucher.setStartDate(request.getStartDate());
        voucher.setEndDate(request.getEndDate());

        return voucher;
    }

    private String generatorCode() {
        return RandomStringUtils.random(15, true, true).toUpperCase();
    }

    private Double convertBigDecimal(BigDecimal bigDecimal) {

        if (bigDecimal == null) {
            return null;
        }

        return Double.valueOf(String.valueOf(bigDecimal));
    }

    private List<AccountVoucher> convertVoucherAccount(List<VoucherAccount> voucherAccounts) {
        List<AccountVoucher> responseList = new ArrayList<>();

        for (VoucherAccount voucherAccount : voucherAccounts) {
            AccountVoucher accountVoucher = new AccountVoucher();
            accountVoucher.setUsername(voucherAccount.getAccountVoucher().getUsername());
            accountVoucher.setFullName(voucherAccount.getAccountVoucher().getFullName());
            accountVoucher.setGender(voucherAccount.getAccountVoucher().getGender());
            accountVoucher.setEmail(voucherAccount.getAccountVoucher().getEmail());
            accountVoucher.setPhoneNumber(voucherAccount.getAccountVoucher().getNumberPhone());

            responseList.add(accountVoucher);
        }

        return responseList;
    }


    @Override
    public List<VoucherAccountResponse> getVoucherByUsernameAndVoucherCode(String username, String voucherCode) {
        return voucherRepository.getVoucherByUsernameAndVoucherCode(username,voucherCode);
    }


}
