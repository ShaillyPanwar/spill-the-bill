package com.spillthebill.expense.dto;

import lombok.*;

import java.time.LocalDateTime;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class ExpenseResponse {

    private Long id;

    private String description;

    private Double amount;

    private String paidBy;

    private LocalDateTime createdAt;
}