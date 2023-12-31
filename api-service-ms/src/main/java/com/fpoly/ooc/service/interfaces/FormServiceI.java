package com.fpoly.ooc.service.interfaces;


import com.fasterxml.jackson.core.JsonProcessingException;
import com.fpoly.ooc.entity.Form;
import com.fpoly.ooc.exception.NotFoundException;
import com.fpoly.ooc.request.form.FormRequest;

import java.util.List;

public interface FormServiceI {
    public Form create(Form form) throws JsonProcessingException, NotFoundException;
    public Form update(Form form , Long id);
    public Boolean delete(Long id);
    public List<Form> findAll();
    public Form getOne(Long id);
    public Form findFirstByFormName(String formName);

    Form updateStatus(FormRequest request, Long id) throws NotFoundException;

}
