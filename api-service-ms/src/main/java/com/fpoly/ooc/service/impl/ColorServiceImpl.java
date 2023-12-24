package com.fpoly.ooc.service.impl;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fpoly.ooc.constant.Const;
import com.fpoly.ooc.constant.ErrorCodeConfig;
import com.fpoly.ooc.entity.Color;
import com.fpoly.ooc.exception.NotFoundException;
import com.fpoly.ooc.repository.ColorDAORepository;
import com.fpoly.ooc.request.color.ColorRequest;
import com.fpoly.ooc.request.productDetail.GetSizeAndColorRequest;
import com.fpoly.ooc.service.interfaces.ColorServiceI;
import com.fpoly.ooc.service.kafka.KafkaUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ColorServiceImpl implements ColorServiceI {
    @Autowired
    private ColorDAORepository repo;
    @Autowired
    private KafkaUtil kafkaUtil;

    @Override
    public Color create(Color color) throws JsonProcessingException, NotFoundException {
        Color existColor = repo.findFirstByColorCodeOrColorName(color.getColorCode(), color.getColorName());
        if (existColor == null) {
            return kafkaUtil.sendingObjectWithKafka(color, Const.TOPIC_COLOR);
        }
        return null;
    }

    @Override
    public Color update(Color color, Long id) throws NotFoundException {
        Color existColor = repo.findFirstByColorCodeOrColorName(color.getColorCode(), color.getColorName());
        if (existColor != null) {
            throw new IllegalArgumentException("Mã màu sắc đã tồn tại");
        }

        Optional<Color> optional = repo.findById(id);

        return optional.map(o -> {
            o.setColorCode(color.getColorCode());
            o.setColorName(color.getColorName());
            o.setStatus(color.getStatus());
            try {
                return kafkaUtil.sendingObjectWithKafka(o, Const.TOPIC_COLOR);
            } catch (JsonProcessingException | NotFoundException e) {
                throw new RuntimeException(e);
            }
        }).orElseThrow(() ->
                new NotFoundException(ErrorCodeConfig.getMessage(Const.ID_NOT_FOUND)));
    }

    @Override
    public Boolean delete(Long id) {
        Color colorCheck = this.getOne(id);
        if (colorCheck == null) {
            return false;
        }
        repo.delete(colorCheck);
        return true;
    }

    @Override
    public List<Color> findAll() {
        return repo.findAll(Sort.by(Sort.Order.desc("createdAt")));
    }

    @Override
    public Color getOne(Long id) {
        return repo.findById(id).orElse(null);
    }

    @Override
    public Color updateStatus(ColorRequest request, Long id) throws NotFoundException {

        Color color = repo.findById(id).orElseThrow(() ->
                new NotFoundException(ErrorCodeConfig.getMessage(Const.ID_NOT_FOUND)));
        color.setStatus(request.getStatus());
        return repo.save(color);
    }

    @Override
    public Optional<List<Color>> findColorsByProductId(GetSizeAndColorRequest req) {
        return Optional.of(repo.findColorsByProductId(req.getProductId(), req.getBrandId(), req.getCategoryId(),
                req.getPatternId(), req.getFormId(), req.getButtonId(), req.getMaterialId(),
                req.getCollarId(), req.getSleeveId(), req.getShirtTailId(), req.getSizeId()));
    }
}
