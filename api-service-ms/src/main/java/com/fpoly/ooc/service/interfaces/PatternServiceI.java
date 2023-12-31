package com.fpoly.ooc.service.interfaces;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fpoly.ooc.entity.Form;
import com.fpoly.ooc.entity.Pattern;
import com.fpoly.ooc.exception.NotFoundException;
import com.fpoly.ooc.request.form.FormRequest;
import com.fpoly.ooc.request.pattern.PatternRequest;

import java.util.List;

public interface PatternServiceI {
    public Pattern create(Pattern pattern) throws JsonProcessingException, NotFoundException;
    public Pattern update(Pattern pattern , Long id);
    public Boolean delete(Long id);
    public List<Pattern> findAll();
    public Pattern getOne(Long id);
    public Pattern findFirstByPatternName(String patternName);
    Pattern updateStatus(PatternRequest request, Long id) throws NotFoundException;

}
