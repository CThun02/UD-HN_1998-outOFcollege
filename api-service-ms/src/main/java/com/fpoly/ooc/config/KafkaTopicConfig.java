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
//    public NewTopic updateStatusWithTime() {
//        return new NewTopic("voucher", 1, (short) 1);
//    }
//
//}
