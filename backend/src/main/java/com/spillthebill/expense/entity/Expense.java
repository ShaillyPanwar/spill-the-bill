package com.spillthebill.expense.entity;

import com.spillthebill.group.entity.Group;
import com.spillthebill.user.entity.User;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.annotations.CreationTimestamp;

import java.sql.Timestamp;
import java.time.LocalDateTime;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name="expenses")
public class Expense {
    @Id
    @GeneratedValue(strategy= GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "group_id") //foreign key group_id
    private Group group;

    @Column(nullable = false)
    private String description;

    @Column(nullable = false)
    private double amount;

    @ManyToOne
    @JoinColumn(name = "paid_by")
    private User paidBy;

    @CreationTimestamp
    private LocalDateTime createdAt;
}
