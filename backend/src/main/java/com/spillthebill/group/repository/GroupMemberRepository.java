package com.spillthebill.group.repository;

import com.spillthebill.group.entity.Group;
import com.spillthebill.group.entity.GroupMember;
import com.spillthebill.user.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface GroupMemberRepository extends JpaRepository<GroupMember, Long> {

    List<GroupMember> findByGroup(Group group);

    boolean existsByGroupAndUser(Group group, User user);

    Optional<GroupMember> findByGroupAndUser(Group group, User user);
}