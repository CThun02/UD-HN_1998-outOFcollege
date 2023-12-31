package com.fpoly.ooc.service.kafka;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fpoly.ooc.constant.Const;
import com.fpoly.ooc.constant.ErrorCodeConfig;
import com.fpoly.ooc.exception.NotFoundException;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.stereotype.Service;

import java.util.Objects;

@Service
@Slf4j
public class KafkaUtil {

    @Autowired
    private KafkaTemplate<String, Object> kafkaTemplate;
    @Autowired
    private ObjectMapper objectMapper;

    public <T> T sendingObjectWithKafka(T object, String topicName) throws JsonProcessingException, NotFoundException {
        if (Objects.nonNull(object)) {
            String objectJson = objectMapper.writeValueAsString(object);
            kafkaTemplate.send(topicName, objectJson);
            log.warn("ObjectEntity: " + objectJson);
            return object;
        } else {
            throw new NotFoundException(ErrorCodeConfig.getMessage(Const.ADD_ENTITY_FAIL));
        }
    }

}
