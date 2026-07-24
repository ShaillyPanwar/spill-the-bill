package com.spillthebill.expense.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;
import lombok.*;

import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class AddExpenseRequest {

    @NotNull
    private Long groupId;

    @NotBlank
    private String description;

    @NotNull
    @Positive
    private double amount;

    @NotNull
    private Long paidBy;

    private List<Long> participantIds;
}