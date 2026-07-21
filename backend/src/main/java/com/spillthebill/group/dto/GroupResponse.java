package com.spillthebill.group.dto;


import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.sql.Timestamp;
import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class GroupResponse {

    private Long id;
    private String name;
    private String description;
    private Long createdBy;
    private Timestamp createdAt;
    private String joinCode;
    private List<MemberResponse> members;
}
