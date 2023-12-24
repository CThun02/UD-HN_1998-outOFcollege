package com.fpoly.ooc.service.impl;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fpoly.ooc.constant.Const;
import com.fpoly.ooc.constant.ErrorCodeConfig;
import com.fpoly.ooc.entity.Brand;
import com.fpoly.ooc.entity.CollarType;
import com.fpoly.ooc.entity.Form;
import com.fpoly.ooc.entity.Material;
import com.fpoly.ooc.exception.NotFoundException;
import com.fpoly.ooc.repository.BrandDAORepository;
import com.fpoly.ooc.repository.CollarDAORepository;
import com.fpoly.ooc.request.collar.CollarRequest;
import com.fpoly.ooc.service.interfaces.CollarServiceI;
import com.fpoly.ooc.service.kafka.KafkaUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class CollarServiceImpl implements CollarServiceI {
    @Autowired
    private CollarDAORepository repo;
    @Autowired
    private KafkaUtil kafkaUtil;

    @Override
    public CollarType create(CollarType collarType) throws JsonProcessingException, NotFoundException {
        CollarType collarCheck = repo.findFirstByCollarTypeName(collarType.getCollarTypeName());
        if(collarCheck==null){
            return kafkaUtil.sendingObjectWithKafka(collarType, Const.TOPIC_COLLAR);
        }
        return null;
    }

    @Override
    public CollarType update(CollarType collarType, Long id) {

        Optional<CollarType> material1 = repo.findById(id);
        return material1.map(o -> {
            o.setCollarTypeName(collarType.getCollarTypeName());
            try {
                return kafkaUtil.sendingObjectWithKafka(o, Const.TOPIC_COLLAR);
            } catch (JsonProcessingException | NotFoundException e) {
                throw new RuntimeException(e);
            }
        }).orElse(null);

    }

    @Override
    public Boolean delete(Long id) {
        CollarType brandCheck = this.getOne(id);
        if(brandCheck==null){
            return false;
        }
        repo.delete(brandCheck);
        return true;
    }

    @Override
    public List<CollarType> findAll() {
        return repo.findAll(Sort.by(Sort.Order.desc("createdAt")));
    }

    @Override
    public CollarType getOne(Long id) {
        return repo.findById(id).orElse(null);
    }

    @Override
    public CollarType updateStatus(CollarRequest request, Long id) throws NotFoundException {
        CollarType collarType = repo.findById(id).orElseThrow(() ->
                new NotFoundException(ErrorCodeConfig.getMessage(Const.ID_NOT_FOUND)));
        collarType.setStatus(request.getStatus());
        return repo.save(collarType);
    }
}
