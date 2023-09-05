package com.fpoly.ooc.service.interfaces;

import com.fpoly.ooc.entity.Form;

import java.util.List;

public interface FormServiceI {
    public Form create(Form form);
    public Form update(Form form);
    public Boolean delete(Long id);
    public List<Form> getAll();
    public Form getOne(Long id);
}
