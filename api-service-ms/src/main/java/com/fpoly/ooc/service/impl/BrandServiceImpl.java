package com.fpoly.ooc.service.impl;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fpoly.ooc.constant.Const;
import com.fpoly.ooc.constant.ErrorCodeConfig;
import com.fpoly.ooc.entity.Brand;
import com.fpoly.ooc.entity.Category;
import com.fpoly.ooc.entity.Material;
import com.fpoly.ooc.exception.NotFoundException;
import com.fpoly.ooc.repository.BrandDAORepository;
import com.fpoly.ooc.request.brand.BrandRequest;
import com.fpoly.ooc.service.interfaces.BrandServiceI;
import com.fpoly.ooc.service.kafka.KafkaUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class BrandServiceImpl implements BrandServiceI {
    @Autowired
    private BrandDAORepository repo;
    @Autowired
    private KafkaUtil kafkaUtil;

    @Override
    public Brand create(Brand brand) throws JsonProcessingException, NotFoundException {
        Brand brandCheck = this.findFirstByBrandName(brand.getBrandName());
        if(brandCheck==null){
            return kafkaUtil.sendingObjectWithKafka(brand, Const.TOPIC_BRAND);
        }
        return null;
    }

    @Override
    public Brand update(Brand brand, Long id) {

        Optional<Brand> material1 = repo.findById(id);
        return material1.map(o -> {
            o.setBrandName(brand.getBrandName());
            try {
                return kafkaUtil.sendingObjectWithKafka(o, Const.TOPIC_BRAND);
            } catch (JsonProcessingException e) {
                throw new RuntimeException(e);
            } catch (NotFoundException e) {
                throw new RuntimeException(e);
            }
        }).orElse(null);

    }

    @Override
    public Boolean delete(Long id) {
        Brand brandCheck = this.getOne(id);
        if(brandCheck==null){
            return false;
        }
        repo.delete(brandCheck);
        return true;
    }

    @Override
    public List<Brand> findAll() {
        return repo.findAll(Sort.by(Sort.Order.desc("createdAt")));
    }

    @Override
    public Brand getOne(Long id) {
        return repo.findById(id).orElse(null);
    }

    @Override
    public Brand findFirstByBrandName(String brandName) {
        return repo.findFirstByBrandName(brandName);
    }

    @Override
    public Brand updateStatus(BrandRequest request, Long id) throws NotFoundException {
        Brand brand = repo.findById(id).orElseThrow(() ->
                new NotFoundException(ErrorCodeConfig.getMessage(Const.ID_NOT_FOUND)));
        brand.setStatus(request.getStatus());
        return repo.save(brand);
    }
}
