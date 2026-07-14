# Database Design - Spill the Bill (MVP)

## Database Version

**v1.0 (MVP)**

---

# Overview

The MVP requires storing users, groups, shared expenses, and how each expense is divided among the members of a group.

---

# Entities

## 1. User

Represents a registered user.

### Fields

| Field | Type | Notes |
|--------|------------|---------------------------------------------|
| id | Long | Primary Key |
| name | String | Full Name |
| email | String | Unique, Not Null |
| password | String | Encrypted using BCrypt |
| createdAt | Timestamp | Account creation date |

### Relationships

- A user can create many groups.
- A user can belong to many groups.
- A user can create many expenses.

---

## 2. Group

Represents a collection of users sharing expenses.

### Fields

| Field | Type | Notes |
|--------|------------|-----------------------------|
| id | Long | Primary Key |
| name | String | Example: Goa Trip |
| createdBy | User | Owner of the group |
| createdAt | Timestamp | Group creation date |

### Relationships

- One group has many members.
- One group has many expenses.

---

## 3. GroupMember

Stores the membership information of users in a group.

### Fields

| Field | Type | Notes |
|--------|------------|--------------------------------|
| id | Long | Primary Key |
| group | Group | Foreign Key |
| user | User | Foreign Key |
| role | ENUM | OWNER / MEMBER |
| joinedAt | Timestamp | Date joined |

### Constraints

- A user can join the same group only once.
- Unique Constraint: `(group_id, user_id)`

### Relationships

- Many GroupMembers belong to one Group.
- Many GroupMembers belong to one User.

---

## 4. Expense

Represents a single shared expense.

### Fields

| Field | Type | Notes |
|--------|------------|-------------------------------------------|
| id | Long | Primary Key |
| description | String | Example: Dinner |
| amount | BigDecimal | Total expense amount |
| paidBy | User | User who paid the expense |
| group | Group | Group where the expense belongs |
| splitType | ENUM | EQUAL (MVP) |
| createdAt | Timestamp | Expense creation date |

### Relationships

- One expense belongs to one group.
- One expense is paid by one user.
- One expense has many ExpenseSplits.

---

## 5. ExpenseSplit

Stores each participant's share of an expense.

### Fields

| Field | Type | Notes |
|--------|------------|--------------------------------|
| id | Long | Primary Key |
| expense | Expense | Foreign Key |
| user | User | Participant in the expense |
| shareAmount | BigDecimal | Amount owed by the user |

### Constraints

- One user can have only one share per expense.
- Unique Constraint: `(expense_id, user_id)`

### Relationships

- Many ExpenseSplits belong to one Expense.
- Many ExpenseSplits belong to one User.

