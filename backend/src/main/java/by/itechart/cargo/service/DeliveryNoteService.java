package by.itechart.cargo.service;

import by.itechart.cargo.model.freight.DeliveryNote;

import java.util.List;

public interface DeliveryNoteService {

    List<DeliveryNote> findAll();

    void saveOne(DeliveryNote deliveryNote);

}
