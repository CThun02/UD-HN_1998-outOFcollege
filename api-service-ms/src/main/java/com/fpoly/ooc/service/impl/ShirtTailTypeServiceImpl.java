package com.fpoly.ooc.service.impl;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fpoly.ooc.constant.Const;
import com.fpoly.ooc.constant.ErrorCodeConfig;
import com.fpoly.ooc.entity.ShirtTailType;
import com.fpoly.ooc.exception.NotFoundException;
import com.fpoly.ooc.repository.ShirtTailTypeDAORepository;
import com.fpoly.ooc.request.shirttailtype.ShirtTailTypeRequest;
import com.fpoly.ooc.service.interfaces.ShirtTailTypeServiceI;
import com.fpoly.ooc.service.kafka.KafkaUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ShirtTailTypeServiceImpl implements ShirtTailTypeServiceI {
    @Autowired
    private ShirtTailTypeDAORepository repo;
    @Autowired
    private KafkaUtil kafkaUtil;

    @Override
    public ShirtTailType create(ShirtTailType shirtTailType) throws JsonProcessingException, NotFoundException {
        ShirtTailType check = repo.findFirstByShirtTailTypeName(shirtTailType.getShirtTailTypeName());
        if(check==null){
            return kafkaUtil.sendingObjectWithKafka(shirtTailType, Const.TOPIC_SHIRT_TAILS);
        }
        return null;
    }

    @Override
    public ShirtTailType update(ShirtTailType shirtTailType, Long id) {
        Optional<ShirtTailType> optional = repo.findById(id);

        return optional.map(o -> {
            o.setShirtTailTypeName(shirtTailType.getShirtTailTypeName());
            o.setStatus(shirtTailType.getStatus());
            try {
                return kafkaUtil.sendingObjectWithKafka(o, Const.TOPIC_SHIRT_TAILS);
            } catch (JsonProcessingException | NotFoundException e) {
                throw new RuntimeException(e);
            }
        }).orElse(null);
    }

    @Override
    public Boolean delete(Long id) {
        ShirtTailType shirtTailTypeCheck = this.getOne(id);
        if (shirtTailTypeCheck == null) {
            return false;
        }
        repo.delete(shirtTailTypeCheck);
        return true;
    }

    @Override
    public List<ShirtTailType> findAll() {
        return repo.findAll(Sort.by(Sort.Order.desc("createdAt")));
    }

    @Override
    public ShirtTailType getOne(Long id) {
        return repo.findById(id).orElse(null);
    }

    @Override
    public ShirtTailType updateStatus(ShirtTailTypeRequest request, Long id) throws NotFoundException {
        ShirtTailType shirtTailType = repo.findById(id).orElseThrow(() ->
                new NotFoundException(ErrorCodeConfig.getMessage(Const.ID_NOT_FOUND)));
        shirtTailType.setStatus(request.getStatus());
        return repo.save(shirtTailType);
    }
}
