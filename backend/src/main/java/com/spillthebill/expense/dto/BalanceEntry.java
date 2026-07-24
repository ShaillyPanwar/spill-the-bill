package com.spillthebill.expense.dto;

public class BalanceEntry {
    private Long userId;
    private String userName;
    private Double balance;
    public BalanceEntry(Long userId, String userName, Double balance) {
        this.userId = userId;
        this.userName = userName;
        this.balance = balance;
    }

    public Long getUserId() {
        return userId;
    }

    public String getUserName() {
        return userName;
    }

    public Double getBalance() {
        return balance;
    }

    public void setBalance(Double balance) {
        this.balance = balance;
    }
}
