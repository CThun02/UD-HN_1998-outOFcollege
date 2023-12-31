package com.fpoly.ooc.service.job;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.fpoly.ooc.constant.Const;
import com.fpoly.ooc.dto.VoucherAndPromotionConditionDTO;
import com.fpoly.ooc.entity.Promotion;
import com.fpoly.ooc.entity.Voucher;
import com.fpoly.ooc.exception.NotFoundException;
import com.fpoly.ooc.responce.promotion.PromotionProductResponse;
import com.fpoly.ooc.responce.voucher.VoucherResponse;
import com.fpoly.ooc.service.interfaces.PromotionService;
import com.fpoly.ooc.service.interfaces.VoucherService;
import jakarta.annotation.PostConstruct;
import lombok.extern.slf4j.Slf4j;
import org.apache.commons.lang3.StringUtils;
import org.jobrunr.jobs.annotations.Job;
import org.jobrunr.scheduling.JobScheduler;
import org.jobrunr.scheduling.cron.Cron;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Objects;

@Service
@Slf4j
public class MsJobService {

    @Autowired
    private JobScheduler jobScheduler;

    @Autowired
    private VoucherService voucherService;

    @Autowired
    private PromotionService promotionService;

    @Autowired
    private KafkaTemplate<String, Object> kafkaTemplate;

    @Autowired
    private ObjectMapper objectMapper;

    @PostConstruct
    private void construct() {
        jobScheduler.scheduleRecurrently(Const.JOB_EVERY_5_SECONDS,
                this::isCheckTimeStartDateAndEndDateVoucher);
        jobScheduler.scheduleRecurrently(Const.JOB_EVERY_5_SECONDS,
                this::isCheckTimeStartDateAndEndDatePromotion);
    }

    @Job(name = "scheduled-voucher")
    public void isCheckTimeStartDateAndEndDateVoucher() {
        List<VoucherResponse> vouchers = voucherService.findAllNoFilter();

        try {
            voucherService.findAllNoFilter().forEach(e -> {
                if (!(e.getStatus().equals(Const.STATUS_CANCEL))) {
                    String status = isCheckDateTime(e.getStartDate(), e.getEndDate());
                    String isCheckQuantity = isCheckQuantityThan0(e.getLimitQuantity(), status != null ? status : e.getStatus());

                    voucherService.updateStatus(e.getVoucherCode(), isCheckQuantity);
                }
            });

            VoucherAndPromotionConditionDTO conditionDTO = new VoucherAndPromotionConditionDTO();
            List<VoucherResponse> vouchersCurrent = voucherService.findAllVoucher(conditionDTO);
            Boolean isCheckDifferent = isValidArrayDifferent(vouchers, vouchersCurrent);

            if (isCheckDifferent) {
                String vouchersJson = objectMapper.writeValueAsString(vouchersCurrent);
                kafkaTemplate.send(Const.TOPIC_VOUCHER, vouchersJson);
            }

        } catch (Exception e) {
            log.error("Lỗi job voucher", e);
        } finally {
            log.info("voucher job done...");
        }
    }

    @Job(name = "scheduled-promotion")
    public void isCheckTimeStartDateAndEndDatePromotion() {
        List<PromotionProductResponse> promotions = promotionService.findAllPromotionProductResponse();

        try {
            promotionService.findAllPromotionProductResponse().forEach(e -> {
                if (!(e.getStatus().equals(Const.STATUS_CANCEL))) {
                    String status = isCheckDateTime(e.getStartDate(), e.getEndDate());
                    try {
                        promotionService.updateStatus(e.getPromotionCode(),
                                status == null ? e.getStatus() : status);
                    } catch (NotFoundException ex) {
                        throw new RuntimeException(ex);
                    }
                }
            });

            VoucherAndPromotionConditionDTO conditionDTO = new VoucherAndPromotionConditionDTO();
            List<PromotionProductResponse> promotionsCurrent = promotionService.pageAll(conditionDTO);
            Boolean isCheckDifferent = isValidArrayDifferent(promotions, promotionsCurrent);

            if (isCheckDifferent) {
                String promotionsJson = objectMapper.writeValueAsString(promotionsCurrent);
                kafkaTemplate.send(Const.TOPIC_PROMOTION, promotionsJson);
            }
        } catch (Exception e) {
            log.error("Lỗi job voucher", e);
        } finally {
            log.info("promotion job done...");
        }
    }

    private <T> Boolean isValidArrayDifferent(List<T> list, List<T> listCurrent) {
        if (list.size() != listCurrent.size()) {
            return true;
        }

//        for (int i = 0; i < list.size(); i++) {
//            Object object1 = list.get(i);
//            Object object2 = listCurrent.get(i);
//
//            if (!Objects.equals(object1, object2)) {
//                return true;
//            }
//        }

        return list.removeAll(listCurrent);
    }

    private String isCheckDateTime(LocalDateTime startDate, LocalDateTime endDate) {
        LocalDateTime dateNow = LocalDateTime.now();

        if (startDate.isBefore(endDate)) {
            if (dateNow.isBefore(startDate)) {
                log.info("STATUS_UPCOMING");
                return Const.STATUS_UPCOMING;
            }

            if (dateNow.isAfter(startDate) && dateNow.isBefore(endDate)) {
                log.info("STATUS_ACTIVE");
                return Const.STATUS_ACTIVE;
            }

            if (dateNow.isAfter(endDate)) {
                log.info("STATUS_INACTIVE");
                return Const.STATUS_INACTIVE;
            }
        }

        log.info("nullable");
        return null;
    }

    private String isCheckQuantityThan0(Integer quantity, String status) {
        if(quantity == null) return Const.STATUS_INACTIVE;

        if(Const.STATUS_ACTIVE.equals(status) && quantity <= 0) {
            return Const.STATUS_INACTIVE;
        }

        return status;
    }

}
