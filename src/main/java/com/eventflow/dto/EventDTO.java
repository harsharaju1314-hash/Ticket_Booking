package com.eventflow.dto;

import lombok.*;
import java.time.ZonedDateTime;
import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class EventDTO {
    private Long id;
    private String title;
    private String description;
    private String venue;
    private String imageUrl;
    private ZonedDateTime eventDate;
    private String status;
    private List<TicketCategoryDTO> ticketCategories;
}
