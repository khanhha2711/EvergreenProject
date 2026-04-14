package com.example.logistic.service;

import com.example.logistic.DTO.ShippingLineDTO.CreateDTO;
import com.example.logistic.DTO.ShippingLineDTO.ListDTO;
import com.example.logistic.entity.ShippingLines;
import com.example.logistic.repository.IShippingLineRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import java.util.ArrayList;
import java.util.List;

@Repository
public class ShippingLineService implements IShippingLineService{
    @Autowired
    private IShippingLineRepository shippingLineRepository;

    @Override
    public List<ListDTO> findAll() {
        return shippingLineRepository.findAll()
                .stream()
                .map(this::mapToListDTO)
                .toList();
    }

    private ListDTO mapToListDTO(ShippingLines shippingLines) {
        ListDTO dto= new ListDTO();
        dto.setShippingCode(shippingLines.getShippingCode());
        dto.setShippingName(shippingLines.getShippingName());
        dto.setGmail(shippingLines.getGmail());
        dto.setPhone(shippingLines.getPhone());
        dto.setWebsite(shippingLines.getWebsite());
        return dto;
    }

    @Override
    public ListDTO createShipping(CreateDTO dto) {

        ShippingLines shippingLines= new ShippingLines();
        shippingLines.setShippingName(dto.getShippingName());
        shippingLines.setGmail(dto.getGmail());
        shippingLines.setPhone(dto.getPhone());
        shippingLines.setWebsite(dto.getWebsite());

        ShippingLines save= shippingLineRepository.save(shippingLines);
        ListDTO listDTO= new ListDTO();
        listDTO.setShippingCode(save.getShippingCode());
        listDTO.setShippingName(save.getShippingName());
        listDTO.setGmail(save.getGmail());
        listDTO.setPhone(save.getPhone());
        listDTO.setWebsite(save.getWebsite());
        return listDTO;
    }

    @Override
    public ListDTO detailShipping(String shippingCode) {
        ShippingLines shippingLines=shippingLineRepository.findByShippingCode(shippingCode);
        ListDTO dto= new ListDTO();
        dto.setShippingCode(shippingLines.getShippingCode());
        dto.setShippingName(shippingLines.getShippingName());
        dto.setGmail(shippingLines.getGmail());
        dto.setPhone(shippingLines.getPhone());
        dto.setWebsite(shippingLines.getWebsite());
        return dto;
    }

    @Override
    public ListDTO updateShipping(String shippingCode, ListDTO dto) {
        ShippingLines shippingLines=shippingLineRepository.findByShippingCode(shippingCode);
        shippingLines.setShippingName(dto.getShippingName());
        shippingLines.setGmail(dto.getGmail());
        shippingLines.setPhone(dto.getPhone());
        shippingLines.setWebsite(dto.getWebsite());

        ShippingLines update= shippingLineRepository.save(shippingLines);
        ListDTO listDTO= new ListDTO();
        listDTO.setShippingCode(update.getShippingCode());
        listDTO.setShippingName(update.getShippingName());
        listDTO.setGmail(update.getGmail());
        listDTO.setPhone(update.getPhone());
        listDTO.setWebsite(update.getWebsite());

        return listDTO;
    }

    @Override
    public List<ListDTO> findByName(String shippingCode) {
        ShippingLines shippingLines= shippingLineRepository.findByShippingCode(shippingCode);
        if(shippingLines == null){
            return new ArrayList<>();
        }
        return List.of(mapToListDTO(shippingLines));
    }

//    @Override
//    public void deleteShipping(String shippingCode) {
//        ShippingLines shippingLines= shippingLineRepository.findByShippingCode(shippingCode);
//        shippingLineRepository.delete(shippingLines);
//    }
}
