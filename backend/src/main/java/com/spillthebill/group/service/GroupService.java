package com.spillthebill.group.service;

import com.spillthebill.common.JoinCodeGenerator;
import com.spillthebill.group.dto.*;
import com.spillthebill.group.entity.Group;
import com.spillthebill.group.entity.GroupMember;
import com.spillthebill.group.repository.GroupMemberRepository;
import com.spillthebill.group.repository.GroupRepository;
import com.spillthebill.user.entity.User;
import com.spillthebill.user.repository.UserRepository;
import org.springframework.stereotype.Service;

import com.spillthebill.group.dto.MemberResponse;
import java.util.List;

@Service
public class GroupService {

    private final GroupRepository groupRepository;
    private final UserRepository userRepository;
    private final GroupMemberRepository groupMemberRepository;

    public GroupService(GroupRepository groupRepository,
                        UserRepository userRepository,
                        GroupMemberRepository groupMemberRepository) {
        this.groupRepository = groupRepository;
        this.userRepository = userRepository;
        this.groupMemberRepository = groupMemberRepository;
    }

    public GroupResponse createGroup(CreateGroupRequest request) {
        System.out.println("Create Group API Hit");

        Group group = new Group();

        group.setName(request.getName());
        group.setDescription(request.getDescription());
        group.setCreatedBy(request.getCreatedBy());

        // Generate a unique join code
        String code;
        do {
            code = JoinCodeGenerator.generateCode();
        } while (groupRepository.existsByJoinCode(code));

        group.setJoinCode(code);

        Group savedGroup = groupRepository.save(group);

        // fetching the creator
        User user = userRepository.findById(request.getCreatedBy())
                .orElseThrow(() -> new RuntimeException("User not found"));

        // Adding creator as the first member
        GroupMember groupMember = new GroupMember();
        groupMember.setGroup(savedGroup);
        groupMember.setUser(user);

        groupMemberRepository.save(groupMember);

        return mapToGroupResponse(savedGroup);
    }

    public JoinGroupResponse joinGroup(JoinGroupRequest request) {

        Group group = groupRepository.findByJoinCode(request.getJoinCode())
                .orElseThrow(() -> new RuntimeException("Invalid invite code"));

        User user = userRepository.findById(request.getUserId())
                .orElseThrow(() -> new RuntimeException("User not found"));

        if (groupMemberRepository.existsByGroupAndUser(group, user)) {
            throw new RuntimeException("User is already a member of this group");
        }

        GroupMember groupMember = new GroupMember();
        groupMember.setGroup(group);
        groupMember.setUser(user);

        groupMemberRepository.save(groupMember);

        return new JoinGroupResponse("Joined group successfully");
    }

    public List<GroupResponse> getGroups(Long userId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));

        return groupMemberRepository.findByUser(user)
                .stream()
                .map(groupMember -> mapToGroupResponse(groupMember.getGroup()))
                .toList();
    }

    public GroupResponse getGroup(Long id) {

        Group group = groupRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Group not found"));

        return mapToGroupResponse(group);
    }

    private GroupResponse mapToGroupResponse(Group group) {
        List<MemberResponse> members = groupMemberRepository.findByGroup(group)
                .stream()
                .map(groupMember -> new MemberResponse(
                        groupMember.getUser().getId(),
                        groupMember.getUser().getName()
                ))
                .toList();
        return new GroupResponse(
                group.getId(),
                group.getName(),
                group.getDescription(),
                group.getCreatedBy(),
                group.getCreatedAt(),
                group.getJoinCode(),
                members
        );
    }
}