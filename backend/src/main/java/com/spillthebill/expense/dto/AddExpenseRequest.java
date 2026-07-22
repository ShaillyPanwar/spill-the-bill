package com.spillthebill.expense.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.*;

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
    private Double amount;

    @NotNull
    private Long paidBy;
}