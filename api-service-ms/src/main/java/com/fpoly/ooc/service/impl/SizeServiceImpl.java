package com.fpoly.ooc.service.impl;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fpoly.ooc.constant.Const;
import com.fpoly.ooc.constant.ErrorCodeConfig;
import com.fpoly.ooc.entity.Color;
import com.fpoly.ooc.entity.Size;
import com.fpoly.ooc.exception.NotFoundException;
import com.fpoly.ooc.repository.SizeDAORepository;
import com.fpoly.ooc.request.color.ColorRequest;
import com.fpoly.ooc.request.productDetail.GetSizeAndColorRequest;
import com.fpoly.ooc.request.size.SizeRequest;
import com.fpoly.ooc.service.interfaces.SizeServiceI;
import com.fpoly.ooc.service.kafka.KafkaUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class SizeServiceImpl implements SizeServiceI {
    @Autowired
    private SizeDAORepository repo;
    @Autowired
    private KafkaUtil kafkaUtil;

    @Override
    public Size create(Size size) throws JsonProcessingException {
        Size sizeCheck = repo.findFirstBySizeName(size.getSizeName());
        if(sizeCheck==null){
            return kafkaUtil.sendingObjectWithKafka(size, Const.TOPIC_SIZE);
        }
        return null;
    }

    @Override
    public Size update(Size size, Long id) {
        Optional<Size> optional = repo.findById(id);

        return optional.map(o -> {
            o.setSizeName(size.getSizeName());
            o.setStatus(size.getStatus());
            try {
                return kafkaUtil.sendingObjectWithKafka(o, Const.TOPIC_SIZE);
            } catch (JsonProcessingException e) {
                throw new RuntimeException(e);
            }
        }).orElse(null);
    }

    @Override
    public Boolean delete(Long id) {
        Size sizeCheck = this.getOne(id);
        if (sizeCheck == null) {
            return false;
        }
        repo.delete(sizeCheck);
        return true;
    }

    @Override
    public List<Size> findAll() {
        return repo.findAll();
    }

    @Override
    public Size getOne(Long id) {
        return repo.findById(id).orElse(null);
    }

    @Override
    public Size updateStatus(SizeRequest request, Long id) {
        Size size = repo.findById(id).orElseThrow(() ->
                new NotFoundException(ErrorCodeConfig.getMessage(Const.ID_NOT_FOUND)));
        size.setStatus(request.getStatus());
        return repo.save(size);
    }

    @Override
    public Optional<List<Size>> findSizesByProductId(GetSizeAndColorRequest req) {
        return Optional.of(repo.findSizesByProductId(req.getProductId(), req.getBrandId(), req.getCategoryId(),
                req.getPatternId(), req.getFormId(), req.getButtonId(), req.getMaterialId(),
                req.getCollarId(), req.getSleeveId(), req.getShirtTailId(), req.getColorId()));
    }
}
