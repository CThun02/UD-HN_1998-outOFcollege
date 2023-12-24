package com.fpoly.ooc.service.interfaces;


import com.fasterxml.jackson.core.JsonProcessingException;
import com.fpoly.ooc.entity.Color;
import com.fpoly.ooc.exception.NotFoundException;
import com.fpoly.ooc.request.color.ColorRequest;
import com.fpoly.ooc.request.productDetail.GetSizeAndColorRequest;

import java.util.List;
import java.util.Optional;

public interface ColorServiceI {
    public Color create(Color color) throws JsonProcessingException, NotFoundException;
    public Color update(Color color,Long id) throws NotFoundException;
    public Boolean delete(Long id);
    public List<Color> findAll();
    public Color getOne(Long id);

    Color updateStatus(ColorRequest request, Long id) throws NotFoundException;
    Optional<List<Color>> findColorsByProductId(GetSizeAndColorRequest req);
}
