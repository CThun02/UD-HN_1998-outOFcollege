package com.fpoly.ooc.service.impl;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fpoly.ooc.constant.Const;
import com.fpoly.ooc.constant.ErrorCodeConfig;
import com.fpoly.ooc.entity.Form;
import com.fpoly.ooc.entity.Material;
import com.fpoly.ooc.entity.Pattern;
import com.fpoly.ooc.exception.NotFoundException;
import com.fpoly.ooc.repository.PatternDAORepository;
import com.fpoly.ooc.request.pattern.PatternRequest;
import com.fpoly.ooc.service.interfaces.PatternServiceI;
import com.fpoly.ooc.service.kafka.KafkaUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class PatternServiceImpl implements PatternServiceI {
    @Autowired
    private PatternDAORepository repo;
    @Autowired
    private KafkaUtil kafkaUtil;

    @Override
    public Pattern create(Pattern pattern) throws JsonProcessingException, NotFoundException {
        Pattern patternCheck = repo.findFirstByPatternName(pattern.getPatternName());
        if (patternCheck==null){
            return kafkaUtil.sendingObjectWithKafka(pattern, Const.TOPIC_PATTERN);
        }
        return null;
    }

    @Override
    public Pattern update(Pattern pattern, Long id) {
        Optional<Pattern> material1 = repo.findById(id);
        return material1.map(o -> {
            o.setPatternName(pattern.getPatternName());

            try {
                return kafkaUtil.sendingObjectWithKafka(o, Const.TOPIC_PATTERN);
            } catch (JsonProcessingException | NotFoundException e) {
                throw new RuntimeException(e);
            }
        }).orElse(null);

    }

    @Override
    public Boolean delete(Long id) {
        Pattern patternCheck = this.getOne(id);
        if(patternCheck==null){
            return false;
        }
        repo.delete(patternCheck);
        return true;
    }

    @Override
    public List<Pattern> findAll() {
        return repo.findAll(Sort.by(Sort.Order.desc("createdAt")));
    }

    @Override
    public Pattern getOne(Long id) {
        return repo.findById(id).orElse(null);
    }

    @Override
    public Pattern findFirstByPatternName(String patternName) {
        return repo.findFirstByPatternName(patternName);
    }

    @Override
    public Pattern updateStatus(PatternRequest request, Long id) throws NotFoundException {
        Pattern pattern = repo.findById(id).orElseThrow(() ->
                new NotFoundException(ErrorCodeConfig.getMessage(Const.ID_NOT_FOUND)));
        pattern.setStatus(request.getStatus());
        return repo.save(pattern);
    }
}
