package com.spillthebill.group.repository;

import com.spillthebill.group.entity.Group;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface GroupRepository extends JpaRepository<Group,Long> {
    List<Group> findByCreatedBy(Long createdBy); //so that a user can only view groups created by him in dashboard

}
