package com.fpoly.ooc.service.impl;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fpoly.ooc.constant.Const;
import com.fpoly.ooc.constant.ErrorCodeConfig;
import com.fpoly.ooc.dto.NotificationDTO;
import com.fpoly.ooc.entity.Bill;
import com.fpoly.ooc.entity.DeliveryNote;
import com.fpoly.ooc.entity.Timeline;
import com.fpoly.ooc.exception.NotFoundException;
import com.fpoly.ooc.repository.TimeLineRepo;
import com.fpoly.ooc.request.timeline.TimeLinerequest;
import com.fpoly.ooc.responce.NotificationResponse;
import com.fpoly.ooc.responce.bill.BillInfoResponse;
import com.fpoly.ooc.responce.timeline.TimeLineResponse;
import com.fpoly.ooc.responce.timeline.TimelineClientResponse;
import com.fpoly.ooc.responce.timeline.TimelineCustomInfo;
import com.fpoly.ooc.responce.timeline.TimelineProductDisplayResponse;
import com.fpoly.ooc.responce.timeline.TimelineProductResponse;
import com.fpoly.ooc.service.interfaces.BillDetailService;
import com.fpoly.ooc.service.interfaces.BillService;
import com.fpoly.ooc.service.interfaces.DeliveryNoteService;
import com.fpoly.ooc.service.interfaces.NotificationService;
import com.fpoly.ooc.service.interfaces.PaymentService;
import com.fpoly.ooc.service.interfaces.ProductImageServiceI;
import com.fpoly.ooc.service.interfaces.TimeLineService;
import com.fpoly.ooc.util.CommonUtils;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Objects;
import java.util.Optional;

@Service
@Slf4j
public class TimeLineServiceImpl implements TimeLineService {

    @Autowired
    private TimeLineRepo timeLineRepo;

    @Autowired
    private BillService billService;

    @Autowired
    private ProductImageServiceI productImageServiceI;

    @Autowired
    private DeliveryNoteService deliveryNoteService;

    @Autowired
    private SimpMessagingTemplate template;

    @Autowired
    private ObjectMapper objectMapper;

    @Autowired
    private NotificationService notificationService;

    @Autowired
    private PaymentService paymentService;

    @Override
    public List<TimeLineResponse> getAllTimeLineByBillId(Long id) {
        Bill bill = billService.findBillByBillId(id);
        if (bill == null) {
            throw new NotFoundException(ErrorCodeConfig.getMessage(Const.ID_NOT_FOUND));
        }

        return timeLineRepo.getTimeLineByBillId(id);
    }

    @Override
    public TimelineClientResponse getTimelineByBillCode(String billCode) {
        if (billCode == null) {
            throw new NotFoundException(Const.CODE_NOT_FOUND);
        }
        Bill bill = billService.findBillByBillCode(billCode);

        TimelineClientResponse timelineClientResponse = new TimelineClientResponse();
        List<TimelineProductDisplayResponse> lstProduct = new ArrayList<>();

        List<TimelineProductResponse> lstTimelineProductResponses = null;
        lstTimelineProductResponses = timeLineRepo.getTimelineProductByBillId(bill.getId());
        timelineClientResponse.setLstTimeline(timeLineRepo.getTimeLineByBillId(bill.getId()));

        for (TimelineProductResponse timelineProductResponse : lstTimelineProductResponses) {
            TimelineProductDisplayResponse response = new TimelineProductDisplayResponse(timelineProductResponse);
            response.setProductImageResponses(productImageServiceI.getProductImageByProductDetailId(response.getProductDetailId()));
            lstProduct.add(response);
        }

        timelineClientResponse.setLstProduct(lstProduct);

        DeliveryNote deliveryNote = deliveryNoteService.getDeliveryNoteByBill_Id(bill.getId());

        if (deliveryNote != null) {
            TimelineCustomInfo timelineCustomInfo = TimelineCustomInfo.builder()
                    .fullName(deliveryNote.getName())
                    .phoneNumber(deliveryNote.getPhoneNumber())
                    .orderDate(bill.getCreatedAt())
                    .dateOfReceipt(bill.getCompletionDate())
                    .addressDetail(deliveryNote.getAddress().getDescriptionDetail())
                    .ward(deliveryNote.getAddress().getWard())
                    .district(deliveryNote.getAddress().getDistrict())
                    .city(deliveryNote.getAddress().getCity())
                    .build();
            timelineClientResponse.setTimelineCustomInfo(timelineCustomInfo);
        }

        return timelineClientResponse;
    }

