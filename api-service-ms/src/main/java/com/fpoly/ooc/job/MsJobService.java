import com.fasterxml.jackson.databind.ObjectMapper;
import com.fpoly.ooc.constant.Const;
import com.fpoly.ooc.dto.VoucherAndPromotionConditionDTO;
import com.fpoly.ooc.entity.Promotion;
import com.fpoly.ooc.entity.Voucher;
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
        jobScheduler.scheduleRecurrently(Cron.every15seconds(),
                this::isCheckTimeStartDateAndEndDateVoucher);
        jobScheduler.scheduleRecurrently(Cron.every15seconds(),
                this::isCheckTimeStartDateAndEndDatePromotion);
    }

    @Job(name = "scheduled-voucher")
    public void isCheckTimeStartDateAndEndDateVoucher() {
        List<VoucherResponse> vouchers = voucherService.findAllNoFilter();

        try {
            voucherService.findAllNoFilter().forEach(e -> {
                if (!(e.getStatus().equals(Const.STATUS_CANCEL))) {
                    String status = isCheckDateTime(e.getStartDate(), e.getEndDate());
                    voucherService.updateStatus(e.getVoucherCode(),
                            status == null ? e.getStatus() : status);
                }
            });

            VoucherAndPromotionConditionDTO conditionDTO = new VoucherAndPromotionConditionDTO();
            Page<VoucherResponse> vouchersCurrent = voucherService.findAllVoucher(PageRequest.of(0, 5), conditionDTO);
            Boolean isCheckDifferent = isValidArrayDifferent(vouchers, vouchersCurrent.getContent());

            if (isCheckDifferent) {
                String vouchersJson = objectMapper.writeValueAsString(vouchersCurrent.getContent());
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
                    promotionService.updateStatus(e.getPromotionCode(),
                            status == null ? e.getStatus() : status);
                }
            });

            VoucherAndPromotionConditionDTO conditionDTO = new VoucherAndPromotionConditionDTO();
            Page<PromotionProductResponse> promotionsCurrent = promotionService.pageAll(conditionDTO, PageRequest.of(0, 5));
            Boolean isCheckDifferent = isValidArrayDifferent(promotions, promotionsCurrent.getContent());

            if (isCheckDifferent) {
                String promotionsJson = objectMapper.writeValueAsString(promotionsCurrent.getContent());
                kafkaTemplate.send(Const.TOPIC_PROMOTION, promotionsJson);
            }
        } catch (Exception e) {
            log.error("Lỗi job voucher", e);
        } finally {
            log.info("promotion job done...");
        }
    }

    private Boolean isValidArrayDifferent(List<?> list, List<?> listCurrent) {
        if (list.size() != listCurrent.size()) {
            return true;
        }

        for (int i = 0; i < list.size(); i++) {
            Object object1 = list.get(i);
            Object object2 = listCurrent.get(i);

            if (!Objects.equals(object1, object2)) {
                return true;
            }
        }

        return false;
    }

    private String isCheckDateTime(LocalDateTime startDate, LocalDateTime endDate) {
        LocalDateTime dateNow = LocalDateTime.now();

        if (startDate.isBefore(endDate)) {
            if (dateNow.isBefore(startDate)) {
                return Const.STATUS_UPCOMING;
            }

            if (dateNow.isAfter(startDate) && dateNow.isBefore(endDate)) {
                return Const.STATUS_ACTIVE;
            }

            if (dateNow.isAfter(endDate)) {
                return Const.STATUS_INACTIVE;
            }
        }

        return null;
    }

}
