package com.fpoly.ooc.service.interfaces;


import com.fpoly.ooc.entity.Color;

import java.util.List;

public interface ColorServiceI {
    public Color create(Color color);
    public Color update(Color color);
    public Boolean delete(Long id);
    public List<Color> findAll();
    public Color getOne(Long id);
}
