package com.eventflow.repository;

import com.eventflow.model.TicketCategory;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface TicketCategoryRepository extends JpaRepository<TicketCategory, Long> {
    List<TicketCategory> findByEventId(Long eventId);

    @Modifying
    @Query("UPDATE TicketCategory tc SET tc.availableStock = tc.availableStock - :quantity " +
           "WHERE tc.id = :id AND tc.availableStock >= :quantity")
    int decrementStockAtomic(@Param("id") Long id, @Param("quantity") int quantity);
}
