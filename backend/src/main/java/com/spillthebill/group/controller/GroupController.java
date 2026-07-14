package com.spillthebill.group.controller;

import com.spillthebill.group.dto.CreateGroupRequest;
import com.spillthebill.group.dto.GroupResponse;
import com.spillthebill.group.service.GroupService;
import jakarta.validation.Valid;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/groups")
public class GroupController {

    private final GroupService groupService;

    public GroupController(GroupService groupService){
        this.groupService = groupService;
    }

    @PostMapping
    public GroupResponse createGroup(@Valid @RequestBody CreateGroupRequest request){
        return groupService.createGroup(request);
    }

    @GetMapping("/{createdBy}")
    public List<GroupResponse> getGroups(@PathVariable Long createdBy){
        return groupService.getGroups(createdBy);
    }

    @GetMapping("/group/{id}")
    public GroupResponse getGroup(@PathVariable Long id) {
        return groupService.getGroup(id);
    }
}
