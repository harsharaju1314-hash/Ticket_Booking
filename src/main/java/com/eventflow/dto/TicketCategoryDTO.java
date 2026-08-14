package com.eventflow.dto;

import lombok.*;
import java.math.BigDecimal;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class TicketCategoryDTO {
    private Long id;
    private Long eventId;
    private String name;
    private BigDecimal price;
    private Integer totalCapacity;
    private Integer availableStock;
}
