//package com.fpoly.ooc.config;
//
//import com.fpoly.ooc.constant.Const;
//import org.apache.kafka.clients.admin.AdminClient;
//import org.apache.kafka.clients.admin.AdminClientConfig;
//import org.apache.kafka.clients.admin.NewTopic;
//import org.springframework.context.annotation.Bean;
//import org.springframework.context.annotation.Configuration;
//import org.springframework.kafka.core.KafkaAdmin;
//
//import java.util.HashMap;
//import java.util.Map;
//
//@Configuration
//public class KafkaTopicConfig {
//
//
//    @Bean
//    public KafkaAdmin kafkaAdmin() {
//        Map<String, Object> configs = new HashMap<>();
//        configs.put(AdminClientConfig.BOOTSTRAP_SERVERS_CONFIG, Const.KAFKA_SERVER);
//        return new KafkaAdmin(configs);
//    }
//
//    @Bean
//    public NewTopic updateStatusVoucherWithTime() {
//        return new NewTopic(Const.TOPIC_VOUCHER, 1, (short) 1);
//    }
//
//    @Bean
//    public NewTopic updateStatusPromotionWithTime() {
//        return new NewTopic(Const.TOPIC_PROMOTION, 1, (short) 1);
//    }
//
//}
