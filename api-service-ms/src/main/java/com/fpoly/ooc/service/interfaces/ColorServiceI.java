package com.fpoly.ooc.service.interfaces;

import com.fpoly.ooc.entity.Color;

import java.util.List;

public interface ColorServiceI {
    public Color create(Color color);
    public Color update(Color color);
    public Boolean delete(String id);
    public List<Color> getAll();
    public Color getOne(String id);
}
