package com.spillthebill.group.repository;

import com.spillthebill.group.entity.Group;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface GroupRepository extends JpaRepository<Group,Long> {
    List<Group> findByCreatedBy(Long createdBy); //so that a user can only view groups created by him in dashboard

    Optional<Group> findByJoinCode(String joinCode);
    boolean existsByJoinCode(String joinCode);
}
