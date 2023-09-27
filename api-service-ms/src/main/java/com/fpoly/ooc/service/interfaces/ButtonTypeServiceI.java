package com.fpoly.ooc.service.interfaces;

import com.fpoly.ooc.entity.ButtonType;

import java.util.List;

public interface ButtonTypeServiceI {
    public ButtonType create(ButtonType buttonType);
    public ButtonType update(ButtonType buttonType);
    public Boolean delete(Long id);
    public List<ButtonType> findAll();
    public ButtonType getOne(Long id);
}
