package com.spillthebill.group.entity;

import com.spillthebill.user.entity.User;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.annotations.CreationTimestamp;

import java.time.LocalDateTime;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "group_members")
public class GroupMember{
    @Id  //primary key
    @GeneratedValue(strategy = GenerationType.IDENTITY) //generates value automatically
    private Long id;

    //relation to Group entity
    @ManyToOne
    @JoinColumn(name = "group_id") //foreign key group_id
    private Group group;

    //relation to user entity
    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;

    @CreationTimestamp
    private LocalDateTime joinedAt;

}
