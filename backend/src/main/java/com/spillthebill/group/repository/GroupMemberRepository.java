package com.spillthebill.group.repository;

import com.spillthebill.group.entity.Group;
import com.spillthebill.group.entity.GroupMember;
import com.spillthebill.user.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface GroupMemberRepository extends JpaRepository<GroupMember, Long> {

    List<GroupMember> findByGroup(Group group);  //returns all members of a particular group

    boolean existsByGroupAndUser(Group group, User user); //checks if the user trying to join is already a member

    // Optional<GroupMember> findByGroupAndUser(Group group, User user);   //will be used later after mvp

    List<GroupMember> findByUser(User user); // returns every group the user belongs to
}