package com.spillthebill.group.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class JoinGroupRequest {

    private String joinCode;
    private long userId;
}
