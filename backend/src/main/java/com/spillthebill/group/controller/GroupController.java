package com.spillthebill.group.controller;

import com.spillthebill.group.dto.CreateGroupRequest;
import com.spillthebill.group.dto.GroupResponse;
import com.spillthebill.group.service.GroupService;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.spillthebill.group.dto.JoinGroupRequest;
import com.spillthebill.group.dto.JoinGroupResponse;

import java.util.List;

@RestController
@RequestMapping("/api/groups")
public class GroupController {

    private final GroupService groupService;

    public GroupController(GroupService groupService){
        this.groupService = groupService;
    }

    @PostMapping
    public ResponseEntity<GroupResponse> createGroup(@Valid @RequestBody CreateGroupRequest request){
        return ResponseEntity.ok(groupService.createGroup(request));
    }

    @GetMapping("/{createdBy}")
    public ResponseEntity<List<GroupResponse>> getGroups(@PathVariable Long createdBy) {
        return ResponseEntity.ok(groupService.getGroups(createdBy));
    }

    @GetMapping("/group/{id}")
    public ResponseEntity<GroupResponse> getGroup(@PathVariable Long id) {
        return ResponseEntity.ok(groupService.getGroup(id));
    }
    @PostMapping("/join")
    public ResponseEntity<JoinGroupResponse> joinGroup(@RequestBody JoinGroupRequest request) {
        return ResponseEntity.ok(groupService.joinGroup(request));
    }
}
