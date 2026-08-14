package com.eventflow.dto;

import lombok.*;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class SurgeTestRequestDTO {
    private Long eventId;
    private Long ticketCategoryId;
    private Integer concurrentUsers;
    private Integer ticketsPerUser;
}
