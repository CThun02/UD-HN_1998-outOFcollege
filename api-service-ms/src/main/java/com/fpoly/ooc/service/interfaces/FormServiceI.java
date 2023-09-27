package com.fpoly.ooc.service.interfaces;


import com.fpoly.ooc.entity.Form;

import java.util.List;

public interface FormServiceI {
    public Form create(Form form);
    public Form update(Form form);
    public Boolean delete(Long id);
    public List<Form> findAll();
    public Form getOne(Long id);
}
