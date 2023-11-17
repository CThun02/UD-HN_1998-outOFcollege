package com.fpoly.ooc.service.impl;

import com.fpoly.ooc.entity.Role;
import com.fpoly.ooc.repository.RoleRepository;
import com.fpoly.ooc.service.interfaces.RoleService;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@AllArgsConstructor
@Service
public class RoleServiceImpl implements RoleService {

    private RoleRepository roleRepository;

    @Override
    public Role findRoleByName(String name) {
        return roleRepository.findRoleByRoleName(name);
    }

    @Override
    public List<String> findRoleNameByUsername(String username) {
        return roleRepository.findRoleNameByUsername(username);
    }
}
