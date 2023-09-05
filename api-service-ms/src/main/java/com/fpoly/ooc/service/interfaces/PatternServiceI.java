package com.fpoly.ooc.service.interfaces;

import com.fpoly.ooc.entity.Pattern;

import java.util.List;

public interface PatternServiceI {
    public Pattern create(Pattern pattern);
    public Pattern update(Pattern pattern);
    public Boolean delete(Long id);
    public List<Pattern> getAll();
    public Pattern getOne(Long id);
}