    @Transactional(rollbackFor = Exception.class)
    @Override
    public Timeline createTimeLine(Long billId, TimeLinerequest request) throws JsonProcessingException {
        Bill bill = billService.findBillByBillId(billId);
        if (bill == null) {
            throw new NotFoundException(ErrorCodeConfig.getMessage(Const.ID_NOT_FOUND));
        }
        Timeline timeline = new Timeline();

        Optional<Timeline> existingTimeline = Optional.empty();
        if (request.getTimelineId() != null) {
            existingTimeline = timeLineRepo.findById(request.getTimelineId());
        }

        if (existingTimeline.isPresent()) {
            Timeline timelineUpdate = existingTimeline.get();
            timelineUpdate.setStatus(request.getStatus());
            timelineUpdate.setNote(request.getNote());
            timeLineRepo.save(timelineUpdate);
        } else {
            timeline.setBill(bill);
            timeline.setNote(request.getNote());

            if (request.getStatus() == null) {
                List<TimeLineResponse> lst = timeLineRepo.getTimeLineByBillId(billId);
                Integer statusIncrease = 0;
                if (lst.isEmpty()) {
                    statusIncrease++;
                } else {
                    statusIncrease = Integer.valueOf(lst.get(lst.size() - 1).getStatus());
                    statusIncrease++;
                }

                timeline.setStatus(String.valueOf(statusIncrease));
                if (lst.size() == 3) {
                    DeliveryNote deliveryNote = deliveryNoteService.getDeliveryNoteByBill_Id(billId);
                    deliveryNote.setDateOfReceipt(LocalDateTime.now());
                }
            } else {
                timeline.setStatus(request.getStatus());
            }
            timeLineRepo.save(timeline);
        }

        Long count = timeLineRepo.getCountTimelineByBillId(billId);
        String notificationsJson = null;
        List<NotificationDTO> notificationList = notificationService.notificationDTOList();
        NotificationResponse notification = null;
        if (count <= 1 && count > -1) {
            notification = new NotificationResponse();
            notification.setNotificationList(notificationList);
            notification.setIsReload(true);
            notificationsJson = objectMapper.writeValueAsString(notification);
            template.convertAndSend("/topic/notifications-topic", notificationsJson);
        } else {
            notification = new NotificationResponse();
            notification.setNotificationList(notificationList);
            notification.setIsReload(false);
            notificationsJson = objectMapper.writeValueAsString(notification);
            template.convertAndSend("/topic/notifications-topic", notificationsJson);
        }

        String timelineJson = objectMapper.writeValueAsString(timeLineRepo.getTimeLineByBillId(bill.getId()));
        template.convertAndSend("/topic/create-timeline-client-topic", timelineJson);
        log.info("CreateTimeLineJson: " + timelineJson);

        return timeline;
    }

    @Override
    public List<TimelineProductDisplayResponse> getTimelineProductByBillId(Long id) {
        List<TimelineProductResponse> lstTimelineProductResponses = timeLineRepo.getTimelineProductByBillId(id);
        List<TimelineProductDisplayResponse> list = new ArrayList<>();
        for (int i = 0; i < lstTimelineProductResponses.size(); i++) {
            TimelineProductDisplayResponse response = new TimelineProductDisplayResponse(lstTimelineProductResponses.get(i));
            response.setProductImageResponses(productImageServiceI.getProductImageByProductDetailId(response.getProductDetailId()));
            list.add(response);
        }
        return list;
    }

    @Override
    public BillInfoResponse getBillInfoByBillId(Long id) {
        List<BillInfoResponse> getInfoList = timeLineRepo.getBillInfoByIdBillId(id);

        BillInfoResponse getInfo = CommonUtils.getOneElementsInArrays(getInfoList);

        if (Objects.isNull(getInfo)) {
            return null;
        }

        BillInfoResponse billInfoResponse =
                new BillInfoResponse(getInfo.getBillId(), getInfo.getBillCode(), getInfo.getTransaction(), getInfo.getSymbol(),
                        getInfo.getBillType(), getInfo.getTotalPrice(), getInfo.getPriceReduce(), getInfo.getShipPrice(),
                        getInfo.getAmountPaid(), getInfo.getShipDate(), getInfo.getCreatedDate(), getInfo.getFullName(),
                        getInfo.getPhoneNumber(), getInfo.getAddressId(), getInfo.getAddressDetaill(), getInfo.getWard(),
                        getInfo.getDistrict(), getInfo.getCity(), getInfo.getStatus(), getInfo.getVoucherPrice(),
                        getInfo.getAccountName(), getInfo.getCompletionDate(), getInfo.getNote());

        billInfoResponse.setLstPaymentDetail(paymentService.findPaymentDetailByBillId(id));
        return billInfoResponse;
    }

    @Override
    public List<TimelineProductDisplayResponse> getListTimelineByUser(String username,
                                                                      String billCode,
                                                                      String status,
                                                                      String symbol,
                                                                      Integer count,
                                                                      String createdBy) {
        List<TimelineProductDisplayResponse> list = new ArrayList<>();
        List<TimelineProductResponse> lstRes = timeLineRepo.getAllBillByClient(username, billCode, status, symbol, count, createdBy);
        for (int i = 0; i < lstRes.size(); i++) {
            TimelineProductDisplayResponse response = new TimelineProductDisplayResponse(lstRes.get(i));
            response.setProductImageResponses(productImageServiceI.getProductImageByProductDetailId(response.getProductDetailId()));
            list.add(response);
        }
        return list;
    }

}
