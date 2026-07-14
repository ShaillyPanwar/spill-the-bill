package com.spillthebill.group.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.annotations.CreationTimestamp;

import java.sql.Timestamp;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name="groups")
public class Group {
    @Id
    @GeneratedValue(strategy= GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String name;

    private String description;

    @Column(nullable = false)
    private Long createdBy;

    @Column(nullable = false)
    @CreationTimestamp  //creates timestamp automaticly when entity is created
    private Timestamp createdAt;

    @Column(name = "join_code", unique = true, nullable = false)
    private String joinCode;
}
