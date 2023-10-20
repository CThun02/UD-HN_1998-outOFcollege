package com.fpoly.ooc.service.impl;

import com.fpoly.ooc.constant.Const;
import com.fpoly.ooc.constant.ErrorCodeConfig;
import com.fpoly.ooc.entity.Color;
import com.fpoly.ooc.exception.NotFoundException;
import com.fpoly.ooc.repository.ColorDAORepository;
import com.fpoly.ooc.request.color.ColorRequest;
import com.fpoly.ooc.service.interfaces.ColorServiceI;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ColorServiceImpl implements ColorServiceI {
    @Autowired
    private ColorDAORepository repo;

    @Override
    public Color create(Color color) {
        Color existColor = repo.findFirstByColorCodeOrColorName(color.getColorCode(), color.getColorName());
        if (existColor == null) {
            return repo.save(color);
        }
        return null;
    }

    @Override
    public Color update(Color color, Long id) {
        Color existColor = repo.findFirstByColorCodeOrColorName(color.getColorCode(), color.getColorName());
        if (existColor != null) {
            throw new IllegalArgumentException("Mã màu sắc đã tồn tại");
        }

        Optional<Color> optional = repo.findById(id);

        return optional.map(o -> {
            o.setColorCode(color.getColorCode());
            o.setColorName(color.getColorName());
            o.setStatus(color.getStatus());
            return repo.save(o);
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
        return repo.findAll();
    }

    @Override
    public Color getOne(Long id) {
        return repo.findById(id).orElse(null);
    }

    @Override
    public Color updateStatus(ColorRequest request, Long id) {

        Color color = repo.findById(id).orElseThrow(() ->
                new NotFoundException(ErrorCodeConfig.getMessage(Const.ID_NOT_FOUND)));
        color.setStatus(request.getStatus());
        return repo.save(color);
    }
}
