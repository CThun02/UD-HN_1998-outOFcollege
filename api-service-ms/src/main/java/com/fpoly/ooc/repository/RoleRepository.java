package com.fpoly.ooc.repository;

import com.fpoly.ooc.entity.Role;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface RoleRepository extends JpaRepository<Role, Long> {
    Role findRoleByRoleName(String roleName);

    @Query("""
        select role.roleName from Role role left join Account account on role.id = account.role.id
        where account.username = ?1 
        and role.status = com.fpoly.ooc.constant.Const.STATUS_ACTIVE
        and account.status = com.fpoly.ooc.constant.Const.STATUS_ACTIVE
        """)
    List<String> findRoleNameByUsername(String username);

}
