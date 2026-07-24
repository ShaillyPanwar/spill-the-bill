package com.spillthebill.expense.controller;

import com.spillthebill.expense.dto.AddExpenseRequest;
import com.spillthebill.expense.dto.BalanceResponse;
import com.spillthebill.expense.dto.ExpenseResponse;
import com.spillthebill.expense.dto.SettlementDTO;
import com.spillthebill.expense.service.ExpenseService;
import com.spillthebill.expense.service.SettlementService;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/expenses")
public class ExpenseController {
    private final ExpenseService expenseService;
    private final SettlementService settlementService;

    public ExpenseController(ExpenseService expenseService,
                             SettlementService settlementService) {
        this.expenseService = expenseService;
        this.settlementService = settlementService;
    }

    @PostMapping
    public ResponseEntity<ExpenseResponse> addExpense(
            @Valid @RequestBody AddExpenseRequest request) {

        return ResponseEntity.ok(expenseService.addExpense(request));
    }

    @GetMapping("/group/{groupId}")
    public ResponseEntity<List<ExpenseResponse>> getExpenses(
            @PathVariable Long groupId) {

        return ResponseEntity.ok(expenseService.getExpenses(groupId));
    }

    @GetMapping("/group/{groupId}/balances")
    public ResponseEntity<List<BalanceResponse>> getBalances(
            @PathVariable Long groupId) {

        return ResponseEntity.ok(
                expenseService.calculateBalances(groupId)
        );
    }

    @GetMapping("/group/{groupId}/settlements")
    public ResponseEntity<List<SettlementDTO>> getSettlements(@PathVariable Long groupId) {

        return ResponseEntity.ok(
                settlementService.calculateSettlements(groupId)
        );
    }
}
