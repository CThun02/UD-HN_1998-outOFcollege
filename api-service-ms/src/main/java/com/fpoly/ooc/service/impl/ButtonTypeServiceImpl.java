package com.fpoly.ooc.service.impl;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fpoly.ooc.constant.Const;
import com.fpoly.ooc.constant.ErrorCodeConfig;
import com.fpoly.ooc.entity.ButtonType;
import com.fpoly.ooc.entity.Color;
import com.fpoly.ooc.exception.NotFoundException;
import com.fpoly.ooc.repository.ButtonTypeDAORepository;
import com.fpoly.ooc.request.buttontype.ButtonTypeRequest;
import com.fpoly.ooc.service.interfaces.ButtonTypeServiceI;
import com.fpoly.ooc.service.kafka.KafkaUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ButtonTypeServiceImpl implements ButtonTypeServiceI {
    @Autowired
    private ButtonTypeDAORepository repo;
    @Autowired
    private KafkaUtil kafkaUtil;

    @Override
    public ButtonType create(ButtonType buttonType) throws JsonProcessingException, NotFoundException {
        ButtonType buttonCheck = repo.findFirstByButtonName(buttonType.getButtonName());
        if(buttonCheck==null){
            return kafkaUtil.sendingObjectWithKafka(buttonType, Const.TOPIC_BUTTON);
        }
        return null;
    }

    @Override
    public ButtonType update(ButtonType buttonType, Long id) {
        Optional<ButtonType> optional = repo.findById(id);

        return optional.map(o->{
            o.setButtonName(buttonType.getButtonName());
            o.setStatus(buttonType.getStatus());
            try {
                return kafkaUtil.sendingObjectWithKafka(o, Const.TOPIC_BUTTON);
            } catch (JsonProcessingException | NotFoundException e) {
                throw new RuntimeException(e);
            }
        }).orElse(null);
    }

    @Override
    public Boolean delete(Long id) {
        ButtonType buttonTypeCheck = this.getOne(id);
        if(buttonTypeCheck==null){
            return false;
        }
        repo.delete(buttonTypeCheck);
        return true;
    }

    @Override
    public List<ButtonType> findAll() {
        return repo.findAll(Sort.by(Sort.Order.desc("createdAt")));
    }

    @Override
    public ButtonType getOne(Long id) {
        return repo.findById(id).orElse(null);
    }

    @Override
    public ButtonType updateStatus(ButtonTypeRequest request, Long id) throws NotFoundException {
        ButtonType buttonType = repo.findById(id).orElseThrow(() ->
                new NotFoundException(ErrorCodeConfig.getMessage(Const.ID_NOT_FOUND)));
        buttonType.setStatus(request.getStatus());
        return repo.save(buttonType);
    }
}
