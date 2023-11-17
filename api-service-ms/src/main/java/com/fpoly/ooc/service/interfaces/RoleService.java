package com.fpoly.ooc.service.interfaces;

import com.fpoly.ooc.entity.Role;

import java.util.List;

public interface RoleService {
    Role findRoleByName(String name);

    List<String> findRoleNameByUsername(String username);

}
