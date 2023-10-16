package com.fpoly.ooc.service.interfaces;

import com.fpoly.ooc.entity.ButtonType;
import com.fpoly.ooc.request.buttontype.ButtonTypeRequest;

import java.util.List;

public interface ButtonTypeServiceI {
    public ButtonType create(ButtonType buttonType);

    public ButtonType update(ButtonType buttonType, Long id);

    public Boolean delete(Long id);

    public List<ButtonType> findAll();

    public ButtonType getOne(Long id);

    ButtonType updateStatus(ButtonTypeRequest request, Long id);

}
