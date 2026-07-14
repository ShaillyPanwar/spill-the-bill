package com.spillthebill.group.service;

import com.spillthebill.group.dto.CreateGroupRequest;
import com.spillthebill.group.dto.GroupResponse;
import com.spillthebill.group.entity.Group;
import com.spillthebill.group.repository.GroupRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class GroupService {

    private final GroupRepository groupRepository;

    public GroupService(GroupRepository groupRepository) {
        this.groupRepository = groupRepository;
    }

    public GroupResponse createGroup(CreateGroupRequest request) {

        Group group = new Group();

        group.setName(request.getName());
        group.setDescription(request.getDescription());
        group.setCreatedBy(request.getCreatedBy());

        Group savedGroup = groupRepository.save(group);

        return mapToGroupResponse(savedGroup);
    }

    public List<GroupResponse> getGroups(Long createdBy) {

        return groupRepository.findByCreatedBy(createdBy)
                .stream()
                .map(this::mapToGroupResponse)
                .toList();
    }

    private GroupResponse mapToGroupResponse(Group group) {
        return new GroupResponse(
                group.getId(),
                group.getName(),
                group.getDescription(),
                group.getCreatedBy(),
                group.getCreatedAt()
        );
    }

    public GroupResponse getGroup(Long id) {
        Group group = groupRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Group not found"));
        return mapToGroupResponse(group);
    }
}