package com.fpoly.ooc.service.interfaces;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fpoly.ooc.entity.Color;
import com.fpoly.ooc.entity.Size;
import com.fpoly.ooc.exception.NotFoundException;
import com.fpoly.ooc.request.color.ColorRequest;
import com.fpoly.ooc.request.productDetail.GetSizeAndColorRequest;
import com.fpoly.ooc.request.size.SizeRequest;

import java.util.List;
import java.util.Optional;

public interface SizeServiceI {
    public Size create(Size size) throws JsonProcessingException, NotFoundException;

    public Size update(Size size, Long id);

    public Boolean delete(Long id);

    public List<Size> findAll();

    public Size getOne(Long id);

    Size updateStatus(SizeRequest request, Long id) throws NotFoundException;
    Optional<List<Size>> findSizesByProductId(GetSizeAndColorRequest req);
}
