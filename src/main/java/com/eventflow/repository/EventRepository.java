package com.eventflow.repository;

import com.eventflow.model.Event;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface EventRepository extends JpaRepository<Event, Long> {
    List<Event> findByStatus(String status);

    @Query("SELECT e FROM Event e LEFT JOIN FETCH e.ticketCategories WHERE e.id = :id")
    Optional<Event> findByIdWithCategories(Long id);
}
