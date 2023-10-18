//package com.fpoly.ooc.job.listener;
//
//import com.fpoly.ooc.constant.Const;
//import lombok.extern.slf4j.Slf4j;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.kafka.annotation.KafkaListener;
//import org.springframework.messaging.simp.SimpMessagingTemplate;
//import org.springframework.stereotype.Service;
//import org.springframework.web.socket.WebSocketSession;
//
//@Service
//@Slf4j
//public class MsJobListenerService {
//
//    @Autowired
//    private SimpMessagingTemplate template;
//
//    @KafkaListener(topics = Const.TOPIC_VOUCHER, groupId = Const.KAFKA_GROUP_ID)
//    public void listenerVoucher(String vouchersJson) {
//        template.convertAndSend("/topic/voucher", vouchersJson);
//        log.info("VouchersJson: " + vouchersJson);
//    }
//
//    @KafkaListener(topics = Const.TOPIC_PROMOTION, groupId = Const.KAFKA_GROUP_ID)
//    public void listenerPromotion(String promotionsJson) {
//        template.convertAndSend("/topic/promotion", promotionsJson);
//        log.info("Promotion: " + promotionsJson);
//    }
//
//}
